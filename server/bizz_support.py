# -*- coding: utf-8 -*-

import aiohttp
import asyncio
from bson.json_util import dumps
from flask import send_file
from io import BytesIO
from operator import itemgetter
import requests
import ujson

from server.database import Database


def _load_podcasts_from_database(term):
    mongodb = Database.get_mongodb_database()
    if mongodb:
        podcasts = mongodb.podcast.find({"$or": [
            {"artistName": {"$regex": term, "$options": "i"}},
            {"collectionName": {"$regex": term, "$options": "i"}},
            {"feedUrl": {"$regex": term, "$options": "i"}}
        ]})
        if podcasts.count() > 0:
            return (True, ujson.loads(dumps(podcasts)))
    else:
        # TODO(Better error handler)
        print("Error: No database found")
    return (False, [])


def _load_podcasts_from_itunes(term):
    term = term.replace(' ', '+')
    headers = {
        'Content-Type': 'application/json'
    }
    r = requests.get('https://itunes.apple.com/search?entity=podcast&limit=200&term=%s' % (term), headers=headers)
    r.encoding = 'UTF-8'

    if r.status_code == 200:
        itunes_response = r.json()['results']
        return (True, itunes_response)
    return (False, [])


def _load_podcast_info_from_itunes(id):
    headers = {
        'Content-Type': 'application/json'
    }
    r = requests.get('https://itunes.apple.com/lookup?entity=podcast&limit=200&id=%s' % (str(id)), headers=headers)
    r.encoding = 'UTF-8'

    if r.status_code == 200:
        itunes_response = r.json()['results']
        return (True, itunes_response)
    return (False, [])


def _load_podcast_info_by_id(id):
    mongodb = Database.get_mongodb_database()
    if mongodb:
        podcast = mongodb.podcast.find_one({'collectionId': id}, {'_id': False})
        episodes = mongodb.podcast_episode.find({'collectionId': id}, {'_id': False}).sort([('number', -1)])
        return {
            'info': ujson.loads(dumps(podcast)),
            'episodes': ujson.loads(dumps(episodes))
        }
    return None


def _load_podcast_episode_by_id(episode_id):
    mongodb = Database.get_mongodb_database()
    if mongodb:
        try:
            return mongodb.podcast_episode.find_one({'id': episode_id}, {'_id': False})
        except Exception as e:
            # TODO(Better error handler)
            print("Error: No episode found (%s)" % str(e))
            return None
    return None


# Request
# r = requests.get('https://talkpython.fm/episodes/download/90/data-wrangling-with-python.mp3', headers={'Range': 'bytes=0-1'})
# Status Code Must be 206
# r.status_code == 206
# This line bellow we get the max file size in bytes
# int(r.headers.get('Content-Range').split('/')[1])
def _load_episode_audio_from_networtk(filename, ext, url):
    success, total_bytes = _check_for_async_download(url)
    if success:
        bytesIO = _async_dowload_file(url, total_bytes)
    else:
        bytesIO = _default_download_file(url);

    return send_file(
        bytesIO,
        attachment_filename=filename,
        as_attachment=True,
        mimetype='audio/%s' % ext)


def _default_download_file(url):
    bytesIO = BytesIO()
    r = requests.get(url, stream=True)
    if r.status_code == 200:
        for chunk in r.iter_content(chunk_size=2048):
            if chunk:  # filter out keep-alive new chunks
                bytesIO.write(chunk)
        bytesIO.seek(0)
    return bytesIO


def _check_for_async_download(url):
    r = requests.get(url, headers={'Range': 'bytes=0-1'})
    success = False
    total_bytes = 0
    if r.status_code == 206:
        success = True
        total_bytes = int(r.headers.get('Content-Range').split('/')[1])
    return (success, total_bytes)


def _async_dowload_file(url, total_bytes):
    loop = asyncio.get_event_loop()
    download_file = loop.run_until_complete(_download_file_by_parts(url, total_bytes))
    loop.close()
    return download_file


async def _download_file_by_parts(url, total_bytes):
    coroutines = []
    position = 0
    start_byte = 0
    end_byte = 0
    print('=' * 30)
    bytes_size = 1024 * 30
    for i in range(bytes_size, total_bytes, bytes_size):
        end_byte = i
        coroutines.append(_download_file_part(url, position, start_byte, end_byte))
        start_byte = i
        position += 1
    results = await asyncio.gather(*coroutines, return_exceptions=True)
    downloads = sorted(results, key=itemgetter(0))
    downloads = map(itemgetter(1), downloads)

    bytesIO = BytesIO()
    for chunck in downloads:
        bytesIO.write(chunk)
    bytesIO.seek(0)
    return bytesIO


async def _download_file_part(url, position, start_byte, end_byte):
    print('-' * 15)
    print(start_byte)
    print(end_byte)
    bytesIO = BytesIO()
    range_bytes_to_download = 'bytes=%s-%s' % (str(start_byte), str(end_byte))
    print(range_bytes_to_download)
    r = requests.get(url, headers={'Range': range_bytes_to_download }, stream=True)
    if r.status_code == 200:
        print(r.status_code)
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:  # filter out keep-alive new chunks
                bytesIO.write(chunk)
        bytesIO.seek(0)
    return (position, bytesIO)

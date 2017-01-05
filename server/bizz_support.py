# -*- coding: utf-8 -*-

from bson.json_util import dumps
from flask import send_file
import requests
from io import BytesIO
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


def _load_episode_audio_from_networtk(filename, ext, url):
    bytesIO = BytesIO()
    r = requests.get(url, stream=True)
    if r.status_code == 200:
        for chunk in r.iter_content(chunk_size=2048):
            if chunk:  # filter out keep-alive new chunks
                bytesIO.write(chunk)
        bytesIO.seek(0)
    return send_file(
        bytesIO,
        attachment_filename=filename,
        as_attachment=True,
        mimetype='audio/%s' % ext)

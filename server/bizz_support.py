# -*- coding: utf-8 -*-

import ujson
import requests
from bson.json_util import dumps

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
        # TODO: Better error handler
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

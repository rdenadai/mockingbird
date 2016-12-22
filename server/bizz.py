# -*- coding: utf-8 -*-

import ujson
import requests
from bson.json_util import dumps

from server.database import Database
from tasks import parser_itunes_response


def search_term(term):

    # posts = mongodb.posts
    # post = {"author": "Mike",
    #     "text": "My first blog post!",
    #     "tags": ["mongodb", "python", "pymongo"]
    # }
    # post_id = posts.insert_one(post).inserted_id
    # redis = get_redis_conn()
    # redis.set('foo', 'bar')
    mongodb = Database.get_mongodb_database()
    podcasts = mongodb.podcast.find({"$or": [
        {"artistName": {"$regex": term, "$options":"i"}},
        {"collectionName": {"$regex": term, "$options":"i"}},
        {"feedUrl": {"$regex": term, "$options":"i"}}
    ]})

    if podcasts.count() > 0:
        return ujson.loads(dumps(podcasts))

    term = term.replace(' ', '+')
    headers = {
        'Content-Type': 'application/json'
    }
    r = requests.get('https://itunes.apple.com/search?entity=podcast&limit=200&term=%s' % (term), headers=headers)
    r.encoding = 'UTF-8'

    if r.status_code == 200:
        itunes_response = r.json()['results']
        parser_itunes_response.delay(itunes_response)
        return itunes_response
    return []

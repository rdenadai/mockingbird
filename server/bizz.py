# -*- coding: utf-8 -*-

import ujson
import requests

from server.database import get_mongodb_database, get_redis_conn
from tasks import add


def search_term(term):
    # mongodb = get_mongodb_database()
    # posts = mongodb.posts
    # post = {"author": "Mike",
    #     "text": "My first blog post!",
    #     "tags": ["mongodb", "python", "pymongo"]
    # }
    # post_id = posts.insert_one(post).inserted_id
    # redis = get_redis_conn()
    # redis.set('foo', 'bar')

    response = {}
    term = term.replace(' ', '+')
    r = requests.get('https://itunes.apple.com/search?entity=podcast&limit=200&term=%s' % (term))

    if r.status_code == 200:
        return r.json()

# -*- coding: utf-8 -*-

from flask import g
from flask import current_app
from pymongo import MongoClient
import redis


def get_mongodb_conn():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'mongodb_conn'):
        g.mongodb_conn = MongoClient(current_app.config['MONGODB_URI'])
    return g.mongodb_conn


def get_mongodb_database():
    if hasattr(g, 'mongodb_database'):
        return g.mongodb_conn.get_default_database()
    return get_mongodb_conn().get_default_database()


def get_redis_conn():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'redis_conn'):
        g.redis_conn = redis.from_url(current_app.config["REDIS_URI"])
    return g.redis_conn

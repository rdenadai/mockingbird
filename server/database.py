# -*- coding: utf-8 -*-

from flask import g
from flask import current_app
from pymongo import MongoClient
import redis

from configuration import Config


class Database():

    @classmethod
    def get_mongodb_conn(cls, ctx=True):
        """Opens a new database connection if there is none yet for the
        current application context.
        """
        if ctx:
            if not hasattr(g, 'mongodb_conn'):
                g.mongodb_conn = MongoClient(Config.MONGODB_URI)
            return g.mongodb_conn
        else:
            return MongoClient(Config.MONGODB_URI)


    @classmethod
    def get_mongodb_database(cls, ctx=True):
        if ctx:
            if hasattr(g, 'mongodb_database'):
                return g.mongodb_conn.get_default_database()
            return cls.get_mongodb_conn().get_default_database()
        else:
            return cls.get_mongodb_conn(ctx).get_default_database()


    @classmethod
    def get_redis_conn(cls, ctx=True):
        """Opens a new database connection if there is none yet for the
        current application context.
        """
        if ctx:
            if not hasattr(g, 'redis_conn'):
                g.redis_conn = redis.from_url(Config.REDIS_URI)
            return g.redis_conn
        else:
            return redis.from_url(Config.REDIS_URI)

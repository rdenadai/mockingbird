# -*- coding: utf-8 -*-

import os


class Config(object):
    NAME = 'mockingbird'
    DEBUG = False
    COMPRESS_LEVEL = 9
    ASSETS_DEBUG = True
    MONGODB_URI = os.environ.get("MONGODB_URI") if DEBUG == False else "mongodb://localhost:27017/mockingbird"
    REDIS_URI = os.environ.get("REDIS_URL") if DEBUG == False else "redis://localhost:6379/0"

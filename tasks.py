# -*- coding: utf-8 -*-

from flask import current_app
from celery import Celery

from server.database import Database
from configuration import Config


celery = Celery(Config.NAME, broker="redis://localhost:6379/0")
celery.conf.update(BROKER_URL=Config.REDIS_URI,
                CELERY_RESULT_BACKEND=Config.REDIS_URI)


@celery.task
def parser_itunes_response(itunes_response):
    mongodb = Database.get_mongodb_database(False)
    podcast_collection = mongodb.podcast
    for item in itunes_response:
        podcast_collection.replace_one({
            'collectionId' : item['collectionId']
        }, item, upsert=True)

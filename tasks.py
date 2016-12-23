# -*- coding: utf-8 -*-

from celery import Celery

from server.database import Database
from configuration import Config
from server.bizz_support import _load_podcasts_from_itunes


celery = Celery(Config.NAME, broker="redis://localhost:6379/0")
celery.conf.update(
    BROKER_URL=Config.REDIS_URI,
    CELERY_RESULT_BACKEND=Config.REDIS_URI
)


@celery.task
def parser_itunes_response(itunes_response):
    mongodb = Database.get_mongodb_database(False)
    if mongodb:
        podcast_collection = mongodb.podcast
        for item in itunes_response:
            podcast_collection.replace_one({
                'collectionId': item['collectionId']
            }, item, upsert=True)
    else:
        # TODO: Better error handler
        print("Error: No database found")


@celery.task
def load_from_itunes(term):
    success, response = _load_podcasts_from_itunes(term)
    if success:
        parser_itunes_response.delay(response)
    return response


@celery.task
def record_search_term(term):
    mongodb = Database.get_mongodb_database(False)
    if mongodb:
        mongodb.term.replace_one({
            'term': term
        }, {'term': term}, upsert=True)
    else:
        # TODO: Better error handler
        print("Error: No database found")

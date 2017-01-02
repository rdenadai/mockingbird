# -*- coding: utf-8 -*-

import feedparser

from celery import Celery

from configuration import Config
from server.database import Database

from server.bizz_support import _load_podcasts_from_itunes
from server.bizz_support import _load_podcast_info_from_itunes


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
            parser_podcast_rss.delay(item['collectionId'], item['feedUrl'])
    else:
        # TODO(Better error handler)
        print("Error: No database found")


@celery.task
def load_from_itunes(term):
    success, response = _load_podcasts_from_itunes(term)
    if success:
        parser_itunes_response.delay(response)
    return response


@celery.task
def parser_podcast_rss(podcast_id, url):
    # Select shows! By order...
    # podcast_episode.find(
    #    {'collectionId': 979020229}).sort( { number: -1 } )[0]
    mongodb = Database.get_mongodb_database(False)
    if mongodb:
        podcast_episode = mongodb.podcast_episode

        parsed = feedparser.parse(url)
        shows = parsed.get('entries', [])
        if len(shows) > 0:
            number = len(shows)
            for show in parsed['entries']:
                audio = None
                size = 0
                for link in show.get('links'):
                    if 'audio' in link.get('type', ''):
                        audio = link.get('href', '')
                        size = link.get('length', 0)

                # In the future, we could get image from episode using
                # p = BeautifulSoup(show.get('content')[0].get('value'), 'lxml')
                # Hoping that the image bring back by this is the right one
                # p.find('img')

                episode = {
                    'collectionId': podcast_id,
                    'guid': show.get('guid'),
                    'number': number,
                    'author': show.get('author', ''),
                    'title': show.get('title', ''),
                    'description': show.get('description', ''),
                    'published': show.get('published', ''),
                    'duration': show.get('itunes_duration', 0),
                    'audio': audio,
                    'audio_size': size
                }

                podcast_episode.replace_one({
                    'collectionId': podcast_id,
                    'guid': episode['guid']
                }, episode, upsert=True)
                number -= 1
    else:
        # TODO(Better error handler)
        print("Error: No database found")


@celery.task
def record_search_term(term):
    mongodb = Database.get_mongodb_database(False)
    if mongodb:
        mongodb.term.replace_one({
            'term': term
        }, {'term': term}, upsert=True)
    else:
        # TODO(Better error handler)
        print("Error: No database found")


@celery.task
def background_itunes():
    mongodb = Database.get_mongodb_database(False)
    if mongodb:
        podcasts = mongodb.podcast.find()
        for podcast in podcasts:
            success, response = _load_podcast_info_from_itunes(podcast['collectionId'])
            if success:
                parser_itunes_response.delay(response)


@celery.task
def background_rss():
    mongodb = Database.get_mongodb_database(False)
    if mongodb:
        podcasts = mongodb.podcast.find()
        for podcast in podcasts:
            parser_podcast_rss.delay(podcast['collectionId'], podcast['feedUrl'])

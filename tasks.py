# -*- coding: utf-8 -*-

from flask import current_app
from celery import Celery

from configuration import Config


celery = Celery('mockingbird', broker="redis://localhost:6379/0")
celery.conf.update(BROKER_URL=Config.REDIS_URI,
                CELERY_RESULT_BACKEND=Config.REDIS_URI)


@celery.task
def add(x, y):
    return x + y

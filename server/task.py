# -*- coding: utf-8 -*-

import ujson
import requests


def search_term(term):
    response = {}
    term = term.replace(' ', '+')
    r = requests.get('https://itunes.apple.com/search?entity=podcast&limit=200&term=%s' % (term))
    if r.status_code == 200:
        return r.json()

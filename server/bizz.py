# -*- coding: utf-8 -*-

from server.bizz_support import _load_podcasts_from_database
from server.bizz_support import _load_podcasts_from_itunes
from tasks import parser_itunes_response, record_search_term


def search_term(term):
    term = term.strip().lower()
    success, response = _load_podcasts_from_database(term)
    if not success:
        success, response = _load_podcasts_from_itunes(term)
        parser_itunes_response.delay(response)
    # We record each term searched just for updating
    record_search_term.delay(term)
    return response

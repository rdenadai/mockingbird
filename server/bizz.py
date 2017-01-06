# -*- coding: utf-8 -*-

from server.bizz_support import _load_episode_audio_from_networtk
from server.bizz_support import _load_podcast_episode_by_id
from server.bizz_support import _load_podcast_info_by_id
from server.bizz_support import _load_podcasts_from_database
from server.bizz_support import _load_podcasts_from_itunes
from tasks import parser_itunes_response
from tasks import record_search_term


def search_term(term):
    term = term.strip().lower()
    success, response = _load_podcasts_from_database(term)
    if not success:
        success, response = _load_podcasts_from_itunes(term)
        parser_itunes_response.delay(response)
    # We record each term searched just for updating
    record_search_term.delay(term)
    return response


def show_podcast(id):
    response = {}
    try:
        id = int(id)
        return _load_podcast_info_by_id(id)
    except Exception as e:
        # TODO(Better error handler)
        print("Error: id is not a full integer!")
    return response


def get_episode_audio(episode_id):
    episode = _load_podcast_episode_by_id(episode_id)
    if episode:
        url = episode.get('audio_url')
        filename = episode.get('id')
        ext = episode.get('audio_extension', '.mp3')
        return _load_episode_audio_from_networtk(filename, ext, url)
    return None

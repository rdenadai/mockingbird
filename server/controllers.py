# -*- coding: utf-8 -*-

import requests

from flask import current_app, Blueprint, render_template, abort
from flask import redirect, request, send_from_directory
from flask import jsonify
from jinja2 import TemplateNotFound

from server.bizz import get_episode_audio
from server.bizz import search_term
from server.bizz import show_podcast


app_page = Blueprint('app_page', __name__, template_folder='templates')


@app_page.route("/messages/<language>")
def messages(language):
    response = send_from_directory(current_app.static_folder, "locale/%s/messages.json" % (language))
    response.mimetype = 'application/json'
    return response


@app_page.route("/search/<term>")
def view_search_term(term):
    return jsonify(search_term(term))


@app_page.route("/view/<id>")
def view_podcast_by_id(id):
    return jsonify(show_podcast(id))


@app_page.route("/download/<episode_id>")
def view_download_url(episode_id):
    return get_episode_audio(episode_id)

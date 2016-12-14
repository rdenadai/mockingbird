# -*- coding: utf-8 -*-

from flask import current_app, Blueprint, render_template, abort
from flask import redirect, request, send_from_directory
from flask import jsonify
from jinja2 import TemplateNotFound

from server.bizz import search_term


app_page = Blueprint('app_page', __name__, template_folder='templates')


@app_page.route("/messages/<language>")
def messages(language):
    response = send_from_directory(current_app.static_folder, "locale/%s/messages.json" % (language))
    response.mimetype = 'application/json'
    return response


@app_page.route("/search/<term>")
def search(term):
    return jsonify(search_term(term))

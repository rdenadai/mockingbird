# -*- coding: utf-8 -*-

import os

from flask import Flask
from flask import jsonify
from flask import redirect, request, send_from_directory
from flask import render_template

from flask_caching import Cache
from flask_compress import Compress

from werkzeug.datastructures import Headers
from werkzeug.exceptions import abort

from server.controllers import app_page

# -----------------------------------------------------
# Flask-Compress
# -----------------------------------------------------
compress = Compress()
# -----------------------------------------------------
# Flask-Cache
# -----------------------------------------------------
cache = Cache(config={'CACHE_TYPE': 'memcached'})
# -----------------------------------------------------
# Flask Application
# -----------------------------------------------------
app = Flask(__name__)
# -----------------------------------------------------
# Compressing to gzip integration!
# -----------------------------------------------------
compress.init_app(app)
# -----------------------------------------------------
# Caching the views integration!
# -----------------------------------------------------
cache.init_app(app)

# -----------------------------------------------------
# CONFIGURATION
# ------------------------------------------
app.config.from_object('configuration.Config')

# -----------------------------------------------------
# DEFAULT ROUTE, ALWAYS PRINT HOME SCREEN... THIS IS A REACT APP
# -----------------------------------------------------
@app.route('/')
@cache.cached(timeout=1)
def index():
    return render_template('index.html')

# -----------------------------------------------------
# SUB PATHS INSIDE REACT APP
# -----------------------------------------------------
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if 'app' in path:
        return render_template('index.html')
    return abort(404)

# -----------------------------------------------------
# START APPS API!
# -----------------------------------------------------

app.register_blueprint(app_page)

# -----------------------------------------------------
# END: APPS API!
# -----------------------------------------------------

# -----------------------------------------------------
# STATIC ROUTES TO SERVER SOME FILES!
# -----------------------------------------------------
@app.route('/robots.txt')
@app.route('/humans.txt')
@app.route('/sitemap.xml')
@app.route('/manifest.json')
@app.route('/sw.js')
@cache.cached(timeout=1)
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])

# -----------------------------------------------------
# MAIN APP START!
# -----------------------------------------------------
if __name__ == "__main__":
    app.run()

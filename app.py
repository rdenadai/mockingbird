# -*- coding: utf-8 -*-

from flask import Flask
from flask import jsonify
from flask import redirect, request, send_from_directory
from flask import render_template

from flask_compress import Compress
from flask_caching import Cache

from werkzeug.exceptions import abort
from werkzeug.datastructures import Headers

from server.task import search_term


# Flask-Compress
compress = Compress()
# Flask-Cache
cache = Cache(config={'CACHE_TYPE': 'simple'})
# Flask Application
app = Flask(__name__)
# Compressing to gzip integration!
compress.init_app(app)
# Caching the views integration!
cache.init_app(app)

# CONFIGURATION
# ------------------------------------------
app.config['DEBUG'] = True
app.config['COMPRESS_LEVEL'] = 9
app.config['ASSETS_DEBUG'] = True


# DEFAULT ROUTE, ALWAYS PRINT HOME SCREEN... THIS IS A REACT APP
@app.route('/')
@cache.cached(timeout=1)
def index():
    return render_template('index.html')


# SUB PATHS INSIDE REACT APP
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if 'app' in path:
        return render_template('index.html')
    return abort(404)

# -----------------------------------------------------
# START APPS API!
# -----------------------------------------------------

@app.route("/messages")
def messages():
    language = request.args.get('language')
    response = send_from_directory(app.static_folder, "locale/%s/messages.json" % (language))
    response.mimetype = 'application/json'
    return response

@app.route("/search/<term>")
def search(term):
    return jsonify(search_term(term))

# -----------------------------------------------------
# END: APPS API!
# -----------------------------------------------------


# STATIC ROUTES TO SERVER SOME FILES!
@app.route('/robots.txt')
@app.route('/humans.txt')
@app.route('/sitemap.xml')
@app.route('/manifest.json')
@app.route('/sw.js')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


# MAIN APP START!
if __name__ == "__main__":
    app.run()

from flask import Flask, redirect, request, send_from_directory
from flask_compress import Compress
from flask_caching import Cache
from flask import render_template
from werkzeug.exceptions import abort

# Flask-Compress
compress = Compress()
# Flask-Cache
cache = Cache(config={'CACHE_TYPE': 'simple'})
# Flask Application
app = Flask(__name__)
# Compressing static files integration!
compress.init_app(app)
# Caching the views integration!
cache.init_app(app)

# configs
# ------------------------------------------
app.config['DEBUG'] = True
app.config['COMPRESS_LEVEL'] = 9
# app.config['ASSETS_DEBUG'] = True


@app.route('/')
@cache.cached(timeout=1)
def index():
    return render_template('index.html')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if 'app' in path:
        return render_template('index.html')
    return abort(404)


@app.route("/messages")
def messages():
    response = send_from_directory(app.static_folder, "locale/en/messages.json")
    response.mimetype = 'application/json'
    return response


@app.route('/robots.txt')
@app.route('/humans.txt')
@app.route('/sitemap.xml')
@app.route('/manifest.json')
@app.route('/sw.js')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run()

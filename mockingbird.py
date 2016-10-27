from flask import Flask, request, send_from_directory
from flask_assets import Environment, Bundle

from starter.index import starter

# Flask app
# ------------------------------------------
app = Flask(__name__)

# assets
# ------------------------------------------
assets = Environment()

css = Bundle('css/material.min.css', 'css/material-icons.css', 'css/font-awesome.min.css', 'css/base.css',
            filters='cssmin', output='gen/packed.css')
js = Bundle('js/zepto.min.js', 'js/howler.min.js', 'js/handlebars-v4.0.5.js', 'js/material.min.js', 'js/base.js',
            filters='jsmin', output='gen/packed.js')

assets.register('css_all', css)
assets.register('js_all', js)

assets.init_app(app)

# apps
# ------------------------------------------
app.register_blueprint(starter)

# configs
# ------------------------------------------
app.config['DEBUG'] = True
# app.config['ASSETS_DEBUG'] = True


@app.route('/robots.txt')
@app.route('/humans.txt')
@app.route('/sitemap.xml')
@app.route('/manifest.json')
@app.route('/sw.js')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run()
from flask import Flask, request, send_from_directory
from flask import render_template

app = Flask(__name__)

# configs
# ------------------------------------------
app.config['DEBUG'] = True
# app.config['ASSETS_DEBUG'] = True


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/robots.txt')
@app.route('/humans.txt')
@app.route('/sitemap.xml')
@app.route('/manifest.json')
@app.route('/sw.js')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run()

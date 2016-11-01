from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound


principal = Blueprint('principal', __name__, template_folder='templates')


@principal.route('/')
def index():
    return render_template('index.html', msg='Hello World', ok='Stuff done!')


@principal.route('/home/')
def home():
    return render_template('home.html')


@principal.route('/addpodcast/')
def add_podcast():
    return render_template('add_podcast.html')
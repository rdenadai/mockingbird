from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound


starter = Blueprint('starter', __name__, template_folder='templates')


@starter.route('/')
def index():
    return render_template('index.html', msg='Hello World', ok='Stuff done!')

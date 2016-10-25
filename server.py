
import os.path

# Register the Jinja2 plugin
from jinja2 import Environment, FileSystemLoader
from plugins.jinja2plugin import Jinja2TemplatePlugin
# Register the Jinja2 tool
from tools.jinja2tool import Jinja2Tool

import cherrypy

from controllers.index import Starter


if __name__ == '__main__':
    env = Environment(loader=FileSystemLoader('views'))
    Jinja2TemplatePlugin(cherrypy.engine, env=env).subscribe()

    cherrypy.tools.template = Jinja2Tool()

    # We must disable the encode tool because it
    # transforms our dictionary into a list which
    # won't be consumed by the jinja2 tool
    cherrypy.tree.mount(Starter(), '/', {'/': {'tools.template.template': 'index/index.html'}})
    # cherrypy.tree.mount(Forum(), '/forum', forum_conf)

    cherrypy.config.update('cherrypy.config')
    cherrypy.engine.start()
    cherrypy.engine.block()

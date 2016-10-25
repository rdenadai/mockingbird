import cherrypy


class Starter(object):
    """Entry point for this application."""

    @cherrypy.expose
    def index(self):
        return {'msg': 'Hello world!', 'ok': 'kslkdjskldhk'}
# ppwa
A podcast, build using progressive web apps technologies! Enjoy free audio!


npm run-script dev-compile
uwsgi --http 0.0.0.0:8181 -w wsgi
sudo mongod
celery -A tasks:celery worker --loglevel=info

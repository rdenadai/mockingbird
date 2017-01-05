# ppwa
A podcast, build using progressive web apps technologies! Enjoy free audio!

For more information about uwsgi check this out => http://uwsgi-docs.readthedocs.io/en/latest/ThingsToKnow.html

npm run-script dev-compile
uwsgi --http 0.0.0.0:8181 -w wsgi --wsgi-disable-file-wrapper --async 10 --ugreen --processes 4
sudo mongod
celery -A tasks:celery worker --loglevel=info

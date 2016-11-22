from app import app as application

# Example to run without https (h2)
# https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-14-04
# uwsgi --socket 0.0.0.0:8181 --protocol=http -w wsgi

if __name__ == "__main__":
    app.run()

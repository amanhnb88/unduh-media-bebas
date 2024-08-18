from flask import Flask, render_template, request, send_from_directory
from json import load
from cache import cache_for
from flask_caching import Cache

dev = False # DON'T FORGET TO CHANGE IT BACK BEFORE COMMITING
app = Flask(__name__)
app.config["CACHE_TYPE"] = "SimpleCache"
cache = Cache(app)

class Colors:
    green = ""
    yellow = ""
    red = ""

@cache_for(30)
def getinstances():
    return load(open('output/instances.json'))

@app.route('/')
@cache.cached(timeout=60 if not dev else 1)
def index():
    instances = getinstances()
    return render_template("index.html",
        instances=sorted(instances, key=lambda x: x['score'], reverse=True)
    )

@app.route('/api')
@cache.cached(timeout=120)
def api():
    return render_template("api.html", domain=request.host_url.rstrip("/"))

@app.route('/api/instances.json')
@cache.cached(timeout=60 if not dev else 1)
def api_instances():
    return send_from_directory("output", "instances.json")
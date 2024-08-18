from flask import Flask, render_template, request, send_from_directory
from json import load
from cache import cache_for

commit = "COMMIT"
app = Flask(__name__)

class Colors:
    green = ""
    yellow = ""
    red = ""

@cache_for(30)
def getinstances():
    return load(open('output/instances.json'))

@app.route('/')
def index():
    instances = getinstances()
    return render_template("index.html",
        instances=sorted(instances, key=lambda x: x['score'], reverse=True)
    )

@app.route('/api')
def api():
    return render_template("api.html", domain=request.host_url.rstrip("/"))

@app.route('/api/instances.json')
def api_instances():
    return send_from_directory("output", "instances.json")
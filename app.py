from flask import Flask, render_template, request, send_from_directory
from json import load
from cache import cache_for
from flask_caching import Cache
from threading import Thread
from scan import scan_instances
from os import mkdir
from os.path import getmtime
from time import ctime, strptime, strftime
from colors import colors
import logging

dev = False
app = Flask(__name__)
app.config["CACHE_TYPE"] = "SimpleCache"
cache = Cache(app)
cache.clear()

logger = logging.getLogger('werkzeug')
logger.setLevel(logging.WARNING)

class Colors:
    green = ""
    yellow = ""
    red = ""

def lastmodifiedhour(path):
    lastmodified = ctime(getmtime(path))
    timestruct = strptime(lastmodified)
    return strftime('%H:%M:%S', timestruct)

def getinstances():
    try:
        open('output/instances.json')
    except FileNotFoundError:
        # when there is no output/instances.json file, scan instances in the background
        Thread(target=scan_instances).start()
        try:
            mkdir("output")
        finally:
            open('output/instances.json', 'w').write('{}')
    finally:
        instancefilepath = 'output/instances.json'
        return load(open(instancefilepath)), \
            lastmodifiedhour(instancefilepath)

@app.route('/')
@cache.cached(timeout=30 if not dev else 1)
def index():
    instances = getinstances()
    return render_template("index.html",
        instances=sorted(instances[0], key=lambda x: x['score'], reverse=True),
        lastmodified=instances[1]
    )

@app.route('/api')
@cache.cached(timeout=120)
def api():
    return render_template("api.html", domain=request.host_url.rstrip("/"))

@app.route('/service/<service>')
@cache.cached(timeout=30 if not dev else 1)
def service(service):
    instances = getinstances()
    instancelist = instances[0]
    for instance in instancelist:
        if not instance["services"].get(service, False):
            instancelist.remove(instance)
    return render_template("service.html", service=service,
        instances=sorted(instances[0], key=lambda x: x['score'], reverse=True),
        lastmodified=instances[1]
    )

@app.route('/api/instances.json')
@cache.cached(timeout=15 if not dev else 1)
def api_instances():
    return getinstances()[0], 200, {'Content-Type': 'application/json'}

@app.route('/api/lastupdated')
@cache.cached(timeout=15 if not dev else 1)
def api_lastupdated():
    return getinstances()[1]

@app.route('/instance/<instanceapi>')
@cache.cached(timeout=30 if not dev else 1)
def instance(instanceapi):
    instances = getinstances()[0]
    instance = {}
    for _instance in instances:
        if _instance['api'] == instanceapi:
            instance = _instance
    return render_template("instance.html",
        instance=instance
    )

if __name__ == "__main__":
    print(f"{colors.yellow}WARN: You have started this program in developer mode,")
    print(f"{colors.yellow}      which means that the website contents aren't cached")
    print(f"{colors.yellow}      and debugging is enabled, which could be dangerous.")
    print(f"{colors.yellow}      To run this normally, simply do `flask run`.{colors.reset}")
    logger.setLevel(logging.NOTSET)
    dev = True
    app.run(debug=True)

from flask import Flask, render_template, request
from flask_caching import Cache
from scan import scan_instances
from utils import colors, sort_instances, get_instances
import logging

dev = False
app = Flask(__name__)
app.config["CACHE_TYPE"] = "SimpleCache" if __name__ != "__main__" else "NullCache"
cache = Cache(app)
cache.clear()

logger = logging.getLogger('werkzeug')
logger.setLevel(logging.WARNING)

if get_instances()[0] == {}:
    scan_instances()

@app.route('/')
@cache.cached(timeout=30)
def index():
    instances = get_instances()

    return render_template("index.html",
        instances=sort_instances(instances),
        lastmodified=instances[1]
    )

@app.route('/api')
@cache.cached(timeout=120)
def api():
    return render_template("api.html", domain=request.host_url.rstrip("/"))

@app.route('/faq')
@cache.cached(timeout=120)
def faq():
    return render_template("faq.html")

@app.route('/service/<service>')
@cache.cached(timeout=30)
def service(service):
    instances = get_instances()
    instancelist = instances[0]

    for instance in instancelist:
        if not instance["services"].get(service, False):
            instancelist.remove(instance)
    
    return render_template("service.html", service=service,
        instances=sort_instances(instances),
        lastmodified=instances[1]
    )

@app.route('/api/instances.json')
@cache.cached(timeout=15)
def api_instances():
    return get_instances()[0], 200, {'Content-Type': 'application/json'}

@app.route('/api/lastupdated')
@cache.cached(timeout=15)
def api_lastupdated():
    return get_instances()[1]

@app.route('/instance/<instanceapi>')
@cache.cached(timeout=30)
def instance(instanceapi):
    instances = get_instances()[0]
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
    app.run(debug=True, host="0.0.0.0")

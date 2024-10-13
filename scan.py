from concurrent.futures import ThreadPoolExecutor, as_completed
from commentjson import load, dump # type: ignore
from time import sleep as wait
from requests import request
from utils import colors, user_agent, commit, tests, Sanitize, ipregex
from re import sub, search
from time import time
from requests.exceptions import ReadTimeout
from importlib import import_module
from os.path import exists
from secrets import choice

if not exists("config.py"):
    open("config.py", "w")
config = import_module('config', package=None)
api_keys = getattr(config, 'api_keys', {})
ignored_instances = getattr(config, 'ignored_instances', [])
forced_v10 = getattr(config, 'forced_v10', [])
all_instances = load(open('data/instances.json'))[1:]

instances = [
    instance for instance in all_instances
    if instance[2] not in ignored_instances
]

def get_api_info(api_link) -> dict:
    print(f"{colors.yellow}Doing a request to {api_link}")
    req = request(
        "get", api_link,
            headers={
            "User-Agent": user_agent
        }
    )
    
    if "Sorry, you have been blocked" in req.text:
        raise Exception("We're blocked, mark it as offline.")
    
    print(f"{colors.green}{api_link} works.")
    
    server_info = req.json()
    
    version = server_info.get("version") or server_info.get("cobalt").get("version")
    name = server_info.get("name", "None")

    version_number = int(version.split(".")[0])
    if version_number < 10: # version 7+
        branch = server_info["branch"]
        commit = server_info["commit"]
        cors = True if server_info.get("cors", 0) == 1 else False
    else: # version 10+
        branch = server_info["git"]["branch"]
        commit = server_info["git"]["commit"]
        cors = True if req.headers.get("access-control-allow-origin") == "*" else False
    
    return {
        "version": Sanitize.version(version),
        "version_number": version_number,
        "branch": Sanitize.branch(branch),
        "commit": Sanitize.commit(commit),
        "name": Sanitize.name(name),
        "cors": cors
    }

def frontend_online(frontend=None) -> bool:
    if not frontend:
        return False
    
    try:
        if '<input id="url-input-area"' in request("get", frontend, timeout=10).text:
            return True
    except:
        return False

def test_service(service, api, link, version):
    identifier = api.split("/")[2]
    
    if service.lower() == "soundcloud":
        timeout = 30
    else:
        timeout = 90
    
    start = time()
    message = ""
    try:
        api_key = api_keys.get(identifier)
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": user_agent
        }

        if api_key:
            headers["Authorization"] = f"Api-key {api_key}"
        
        req = request(
            "post", api, timeout=timeout,
            headers = headers,
            json = {
                "url": link
            }
        )
    except ReadTimeout:
        message = f"{colors.yellow}Service {service} timed out on {identifier}" + \
            f"{colors.yellow}, took TIMEs."
    finally:
        end = time()
        took = round(end - start, 2)
        if message:
            print(message.replace("TIME", str(took)))
            return "request timed out"
    
    if req.status_code == 200:
        print(f"{colors.green}Service {service} works on {identifier}" + \
            # coloring again to avoid the rest of the text being in white when greping 
            f"{colors.green}, took {took}s.")
        return True
    else:
        try:
            reqjson = req.json()
            if version < 10:
                error = reqjson.get("text", "no error").split(".")[0]
            else:
                error = reqjson.get("error", {"code": "no error"}).get("code", "no error")
        except:
            error = "no error"
            
        print(f"{colors.red}Service {service} doesn't work on {identifier}" + \
            # coloring again to avoid the rest of the text being in white when greping 
            f"{colors.red}, status code: {req.status_code}, error: {error}, took {took}s.")
        return error

def check_instance(instance) -> dict:
    instance_info = {}
    protocol = instance[0]
    frontend = instance[1]
    api = instance[2]
    trust = instance[3]
    
    identifier = api or frontend or "a blank instance"   
    missing = "protocol" if not protocol else \
        "api domain" if not api else None
    
    if missing:
        print(f"{colors.cyan}Skipping {identifier} because it doesn't have any {missing}.")
        return
    
    api_path = "api/serverInfo" if api not in forced_v10 else ""
    api_link = f"{protocol}://{api}/{api_path}" if api else None
    frontend_link = f"{protocol}://{frontend}/" if frontend else None
    is_frontend_online = frontend_online(frontend_link)

    instance_info["protocol"] = protocol
    instance_info["frontend"] = frontend
    instance_info["api"] = api
    instance_info["trust"] = trust
    instance_info["online"] = {}
    instance_info["services"] = {}
    instance_info["nodomain"] = bool(search(ipregex, api))
    
    try:
        api_info = get_api_info(api_link)
        instance_info["version"] = api_info["version"]
        instance_info["branch"] = api_info["branch"]
        instance_info["commit"] = api_info["commit"]
        instance_info["name"] = api_info["name"]
        instance_info["cors"] = api_info["cors"]
        instance_info["online"]["api"] = True
        instance_info["online"]["frontend"] = is_frontend_online
        instance_info["score"] = 0
        version = api_info["version_number"]
    except Exception as e:
        print(f"{colors.red}{api} is offline or returned an invalid response, marking it as offline")
        print(e)
        instance_info["online"]["api"] = True
        instance_info["online"]["frontend"] = is_frontend_online
        instance_info["score"] = -1
        return instance_info
    
    if version < 10:
        api_link = api_link.replace("serverInfo", "json")
    else:
        api_link = f"{protocol}://{api}/"
    
    addscore = 1 / len(tests) * 100
    youtubecookies = True

    for service, link in tests.items():
        _service = service.lower().replace(" ", "_")

        if not youtubecookies and "youtube" in service.lower():
            print(f"{colors.red}{identifier}{colors.red} didn't set up cookies for YouTube, skipping other YouTube tests.")
            instance_info["services"][_service] = "youtube cookies aren't set up"
            continue

        test_result = test_service(service, api_link, link, version)
        str_test_result = str(test_result)

        if "it requires an account" in str_test_result or str_test_result == "error.api.youtube.login":
            print(f"{colors.red}{identifier}{colors.red} didn't set up cookies for YouTube.")
            test_result = "youtube cookies aren't set up"
            youtubecookies = False
        
        if test_result == True:
            instance_info["score"] += addscore

        instance_info["services"][_service] = test_result
        wait(choice(range(4, 6)) + choice(range(1, 100)) * 0.01) # to avoid getting rate limited
    
    instance_info["score"] = round(instance_info["score"])
    
    return instance_info

def test_instance(instance) -> dict | None:
    try:
        return check_instance(instance)
    except Exception as e:
        print(f"{colors.red}Checking {instance[2]} failed: {str(e)}")

def scan_instances():
    start = time()
    instance_list = []
    
    with ThreadPoolExecutor(max_workers=100) as executor:
        instancefuture = {executor.submit(test_instance, instance): instance for instance in instances}
        
        for future in as_completed(instancefuture):
            instance_info = future.result()
            if instance_info:
                instance_list.append(instance_info)
    end = time()
    print(f"{colors.cyan}Finished scanning, took {round(end - start, 2)}s")
    dump(instance_list, open('output/instances.json', 'w'))

if __name__ == "__main__":
    scan_instances()
    exit(0)

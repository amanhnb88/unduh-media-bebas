from subprocess import run, DEVNULL
from re import sub, search
from commentjson import load
from time import ctime, strptime, strftime
from os import mkdir
from threading import Thread
from os.path import getmtime

instancefilepath = 'output/instances.json'

class colors:
    red = '\033[31m'
    green = '\033[32m'
    yellow = '\033[33m'
    blue = '\033[34m'
    magenta = '\033[35m'
    cyan = '\033[36m'
    reset = '\033[0m'
    bold = '\033[1m'
    underline = '\033[4m'

# https://github.com/hyperdefined/CobaltTester/commit/06d49a2
class Sanitize:
    @staticmethod
    def name(text) -> str:
        return sub(r'[^A-z0-9-_/. ]', '', text)

    @staticmethod
    def version(text) -> str:
        return sub(r'[^0-9.]', '', text)

    @staticmethod
    def branch(text) -> str:
        return sub(r'[^A-z0-9/_-]', '', text)

    @staticmethod
    def commit(text) -> str:
        return sub(r'[^a-z0-9]', '', text)

def get_commit() -> str:
    return run("git rev-parse --short @".split(' '),
        # https://stackoverflow.com/a/41172862/26767691
        capture_output = True, text = True).stdout.removesuffix("\n")

def lastmodifiedhour(path):
    lastmodified = ctime(getmtime(path))
    timestruct = strptime(lastmodified)
    return strftime('%H:%M:%S', timestruct)

def get_instances():
    try:
        open('output/instances.json')
    except FileNotFoundError:
        # when there is no output/instances.json file, scan instances in the background
        try:
            mkdir("output")
        finally:
            open('output/instances.json', 'w').write('{}')
    finally:
        return load(open(instancefilepath)), \
            lastmodifiedhour(instancefilepath)

# made this a class just in case 
def sort_instances(instances):
    return sorted(
        instances[0],
        key=lambda x: x['score'],
        reverse=True
    )

tests = load(open('data/tests.json'))
commit = get_commit()
user_agent = f"cobalt-instances/{commit} (+https://codeberg.org/kwiat/instances)"

_a = "([0-1]?[0-9]{0,2}|2[0-4][0-9]|25[0-5])"
ipregex = f"^({_a}\\.){{3}}{_a}(:[0-9]{{1,5}})? ?$"

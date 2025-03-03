# cobalt instances
a simple-to-use and convenient list of [cobalt](https://cobalt.tools) instances.

only use the official instance unless you have issues with it or you need to use the api and if you can, only limit yourself to the trusted instances.

please note that this instance list is unofficial and is not endorsed by [imput](https://imput.net), the creators or cobalt.

## why are basically all instances missing?
> several bad actors are continuously scraping public cobalt instances for youtube videos. as a result, many (sometimes personal) instances either run out of bandwidth, cookies, or experience reduced performance. this week it got especially bad, completely knocking out several community instances.

> instance lists will not go back up as-is. all future lists must be opt-in, instances must be added only after hoster's explicit consent to participate.

[full message](https://discord.com/channels/1049706293700591677/1049740205730562128/1297566030154961057)

## how do i add my instance here
contact me on discord. my username is `kwiatekmiki`.

## what is an 'instance'?
since [cobalt is open-source](https://github.com/imputnet/cobalt), people can run the same code as cobalt's servers and host what's called an instance.

these instances run in different locations with different owners and cookies.

## why are some instances safe and some unsafe?
due to people abusing and hosting modified instances that break cobalt's licenses, some instances are considered unsafe.

for example, if you're hosting instances that are used for a downloader that is made for profit or what appears to be money-laundering (https://ko-fi.com/cnvmp3) or modifying cobalt's frontend code to include ads (https://top1savetube.com/), your instance is going to be marked as unsafe.

fun fact: there is a whole channel dedicated to reporting websites that violate cobalt's license, [#oss-license-violation-report](https://discord.com/channels/1049706293700591677/1265889384155316358)

if you're active in cobalt's community (on github or discord) and we trust you enough to not do the things listed above, your instance is probably going to be marked as safe.

## how to run
that depends on how you want to do it, here are 3 ways of doing that

### docker (recommended)
1. [install docker](https://www.docker.com/get-started/) and [git](./CONTRIBUTING.md#git)
2. [clone the repository](./CONTRIBUTING.md#cloning)
3. run `docker compose up`, or:
    - `docker compose up -d` to run it in the background
    - `docker compose up --build` to rebuild the image before running

### python
1. [install python](https://www.python.org/downloads/) and [git](./CONTRIBUTING.md#git)
2. [clone the repository](./CONTRIBUTING.md#cloning)
3. install dependencies using `pip install -r requirements.txt`
4. run `flask run`

### for testing changes
[it's explained here](./CONTRIBUTING.md#testing-your-changes)

## why?
at first, this was made because i disliked a lot of stuff about hyper's instance list.

recently, people were using instance lists for scraping instances which led to them running out of bandwidth, cookies, or have experienced reduced performance.

because of that, wukko has decided that
> instance lists will not go back up as-is. all future lists must be opt-in, instances must be added only after hoster's explicit consent to participate.

and hyper has decided that
> my list will be closed off from the public

and i have decided that i'm going to keep improving this one.

## license
this project is under the agpl-3.0 license, which means that you:
- must link the original repository and credit me (kwiatekmiki) when using parts of my code
- when you modify this code, you have to publish it under the same license

## thanks and credits
i want to thank hyperdefined for making his own instance list (https://instances.hyper.lol), which actually [made me make this instance list](#why) and gave me some ideas of what to add, remove or modify.

i also want to thank the contributors of these packages:
- [Flask](https://github.com/pallets/flask/graphs/contributors)
- [Flask-Caching](https://github.com/pallets-eco/flask-caching/graphs/contributors)
- [requests](https://github.com/psf/requests/graphs/contributors)
- [commentjson](https://github.com/vaidik/commentjson/graphs/contributors)

the creator of python, [guido van rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum)

and the creators of cobalt, [wukko](https://wukko.me) and [jj](https://github.com/dumbmoron)

<sub><sup>made with ❤️ by <a href="https://kwiatekmiki.com">kwiatekmiki</a><sup></sub>
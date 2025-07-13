# cobalt instances
a simple-to-use and convenient list of [cobalt](https://cobalt.tools) instances.

only use another instance unless you have issues with the official one, or you need to use the api.

this instance list is unofficial and not endorsed by [imput](https://imput.net), the creators or cobalt.

## what is an 'instance'?
since [cobalt is open-source](https://github.com/imputnet/cobalt), people can run the same code as cobalt's servers and host what's called an instance.

these instances run in different locations with different owners and cookies.

## why are basically all instances missing?
> several bad actors are continuously scraping public cobalt instances for youtube videos. as a result, many (sometimes personal) instances either run out of bandwidth, cookies, or experience reduced performance. this week it got especially bad, completely knocking out several community instances.

> instance lists will not go back up as-is. all future lists must be opt-in, instances must be added only after hoster's explicit consent to participate.

[full message](https://github.com/imputnet/cobalt/discussions/860)

## how do i add my instance here
see https://instances.cobalt.best/faq#adding-an-instance

## how to run
that depends on how you want to do it.

### docker (recommended)
1. [install docker](https://www.docker.com/get-started) and [git](./CONTRIBUTING.md#git)
2. [clone the repository](./CONTRIBUTING.md#cloning)
3. run `docker compose up`, or:
   - `docker compose up -d` to run it in the background
   - `docker compose up --build` to rebuild the image before running

### from source
1. [install node.js](https://nodejs.org/en/download) and [git](./CONTRIBUTING.md#git)
2. [clone the repository](./CONTRIBUTING.md#cloning)
3. (optional but recommended) install pnpm using `npm install -g pnpm`
4. install dependencies using `npm`/`pnpm install`
5. build the website using `pnpm build`
6. run using `pnpm start`

### for testing changes
it's explained [here](./CONTRIBUTING.md#testing-your-changes)

## why?
at first, this was made because i disliked a lot of stuff about hyper's instance list.

recently, people were using instance lists for scraping instances which led to them running out of bandwidth, cookies, or have experienced reduced performance.

because of that, wukko has decided that
> instance lists will not go back up as-is. all future lists must be opt-in, instances must be added only after hoster's explicit consent to participate.

and hyper has decided that
> my list will be closed off from the public

(it's now back at another url with a similar number of instances)

and i have decided that i'm going to keep improving this one.

## license
this project is under the gpl-3.0 license, which means that:
- everyone that can access the website must also have access to the code
- if you use (parts of) my code, you must credit me
- you can't change the license to a different one
<sup>this is not legal advice, contact a lawyer when in doubt</sup>

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

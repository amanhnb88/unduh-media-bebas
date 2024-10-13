# contributing
hi! looks like you want to contribute to this project, and i am really happy because of that :3

if you want to contribute, (i hope) this is all you need to know:

## git
please, for the love of god, don't commit using your web browser, use [git](https://git-scm.com/) instead. it's not hard to set up and it'll save you a lot of your time.

### using ssh for commiting
also, while you're here, you should use ssh for commiting.

if you don't know how to do that, here's a pretty clear tutorial made by codeberg: https://docs.codeberg.org/security/ssh-key/

### cloning
after doing that, just do `git clone git@codeberg.org:kwiat/instances.git` and you're done.

if you have decided to deal with entering your codeberg credentials every time you push or with git credential manager instead of just [using ssh for commiting](#using-ssh-for-commiting), do `git clone https://codeberg.org/kwiat/instances.git` instead.

## what you will need
- python and pip
- required dependencies (install them using `pip install -r requirements.txt`):
  - commentjson
  - flask
  - requests
  - Flask-Caching
- knowledge(html, css) if modifying_website else knowledge(python, flask)

## commit titles
for commit titles, just stick with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) + the [angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

tl;dr: <br>
`feat: ___` - adds something <br>
`fix: ___` - fixes something <br>
`refactor: ___` - changes something existing <br>
`__!: ___` - breaking change <br>

optionally (i don't use these): <br>
`docs: ___` - changes to docs <br>
`test: ___` - adding or correcting tests <br>
`perf: ___` - improving performance

## signing
if you can and you're on linux/mac, sign your commits. it can be used to verify that this is actually you commiting that and not someone else that set their config to impersonate you.

if you don't know how to do that, here's a pretty clear tutorial made by codeberg: https://docs.codeberg.org/security/gpg-key/

## how much commits?
if you can, avoid making more than 3 commits.

### bub fix
no, don't make a commit to fix a bug, do this instead:
1. `git reset HEAD~` to undo the last commit
2. commit again
3. `git push --force`

## closes #x
if you're making a pull request that fixes, adds something or anything related to an issue, don't forget to add a line saying `closes #x` somewhere, preferably on the beginning.

## testing your changes
### website changes
first of all, don't use `flask run` or `flask run --debug` for testing changes, use `python3 app.py`. it temporarily removes caching so it's **a lot** easier to test.

after using that, open http://localhost:5000 in your browser, go to the page you changed and see if it works

### scanning instances
just scan the instances using `python3 scan.py` and see if the output is good by [running the website](#website-changes) or looking at `output/instances.json`.
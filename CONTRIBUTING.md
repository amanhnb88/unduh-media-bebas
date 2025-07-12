# contributing
hi! looks like you want to contribute to this project, and i am really happy because of that :3

if you want to contribute, (i hope) this is all you need to know:

## what you will need
- node.js
- npm/pnpm (pnpm is preferred)
- [git](#git) (optional but recommended)

## git
please, for the love of god, don't commit using your web browser, use [git](https://git-scm.com/) instead. it's not hard to set up, and it'll save both of us a lot of time.

### using ssh for committing
also, while you're here, you should use ssh for committing.

if you don't know how to do that, here's a pretty clear tutorial made by codeberg: https://docs.codeberg.org/security/ssh-key/

### cloning
after doing that, just do `git clone git@codeberg.org:kwiat/instances.git` and you're done.

if you have decided to deal with entering your codeberg credentials every time you push or with git credential manager instead of just [using ssh for committing](#using-ssh-for-committing), do `git clone https://codeberg.org/kwiat/instances.git` instead.

### signing
if possible, sign your commits. it can be used to verify that this is actually you committing that and not someone else that set their config to impersonate you.

if you don't know how to do that, here's a pretty clear tutorial made by codeberg: https://docs.codeberg.org/security/gpg-key/

### bub fix
no, don't make a commit to fix a bug introduced in the last commit, do this instead:
1. `git commit --amend -m "commit message"`
2. `git push --force`

## commit titles
for commit titles, just stick with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) + the [angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

tl;dr: <br>
`feat: ___` - adds something <br>
`fix: ___` - fixes something <br>
`refactor: ___` - changes something existing <br>
`__!: ___` - breaking change <br>

but i use it like: <br>
`feat: ___` - adds or changes something <br>
`fix: ___` - fixes something <br>
`refactor: ___` - small changes that don't really affect that much <br>
`__!: ___` - breaking or big change <br>

you can also use these: <br>
`docs: ___` - changes to docs <br>
`test: ___` - adding or correcting tests <br>
`perf: ___` - improving performance

## closes #x
if you're making a pull request that fixes, adds something or anything related to an issue, don't forget to add a line saying `closes #x` somewhere, preferably on the beginning.

## testing your changes
### website changes
while developing, do `pnpm dev`, then open http://localhost:5173 in your browser.

if you're finished developing, test if everything works after building. you can find building instructions [here](./README.md#from-source)

### scanning instances
to scan instances, run `pnpm scan`.

after doing that, see if the output looks good by [running the website](#website-changes) or looking at `output/instances.json`.

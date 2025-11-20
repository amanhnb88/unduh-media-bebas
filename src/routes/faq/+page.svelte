<style>
    main {
        max-width: 800px;
    }

    p {
        margin: 0;
    }

    summary {
        font-size: 16px;
        margin-bottom: 6px;
    }

    details > :not(summary, ul) {
        padding-left: 14px;
    }

    details {
        margin-bottom: 4px;
    }

    main:has(details[open]) > details,
    details > div {
        margin-bottom: 10px;
    }

    .margin {
        margin-top: 6px;
    }

    a {
        text-decoration: underline;
    }

    ul {
        margin: 2px 0;
        padding-left: 31px;
    }

    li {
        list-style-type: "- ";
    }
</style>

<main>
    <details>
        <summary>what is an instance?</summary>
        <p id="what-is-an-instance">
            since <a href="https://github.com/imputnet/cobalt">cobalt is open-source</a>,
            people can run the same code as cobalt's servers and host what's called an instance.
        </p>

        <p>
            these instances are hosted by different owners, in different locations,
            with different cookies, authentication settings, configurations etc.
        </p>
    </details>

    <details>
        <summary>how do i run an instance?</summary>
        <div>
            <p id="running-an-instance"><b>requirements:</b></p>
            <p>
                first of all, you'll need a computer running linux.
                it can run something else, but it might be more complicated to set up.
            </p>
            <p>if you plan to make the instance public, try to keep it running 24/7.</p>
        </div>

        <div>
            <p><b>running the instance:</b></p>
            <p>
                creators of cobalt have already made a good tutorial for this, read it
                <a href="https://github.com/imputnet/cobalt/blob/main/docs/run-an-instance.md">
                    here
                </a>.
            </p>
            <p class="margin">
                after hosting the instance, you should also protect it.
                it's optional, but recommended if you plan on exposing it to the internet.
            </p>
            <p>

                again, there is already a tutorial for this, and you can read it
                <a href="https://github.com/imputnet/cobalt/blob/main/docs/protect-an-instance.md">
                    here
                </a>.
            </p>
            <p class="margin">
                if you set it up and exposed it,
                <a href="#adding-an-instance">consider adding your instance to this instance list</a>!
            </p>
        </div>
    </details>

    <details>
        <summary>how do i add my instance here?</summary>
        <p id="adding-an-instance">there are multiple ways to do it:</p>
        <ul>
            <li>
                make an account on <a href="https://codeberg.org">codeberg</a>, edit
                <a href="https://codeberg.org/kwiat/instances/src/src/lib/input/instances.json">this</a>
                file to make it include your instance at the end, and make a pull request
            </li>
            <li>contact me on discord, my username is <b>kwiatekmiki</b></li>
            <li>contact me by email: <a href="mailto:hi@kwiatekmiki.pl">hi@kwiatekmiki.pl</a></li>
            <li>contact me on twitter: <a href="https://twitter.com/spawnfur">@spawnfur</a></li>
            <li>mention me on the fediverse: <a href="https://meow.rent/@spawn">@spawn@meow.rent</a></li>
            <li>mention me on bluesky: <a href="https://spawn.meow.rent">@spawn.meow.rent</a></li>
        </ul>
    </details>

    <details>
        <summary>who is running this website?</summary>
        <p class="disabled" id="owner">note: this is only true for instances.cobalt.best</p>
        <p>
            <a href="https://kwiatekmiki.com">kwiatekmiki</a>.
            i'm also the person that coded it!
        </p>

        <p>
            if you have any questions, feel free to contact me at
            <a href="mailto:legal@hotfurriesinyourarea.gay">legal@hotfurriesinyourarea.gay</a>.
        </p>
    </details>

    <details>
        <summary>are there any alternatives to this list?</summary>
        <p id="list-alternatives">
            the only one i'm aware of is <a href="https://cobalt.directory">cobalt.directory</a>
        </p>
    </details>
</main>
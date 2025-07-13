<script lang="ts">
    import type { Instance } from "$lib/types";
    const props = $props();
    const link = `//${props.data.domain}/instances.json`;

    const exampleResponse: Instance[] = [
        {
            "api": "cobalt.invalid",
            "frontend": null,
            "protocol": "https",
            "online": false,
        },
        {
            "api": "api.cobalt.example",
            "frontend": "cobalt.example",
            "protocol": "https",
            "online": true,
            "score": 64,
            "status": "medium",
            "services": {
                "youtube": true,
                "youtube music": true,
                "youtube shorts": true,
                "tiktok": true,
                "instagram": true,
                "soundcloud": true,
                "twitter": true,
                "reddit": true,
                "pinterest": true,
                "facebook": true,
                "bluesky": true,
                "twitch": true,
                "snapchat": true,
                "newgrounds": false,
                "bilibili": true,
                "bilibili tv": true,
                "odnoklassniki": true,
                "streamable": "error.api.rate_exceeded",
                "tumblr": "timed out",
                "vk": "something went wrong while testing",
                "vimeo": "blocked by cloudflare",
                "dailymotion": "error.api.rate_exceeded",
                "rutube": "invalid response",
                "loom": "invalid api key",
                "xiaohongshu": false
            },
            "version": "10.9.4",
            "info": {
                "auth": false,
                "cors": true
            },
            "git": {
                "remote": "imputnet/cobalt",
                "branch": "main",
                "commit": "4b9644ebdfbfe7bc6f7ec2d476692e3619cb59bd"
            }
        }
    ];
</script>

<style>
    p, pre:first-of-type {
        margin: 0;
    }

    pre {
        margin-top: 4px;
    }

    a {
        text-decoration: underline;
    }
</style>

<main>
    <h2>instances</h2>
    <p><b>important: before, you were supposed to use /api/instances.json. it will be removed soon, and the response now looks different.</b></p>
    <p>you can find the list of instances at <a href={link}>{link.slice(2)}</a>.</p>
    <p>make sure you change the user-agent! i'm blocking default user-agents to prevent bots from hitting my websites.</p>
    <p>example user-agent: <code>your-project/versionorcommit (+https://codeberg.org/kwiat/yourproject)</code></p>
    <p style="margin-top: 19px">this is how the response will look like:</p>
    <pre>{JSON.stringify(exampleResponse, undefined, 4)}</pre>
    <p style="margin-top: 19px">
        if you know typescript, you can also take a look at the Instance type
        <a href="https://codeberg.org/kwiat/instances/src/branch/main/src/lib/types.ts">here</a>.
    </p>

    <h2>last updated</h2>
    <p>if you want to know when the instance list was last updated, just do a request to <code>/api/lastupdated</code></p>
    <p>and you'll get the time<b>stamp</b> of the last update. example response:</p>
    <pre>1752348997541</pre>

    <div style="padding-bottom: 12px"></div>
</main>
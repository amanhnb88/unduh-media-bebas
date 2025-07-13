<script lang="ts">
    const props = $props();
    const env: { [key: string]: string } = props.data.env;
</script>

<svelte:head>
    {#if env.PLAUSIBLE_DOMAIN}
        <script defer data-domain={env.PLAUSIBLE_DOMAIN}
                src="https://{env.PLAUSIBLE_HOST || 'plausible.io'}/js/script.js"
        ></script>
    {/if}

    {#if env.UMAMI_ID}
        <script defer data-website-id={env.UMAMI_ID}
                src="https://{env.UMAMI_HOST || 'cloud.umami.is'}/js/script.js"
        ></script>
    {/if}
</svelte:head>

<style>
    header {
        display: flex;
        align-items: center;
        flex-direction: column;

        margin-bottom: 1.5rem;
        font-family: var(--cobalt-font), monospace;
    }

    #headerlinks {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
    }

    #headertext {
        font-size: 5rem;
        padding: 0;
        letter-spacing: -.35rem;
        font-weight: 400 !important;
        text-align: center;
        cursor: pointer;
    }

    #headerlinks > a::after {
        content: " · ";
        white-space: pre;
    }

    #headerlinks > a:last-child:after {
        content: "";
    }
</style>

<header>
    <a id="headertext" href="/">
        >> cobalt instances
    </a>

    <div id="headerlinks">
        <a href="/api">api</a>
        <a href="/faq">faq</a>
        <a href="https://codeberg.org/kwiat/instances"
           target="_blank">source code</a>
        <a href="/faq#adding-an-instance">add your instance</a>
    </div>
</header>

{@render props.children()}

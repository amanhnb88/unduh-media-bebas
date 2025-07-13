<script lang="ts">
    import type { Instance } from "$lib/types";
    import Search from "$lib/components/icons/Search.svelte";

    const props = $props();
    const instances: Instance[] = props.instances;
    const lastUpdated: number = props.lastUpdated || 0;

    let options = $state({
        turnstile: false,
        online: true,
        frontend: true,
        score: false,
        search: "",
    });
</script>

<svelte:head>
    <style>
        .settings-item > input[type='text'] {
            color: var(--text);
        }

        input:checked::before {
            border-bottom: .18rem solid var(--background);
            border-right: .18rem solid var(--background);
        }

        .settings-item > svg {
            appearance: none;
            z-index: 0;

            margin: 3px .7rem 3px 4px;

            width: 20px;
            height: 20px;
        }

        .settings-item:has(#search) > svg {
            margin-left: 5px;
        }

        #search {
            font-family: var(--text), monospace;
            margin-left: 8px;
        }
    </style>
</svelte:head>

<style>
    main {
        display: flex;
        align-items: flex-start;

        margin-top: 0.5rem;
    }

    .disabled {
        margin-top: 0;
    }

    /* settings */
    #settings {
        display: flex;
        flex-direction: column;
    }

    .settings-item {
        display: inline-flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;

        background: rgb(25, 25, 25);
        color: rgb(225, 225, 225);

        padding: .4rem .8rem .4rem .5rem;
        margin-right: .7rem;
        margin-bottom: .7rem;

        border-radius: 9px;
        width: auto;
    }

    .settings-item > input[type="checkbox"] {
        cursor: pointer;
        appearance: none;
        z-index: 0;
        margin-right: .7rem;

        border: .15rem solid rgb(225, 225, 225);
        border-radius: 4px;

        width: 20px;
        height: 20px;
    }

    .settings-item > input[type='text'] {
        appearance: none;
        outline: none;
        border: none;
        z-index: 0;

        background-color: transparent;
        font-size: 14px;

        width: 100%;
        height: 20px;
    }

    input:checked {
        background-color: rgb(225, 225, 225);
        border: 0;
    }

    input:checked::before {
        content: "";

        display: block;
        position: relative;

        transform: scaleX(.9) rotate(45deg);
        left: 5px;

        width: 5px;
        height: 11px;
    }

    @media (prefers-color-scheme: light) {
        .settings-item {
            background-color: rgb(232, 232, 232);
            color: rgb(40, 40, 40);
        }

        .settings-item > input[type="checkbox"] {
            border-color: rgb(25, 25, 25);
        }

        .settings-item > input[type="checkbox"]:checked {
            background-color: rgb(25, 25, 25);
        }
    }
</style>

<p class="disabled">
    last updated:
    {#if lastUpdated !== 0}
        {new Date(lastUpdated).toLocaleTimeString()}
    {:else}
        never
    {/if}
</p>

<main>
    <div id="settings">
        <div class="settings-item">
            <Search />
            <input type="text" placeholder="search instances"
                   id="search" bind:value={options.search} />
        </div>

        <div class="settings-item">
            <input type="checkbox" id="turnstile" bind:checked={options.turnstile} />
            <label for="turnstile">only instances w/out turnstile</label>
        </div>

        <div class="settings-item">
            <input type="checkbox" id="online" bind:checked={options.online} />
            <label for="online">only online instances</label>
        </div>

        <div class="settings-item">
            <input type="checkbox" id="frontend" bind:checked={options.frontend} />
            <label for="frontend">only instances with frontend</label>
        </div>

        <div class="settings-item">
            <input type="checkbox" id="score" bind:checked={options.score} />
            <label for="score">only instances with high score</label>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>frontend</th>
                <th>api</th>
                <th>score</th>
                <th>version</th>
            </tr>
        </thead>
        <tbody>
            {#each instances as instance}
            {@const hidden = (options.online && !instance.online) ||
                (options.turnstile && instance.online && instance.info.auth) ||
                (options.score && instance.online && instance.score < 75) ||
                (options.frontend && !instance.frontend) ||
                (options.search !== "" && !instance.api.includes(options.search.toLowerCase()))}

            <tr data-api={instance.api} data-online={instance.online}
                data-frontend={instance.frontend || undefined} {hidden}
                class={instance.online ? instance.status : "disabled"}
                data-auth={instance.online ? (instance.info?.auth || false) : false}
            >
                <td>
                    {#if instance.frontend}
                    <a href="https://{instance.frontend}">{instance.frontend}</a>
                    {:else} - {/if}
                </td>
                <td>
                    <a href="https://{instance.api}">{instance.api}</a>
                </td>
                <td>
                    <a href="/instance/{instance.api}">
                        {instance.online ? instance.score : 0}%
                    </a>
                </td>
                <td>{instance.online ? instance.version : "unknown"}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>
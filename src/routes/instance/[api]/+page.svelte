<script lang="ts">
    import Branch from "$lib/components/icons/Branch.svelte";
    import Commit from "$lib/components/icons/Commit.svelte";
    import Fork from "$lib/components/icons/Fork.svelte";
    import type { Instance } from "$lib/types";

    const props = $props();
    const instance: Instance = props.data.instance;
    const apiSuffix = (instance.online && instance.version.split("")[0] !== "1")
        ? "api/serverInfo" : "";
</script>

<svelte:head>
    <style>
        svg {
            vertical-align: middle;
            height: 16px;
            width: 16px;
            margin-right: 7px;
        }

        svg * {
            fill: var(--text);
        }
    </style>
</svelte:head>

<style>
    p {
        margin: 0;
    }

    #links, #git {
        margin-bottom: 10px;
    }

    #git > div {
        margin-bottom: 3px;
    }

    #git span {
        margin: 0;
        transform: translateX(10px);
    }
</style>

<div id="links">
    <p>
        api:
        <a href="{instance.protocol}://{instance.api}/{apiSuffix}">
            {instance.api}
        </a>
    </p>

    {#if instance.frontend}
    <p>
        web:
        <a href="{instance.protocol}://{instance.frontend}">
            {instance.protocol}://{instance.frontend}
        </a>
    </p>
    {/if}
</div>

{#if instance.online}
<div id="git">
    <div>
        <Fork /><span>
        {instance.git.remote?.slice(0, 24) || "unknown"}</span>
    </div>

    <div>
        <Branch /><span>
        {instance.git.branch.slice(0, 24)}</span>
    </div>

    <div>
        <Commit /><span>
        {instance.git.commit.slice(0, 8)}</span>
    </div>
</div>

<table>
    <thead>
        <tr>
            <th>service</th>
            <th>working?</th>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(instance.services) as service}
        <tr>
            <td>
                <a href="/service/{service[0]}">
                    {service[0].replace("-", " ")}
                </a>
            </td>

            <td>
                {#if service[1] === true}
                    ✅
                {:else}
                    {@const error = service[1] || "disabled or not supported"}
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a title={error} onclick={()=>alert(error)} href="#">❌</a>
                {/if}
            </td>
        </tr>
        {/each}
    </tbody>
</table>
{/if}

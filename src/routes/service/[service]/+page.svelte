<script>
    const props = $props();
    const { service, instances, lastUpdated } = props.data;
    import InstanceTable from "$lib/components/InstanceTable.svelte";
</script>

<style>
    p {
        margin: 0;
    }
</style>

<p class="disabled">
    only showing instances that work with {service}.
    for all instances, go <a href="/">here</a>.
</p>

<InstanceTable {instances} {lastUpdated} />

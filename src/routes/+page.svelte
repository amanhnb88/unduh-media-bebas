<script>
    const props = $props();
    const { instances, lastUpdated } = props.data;
    import InstanceTable from "$lib/components/InstanceTable.svelte";
</script>

<InstanceTable {instances} {lastUpdated} />

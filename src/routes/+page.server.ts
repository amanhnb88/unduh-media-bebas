import { getInstances, lastScanned } from "$lib/instances";

export async function load() {
    return {
        instances: await getInstances(),
        lastUpdated: await lastScanned(),
    }
}

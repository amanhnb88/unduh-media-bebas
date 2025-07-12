import {getInstances, lastScanned} from "$lib/instances";

export async function load({ params }) {
    const instances = await getInstances();
    const service = params.service;

    return {
        service,
        instances: instances.filter(i =>
            i.online && i.services[service] === true),
        lastUpdated: await lastScanned(),
    }
}

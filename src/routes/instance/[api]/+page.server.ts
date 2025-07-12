import { getInstances } from "$lib/instances";
import type { Instance } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const instances: Instance[] = await getInstances();
    const instance: Instance = instances.filter(i => i.api === params.api)[0];
    if (!instance) error(404, "couldn't find instance");
    return { instance };
}
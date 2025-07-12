import { getInstances } from "$lib/instances";
import { json } from "@sveltejs/kit";
import type {Instance} from "$lib/types";

export async function GET() {
    const instances = await getInstances();
    const oldInstances = instances.map((instance: Instance): any => {
        let meow: any = {
            api: instance.api,
            frontend: instance.frontend || "None",
            nodomain: false,
            online: instance.online,
            protocol: instance.protocol,
            trust: 1,
        };

        if (instance.online)
            meow = {
                ...meow,
                ...instance.git,
                services: instance.services,
                score: instance.score,
                version: instance.version,
                cors: instance.info.cors,
                name: "None",
            };
        else meow = {
            ...meow,
            score: -1,
            services: {},
        }

        return meow;
    });

    return json(oldInstances);
}

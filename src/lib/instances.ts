import type { Instance } from "$lib/types";
import { readFile } from "fs/promises";

export async function getInstances(): Promise<Instance[]> {
    try {
        const file: Buffer = await readFile("src/lib/output/instances.json");
        return JSON.parse(file.toString())
            .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
            .filter((a: Instance) => !a.toString().toLowerCase().includes("api-key"));
    } catch {
        return [];
    }
}

export async function lastScanned(): Promise<number> {
    try {
        const file: Buffer = await readFile("src/lib/output/scan-time");
        return +file.toString();
    } catch {
        return 0;
    }
}

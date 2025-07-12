import { lastScanned } from "$lib/instances";

export async function GET() {
    return new Response((await lastScanned()).toString());
}

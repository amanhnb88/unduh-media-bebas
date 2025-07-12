import { getInstances } from "$lib/instances";
import { json } from "@sveltejs/kit";

export async function GET() {
    return json(await getInstances());
}

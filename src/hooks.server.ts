import { getInstances } from "$lib/instances";
import { spawn } from "child_process";
declare const env: Record<string, string | undefined>;
const scanInterval: string | undefined = env.SCAN_INTERVAL;
const scan = () =>
    spawn("node", ["src/lib/scan.ts"], { stdio: "inherit" });

if ((await getInstances()).length < 1) scan();
if (scanInterval && +scanInterval > 10) {
    setInterval(scan, +scanInterval * 60000);
}

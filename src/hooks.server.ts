import { getInstances } from "$lib/instances";
import { spawn } from "child_process";

const env = process.env;
const scanInterval: string | undefined = env.SCAN_INTERVAL;
const scanOnStart: string | undefined = env.SCAN_ON_START;

const scan = () =>
    spawn("node", ["--experimental-strip-types", "src/lib/scan.ts"], { stdio: "inherit" });

if ((await getInstances()).length < 1 || scanOnStart !== "false") {
    scan();
}

if (scanInterval && +scanInterval > 10) {
    setInterval(scan, +scanInterval * 60000);
}

import type { Instance, Protocol } from "./types";
import { readFile, writeFile, mkdir } from "fs/promises";
import { execSync } from "child_process";
import colors from "colors/safe.js";

let config: {
    ignored: string[];
    apiKeys: {
        [api: string]: string,
    }
} = {
    ignored: [],
    apiKeys: {}
};
try { // @ts-ignore
    const configFile = await import('./input/config.ts');
    config.ignored = configFile.ignored || [];
    config.apiKeys = configFile.apiKeys || {};
} catch {}

let commit: string = "dev";
try {
    commit = execSync("git rev-parse --short @").toString().trim();
} catch {}

const init: RequestInit = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": `cobalt-instances/${commit} (+https://codeberg.org/kwiat/instances)`,
    }
}

type InputInstance = [Protocol, string, string];

function status(s: number) {
    if (s === 100) return "perfect";
    else if (s > 75) return "good";
    else if (s > 40) return "medium";
    else return "bad";
}

async function getJsonFile(path: string): Promise<any> {
    const file: Buffer = await readFile(path);
    const content: string = file.toString();
    return JSON.parse(content);
}

function time(start: number): string {
    return (new Date().getTime() - start) / 1000 + "s";
}

async function testService(
    apiLink: string,
    identifier: string,

    test: string,
    services?: string[],
): Promise<string | boolean> {
    const service = keyToService(test);
    if (services && !services.includes(service)) return false;

    try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), service === "soundcloud" ? 30000 : 90000);

        const request: Response = await fetch(apiLink, {
            ...init,
            signal: controller.signal,
            method: "POST",
            body: JSON.stringify({
                url: tests[test],
            }),
            headers: {
                ...init.headers,
                ...((identifier in config.apiKeys) ? {
                    "Authorization": `Api-Key ${config.apiKeys[identifier]}`,
                } : {}),
            }
        });

        let response: any = await request.text();
        try {
            response = JSON.parse(response);
        } catch (e) {
            return response.includes("Sorry, you have been blocked") ?
                "blocked by cloudflare" : "invalid response";
        }

        if (response.status !== "error") {
            if (request.status === 200) return true;
            return "status code isn't 200";
        } else return response.text?.split(".")[0] || response.error?.code || "no error";
    } catch (e: any) {
        if (e.name === "AbortError") return "timed out";
        throw e;
    }
}

async function testInstance(
    protocol: Protocol,
    api: string,
    frontend: string | null
): Promise<Instance> {
    let apiLink = `${protocol}://${api}`;
    let instance: Instance = {
        api, frontend, protocol,
        online: false,
    };

    let apiRequest: Response;
    try {
        apiRequest = await fetch(apiLink + "/api/serverInfo", {
            ...init,
            redirect: "manual"
        });
    } catch {
        console.log(colors.red(
            api + " is offline, marking as offline."
        ));
        return instance;
    }

    let newApi: boolean;
    switch (apiRequest ? apiRequest.status : 1) {
        case 200:
            newApi = false;
            apiLink += "/api/json";
            break;
        case 302:
            try {
                apiRequest = await fetch(apiLink, init);
            } catch {
                console.log(colors.red(
                    api + " is offline, marking as offline."
                ));
                return instance;
            }

            newApi = true;
            break;
        default:
            console.log(colors.red(
                api + " is offline or returned an invalid response, marking as offline. " +
                `[${apiRequest?.status || ""}]`
            ));
            return instance;
    }

    let apiInfo: any = await apiRequest.text();
    try {
        apiInfo = JSON.parse(apiInfo);
    } catch {
        console.log(colors.red(
            `${api} returned an invalid response, marking as offline.`
        ));
        return instance;
    }

    const _instance: {
        api: string;
        frontend: string | null;
        protocol: Protocol;
        online: boolean;
        score: number;
        services: {};
        status: "bad";
    } = {
        ...instance,
        online: true,
        score: 0,
        services: {},
        status: "bad",
    }


    if (newApi) {
        let corsHeader: string | null = null;
        try {
            corsHeader = apiRequest.headers.get("access-control-allow-origin");
        } catch {}

        instance = {
            ..._instance,
            version: apiInfo.cobalt.version,
            info: {
                auth: !!apiInfo.cobalt.turnstileSitekey,
                cors: corsHeader === "*",
            },
            git: {
                remote: apiInfo.git.remote.toString(),
                branch: apiInfo.git.branch.toString(),
                commit: apiInfo.git.commit.toString(),
            },
        };
    } else {
        instance = {
            ..._instance,
            version: apiInfo.version,
            info: {
                auth: false, // turnstile and api keys were implemented in 10.x
                cors: apiInfo.cors === 1,
            },
            git: {
                branch: apiInfo.branch.toString(),
                commit: apiInfo.commit.toString(),
            },
        };
    }

    if (!instance.online) return instance;
    console.log(colors.green(
        `${api} is working, testing services.`
    ));

    let services: string[] = apiInfo.cobalt?.services
        .map((s: string) => s.replace(/ clips$/, "")) ||
            [
                "youtube", "dailymotion", "facebook", "instagram", "loom",
                "pinterest", "reddit", "rutube", "snapchat", "soundcloud",
                "streamable", "tiktok", "twitch", "twitter", "vimeo",
                "vk", "ok"
            ];

    for (let test of Object.keys(tests)) {
        const start = new Date().getTime();
        let result: string | boolean = "something went wrong while testing";

        try {
            result = await testService(apiLink, api, test, services);
            test = test.replace("-", " ");
            switch (result) {
                case true:
                    console.log(colors.green(
                        `${test} is working on ${api}, took ${time(start)}`
                    ));

                    instance.score += (1 / +Object.keys(tests).length) * 100;
                    break;
                case false:
                    console.log(colors.red(
                        `${test} is not enabled or supported on ${api}, not checking.`
                    ));
                    break;
                case "timed out":
                    console.log(colors.red(
                        `${test} timed out on ${api}, took ${time(start)}`
                    ));
                    break;
                case "something went wrong while testing":
                    console.log(colors.red(
                        `something went wrong when trying to test ${test} on ${api}`
                    ));
                    break;
                case "blocked by cloudflare":
                    console.log(colors.red(
                        `cloudflare blocked our response for testing ${test} on ${api}`
                    ));
                    break;
                case "invalid response":
                    console.log(colors.red(
                        `${api} returned an invalid response when testing ${test}, took ${time(start)}`
                    ));
                    break;
                case "error.api.auth.key.invalid":
                case "error.api.auth.key.not_found":
                case "error.api.auth.key.invalid_ip":
                case "error.api.auth.key.ip_not_allowed":
                case "error.api.auth.key.ua_not_allowed":
                    console.log(colors.red(
                        `${api} didn't accept your api key, ` +
                        (result.endsWith("invalid_ip") ?
                            "because something went wrong. plase report this to the instance owner" :
                            "check your config") + `: ${result}`
                    ));

                    instance.info.auth = true;
                    Object.keys(tests).forEach((key: string) => {
                        instance.services[key] = instance.services[key] || "invalid api key"
                    });

                    return instance;
                case "error.api.auth.jwt.missing":
                    console.log(colors.red(`turnstile is required on ${api}, set up an api key.`));

                    instance.info.auth = true;
                    Object.keys(tests).forEach((key: string) => {
                        instance.services[key] = instance.services[key] || "no api key"
                    });

                    return instance;
                default:
                    console.log(colors.red(
                        `${test} doesn't work on ${api}, took ${time(start)}: ` + result
                    ));
            }
        } catch (e) {
            console.log(colors.red(
                `something went wrong when trying to test ${test} on ${api}, took ${time(start)}: ${e}`
            ));
        } finally {
            instance.services[test] = instance.services[test] || result;
            const timeout = 5000 + (Math.random() * 2000);
            await new Promise(r => setTimeout(r, timeout));
        }
    }

    instance.status = status(instance.score);
    return instance;
}

const keyToService: ((k: string) => string) = k => k
    .replace(" ", "-").split("-")[0]
    .replace(/^odnoklassniki$/, "ok");

type Tests = { [service: string]: boolean | string };
const rawTests: Tests = await getJsonFile("src/lib/input/tests.json");
let tests: Tests = {};

for (const test of Object.entries(rawTests)) {
    tests[test[0].replaceAll(" ", "-")] = test[1];
}

const instances: InputInstance[] = (await getJsonFile("src/lib/input/instances.json"))
    .filter((i: InputInstance) => !config.ignored.includes(i[1]));
instances.shift();

const start = new Date().getTime();
const output: Instance[] = (await Promise.all(instances.map(async i => {
    try {
        const start = new Date().getTime();
        const result = await testInstance(...i);

        console.log(colors.white(
            `finished testing ${i[1]}, took ${time(start)}`
        ));

        return result;
    } catch (e) {
        console.log(colors.red(
            `something went wrong while testing ${i[1]}: ` + e?.toString()
        ));
    }
}))).filter(r => r !== undefined);

console.log(colors.reset(
    `finished scanning, took ${time(start)}`
));

try { await mkdir("src/lib/output") } catch {}
await writeFile("src/lib/output/instances.json", JSON.stringify(output));
await writeFile("src/lib/output/scan-time", new Date().getTime().toString());

process.exit(0);

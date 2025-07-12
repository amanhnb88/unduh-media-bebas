export type Protocol = "http" | "https";
export type Status = "perfect" | "good" | "medium" | "bad";

export type Instance = {
    api: string,
    frontend: string | null,
    protocol: Protocol,
} & (
    {
        online: true, // api is online
        version: string,
        score: number,
        status: Status,
        services: {
            [service: string]: boolean | string,
        },
        info: {
            limit?: number, // added in 10.x
            auth: boolean, // will always be false on >10.x
            cors: boolean,
        }
        git: {
            remote?: string, // added in 10.x
            branch: string,
            commit: string,
        },
    } | {
        online: false, // api is offline
    }
);
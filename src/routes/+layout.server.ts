export async function load() {
    let env: { [key: string]: any } = {};
    Object.entries(process.env)
        .filter(e => e[1] !== undefined && /^(PLAUSIBLE|UMAMI)_/.test(e[0]))
        .forEach(e => env[e[0]] = e[1]);

    return {
        env: env
    };
}

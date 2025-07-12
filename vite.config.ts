import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
const env = loadEnv("production", ".", "");

export default defineConfig({
	plugins: [sveltekit()],
	define: { env },
});

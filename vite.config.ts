import { defineConfig, loadEnv } from "vite";

import { getProjectBuildOptions, getProjectDefaultConfig, getProjectPluginsOptions, getProjectPreviewOptions, getProjectServerOptions } from './.vite/functions';
import { dependencies } from './.vite/constants';

export default defineConfig(({ mode }) => {
	const rootPath = process.cwd();

	const env = loadEnv(mode, process.cwd(), "");
	
	const options = { mode, env, rootPath, dependencies };
	
	const config = {
		...getProjectDefaultConfig(options),
		plugins: getProjectPluginsOptions(options),
		server: getProjectServerOptions(options),
		preview: getProjectPreviewOptions(options),
		build: getProjectBuildOptions(options),
	};
	
	return config;
});
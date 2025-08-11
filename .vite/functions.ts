import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

import { UserConfig } from 'vite';
import path from 'path';
import hmrConnectionLogger from './plugins/hmr-connection-logger';

export const getProjectDefaultConfig = ({}: Record<string, any>) => ({
	preserveSymlinks: true,
	envPrefix: 'BRK_',
	cacheDir: '.vite/cache',
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "..", "./src"),
		},
	},
}) as Partial<UserConfig>

export const getProjectServerOptions = ({ env, mode }: Record<string, any>) => ({
	port: Number(env?.APP_DEV_SERVER_PORT ?? 3000),
	strictPort: true,
	open: false,
	hmr: {
		path: "/",
		protocol: "ws",
		overlay: true
	},
	cors: {
		origin: "*",
	},
	watch: {
		usePolling: true,
		interval: 1000,
	},
}) as Partial<UserConfig['server']>

export const getProjectPreviewOptions = ({ env, mode }: Record<string, any>) => ({
	host: String(env?.APP_SERVER_HOST ?? '0.0.0.0'),
	port: Number(env?.APP_SERVER_PORT ?? 3000),
	allowedHosts: env?.APP_SERVER_NAME ? [env?.APP_SERVER_NAME] : [],
	strictPort: true,
}) as Partial<UserConfig['preview']>

export const getProjectBuildOptions = ({ mode, env, dependencies }: Record<string, any>) => ({
	manifest: true,
	html: mode !== 'production',
	emptyOutDir: true,
	sourcemap: mode === 'development' || JSON.stringify(env.DEBUG_MODE) == 'true',
	modulePreload: false,
	assetsDir: '.',
	rollupOptions: {
		plugins: [tsconfigPaths()],
		external: [],
		output: {
			assetFileNames: (asset) => {
				return `${asset.type}/${asset.name}`;
			},
			entryFileNames: () => `js/index.js`,
			chunkFileNames: (chunk) => {
				let chunkFilename = chunk.facadeModuleId ? path.basename(chunk.facadeModuleId, path.extname(chunk.facadeModuleId)) : chunk.name;
				chunkFilename = camelToKebabCase(chunkFilename);

				const chunkFilePath = chunk.facadeModuleId ? chunk.facadeModuleId : chunk.moduleIds.find((module) => module.includes(chunk.name));
				const chunkDirPath = chunkFilePath ? path.basename(path.dirname(chunkFilePath)) : null;

				if (chunkDirPath && chunkFilename.includes('index') && chunk.facadeModuleId) {
					chunkFilename = camelToKebabCase(path.basename(chunkDirPath));
				}

				if (chunkDirPath) {
					const chunkDirType = chunkDirPath.match("pages|modules|containers|components|hooks|utils");

					if (chunkDirType?.[0]) {
						return `js/${chunkDirType[0]}/${chunkFilename}.js`;
					}
				}

				if (Object.keys(dependencies.vendor).includes(chunk.name)) {
					return `js/vendor/${chunkFilename}.js`;
				}

				return `js/vendor/${chunkFilename}.js`;
			},
			manualChunks: {
				...dependencies.vendor
			},
		},
	},
	outDir: 'dist',
}) as Partial<UserConfig['build']>

export const getProjectPluginsOptions = ({}: Record<string, any>) => ([
	hmrConnectionLogger(),
	react(),
	tsconfigPaths(),
]) as Partial<UserConfig['plugins']>

export const camelToKebabCase = (value: string) => value.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])(?=[A-Z][a-z])/g, '$1-').toLowerCase();
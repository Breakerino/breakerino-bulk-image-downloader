import { Plugin } from 'vite'

export default function hmrConnectionLogger(): Plugin {
	return {
		name: 'hmr-logger',
		configureServer(server) {
			server.ws.on('connection', (ws, req) => {
				const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
				const origin = req.headers.origin || 'N/A';
				const dateTime = new Date().toISOString();

				console.debug(`[${dateTime}] Breakerino | New connection from "${origin}" (${ip})`);

				ws.on('close', () => {
					console.debug(`[${dateTime}] Breakerino | Connection closed from "${origin}" (${ip})`);
				});
			});
		},
	};
}
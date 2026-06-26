import { defineConfig } from 'vite';
import { buildPlugins } from './build/vite/buildPlugins';
import path from 'path';

export default defineConfig({
	base: '/minesweeper/',
	plugins: buildPlugins(),
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src/app'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@widgets': path.resolve(__dirname, 'src/widgets'),
			'@shared': path.resolve(__dirname, 'src/shared'),
		},
	},
});

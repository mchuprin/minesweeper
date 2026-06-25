import { defineConfig } from 'vite';
import { buildPlugins } from './build/vite/buildPlugins';
import path from 'path';

export default defineConfig({
	base: '/minesweeper/',
	plugins: buildPlugins(),
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, 'public/assets'),
		},
	},
});

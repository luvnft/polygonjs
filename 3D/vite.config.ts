import { defineConfig, PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [
		vue(),
		checker({
			// https://vite-plugin-checker.netlify.app/checkers/vue-tsc.html
			vueTsc: true,
			typescript: true,
		}),
		visualizer({
			template: "treemap", // treemap or sunburst
			open: false,
			gzipSize: true,
			brotliSize: true,
			filename: "analyse.html", // will be saved in project's root
		}) as PluginOption,
	],
});

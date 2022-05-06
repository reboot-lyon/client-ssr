import adapterNode from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			includePaths: ["theme"]
		}
	}),

	kit: {
		adapter: adapterNode({
			out: "build"
		}),
		methodOverride: {
			allowed: ["PATCH", "DELETE"]
		},
		vite: {
			ssr: {
				noExternal: ["node-fetch"]
			},
			resolve: {
				alias: {
					$components: path.resolve("./src/lib/components"),
					$utils: path.resolve("./src/lib/utils"),
					$stores: path.resolve("./src/lib/stores"),
					$env: path.resolve("./src/lib/env")
				}
			}
		}
	}
};

export default config;

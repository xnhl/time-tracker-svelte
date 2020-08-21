import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import preprocess from 'svelte-preprocess'
import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json";
const production = !process.env.ROLLUP_WATCH
function serve() {
	let server
	function toExit() {
		if (server) server.kill(0)
	}
	return {
		writeBundle() {
			if (server) return
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			})
			process.on('SIGTERM', toExit)
			process.on('exit', toExit)
		}
	}
}
export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js"
  },
  plugins: [
    svelte({
      dev: !production,
      preprocess: preprocess({
      	sass: {
      		includePaths: ["src"],
      	},
      	postcss: {
      		plugins: [require("autoprefixer")],
      	},
      }),
      css: (css) => {
        css.write("public/build/bundle.css")
			},
			onwarn: (warning, handler) => {
				if (warning == '(svelte plugin) Unused CSS selector') {return}
				handler(warning)
			}
		}),
		json({compact: true}),
    resolve({
      browser: true,
      dedupe: ["svelte"]
    }),
		commonjs(),
		babel({
			extensions: [".js", ".mjs", ".html", ".svelte"],
			babelHelpers: "runtime",
			exclude: ["node_modules/@babel/**"],
			presets: [
				[
					"@babel/preset-env",
					{
						targets: "> 0.25%, not dead",
					},
				],
			],
			plugins: [
				"@babel/plugin-syntax-dynamic-import",
				[
					"@babel/plugin-transform-runtime",
					{
						useESModules: true,
					},
				],
			],
		}),
    !production && serve(),
    !production && livereload("public"),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}

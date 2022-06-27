import esbuild from "rollup-plugin-esbuild";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { dependencies } from "./package.json";

const coreConfig = {
  input: "./src/index.ts",
  plugins: [
    nodePolyfills(),
    esbuild({
      minify: true,
      tsconfig: "./tsconfig.json",
    }),
  ],
};

export default function createConfig(name, packageDependencies) {
  return [
    {
      ...coreConfig,
      plugins: [nodeResolve({ preferBuiltins: false }), commonjs(), json(), ...coreConfig.plugins],
      output: { file: "./dist/index.umd.js", format: "umd", exports: "named", name },
    },
    {
      ...coreConfig,
      external: [...Object.keys(dependencies), ...packageDependencies],
      output: [
        { file: "./dist/index.cjs.js", format: "cjs", exports: "named", name },
        { file: "./dist/index.es.js", format: "es", exports: "named", name },
      ],
    },
  ];
}

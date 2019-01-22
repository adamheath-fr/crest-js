import { eslint } from "rollup-plugin-eslint";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import { browser, main, module, name } from "../../package.json";

const babelPlugin = babel({
    babelrc: false,
    exclude: "node_modules/**",
    plugins: [
        ["transform-builtin-extend", {
            approximate: true,
            globals: ["Error"]
        }],
        "@babel/plugin-proposal-object-rest-spread"
    ],
    presets: [
        ["@babel/preset-env", {
            "modules": false
        }]
    ]
});
const banner = "// Copyright (c) 2017-2019 ForgeRock AS. Licensed under the MIT license found in LICENSE.md.";
const input = "src/index.js";

export default [{
    // UMD (for Browsers) Configuration.
    input,
    output: {
        banner,
        file: browser,
        format: "umd",
        name,
        sourcemap: true
    },
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        babelPlugin
    ]
}, {
    // CommonJS (for Node) and ES Modules (for Bundlers) Configuration.
    external: ["urijs"],
    input,
    output: [{
        banner,
        file: main,
        format: "cjs",
        name,
        sourcemap: true
    }, {
        banner,
        file: module,
        format: "es",
        name,
        sourcemap: true
    }],
    plugins: [
        eslint(),
        babelPlugin
    ]
}];

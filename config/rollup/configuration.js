import { eslint } from "rollup-plugin-eslint";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import { name } from "../../package.json";

export default {
    input: "src/index.js",
    output: [{
        file: "dist/cjs/crest-js.js",
        format: "cjs",
        name,
        sourcemap: true
    }, {
        file: "dist/umd/crest-js.js",
        format: "umd",
        name,
        sourcemap: true
    }],
    plugins: [
        eslint(),
        resolve(),
        babel({
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
        }),
        /**
         * rollup-plugin-commonjs must come after rollup-plugin-babel to support object spread.
         * @see https://github.com/rollup/rollup/issues/1148#issuecomment-276010208
         */
        commonjs()
    ]
};

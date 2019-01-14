require("@babel/register")({
    presets: ["@babel/preset-env"],
    plugins: [
        ["transform-builtin-extend", {
            approximate: true,
            globals: ["Error"]
        }],
        "@babel/plugin-proposal-object-rest-spread"
    ],
    ignore: [
        "node_modules/**",
        "src/**/*.test.js"
    ]
});

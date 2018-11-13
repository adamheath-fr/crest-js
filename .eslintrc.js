module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        "forgerock",
        "forgerock/filenames",
        "forgerock/promise"
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "camelcase": ["error", {
            allow: [
                "CRESTv2_1",
                "v2_1"
            ]
        }]
    }
};

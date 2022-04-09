"use strict";
exports.__esModule = true;
var config_1 = require("vitest/config");
exports["default"] = (0, config_1.defineConfig)({
    test: {
        exclude: ["**/ignored/**", "**/node_modules/**"],
        watch: false,
        root: "./src",
        coverage: {
            enabled: true
        }
    }
});
//# sourceMappingURL=vite.config.js.map
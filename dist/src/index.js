"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
require("dotenv/config");
var fastify_1 = tslib_1.__importDefault(require("fastify"));
var fastify_swagger_1 = tslib_1.__importDefault(require("fastify-swagger"));
var router_1 = tslib_1.__importDefault(require("./router"));
var main = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var app, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = (0, fastify_1["default"])({
                    logger: true
                });
                app.register(router_1["default"]);
                // @ts-ignore
                return [4 /*yield*/, app.register(fastify_swagger_1["default"], {
                        mode: "static",
                        specification: {
                            path: "./reference/glint.yaml"
                        },
                        exposeRoute: true,
                        routePrefix: "/docs"
                    })];
            case 1:
                // @ts-ignore
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, app.listen(3000)];
            case 3:
                _a.sent();
                // Print fastify routes
                console.log(app.printRoutes());
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                app.log.error(err_1);
                process.exit(1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Run the server!
main()["catch"](function (err) {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map
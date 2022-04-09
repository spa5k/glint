"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var vitest_1 = require("vitest");
(0, vitest_1.describe)("menuSearch", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        (0, vitest_1.it)("should return a list of results", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("http://localhost:3000/top?max=1000&min=1&limit=5")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        (0, vitest_1.expect)(json.top.length).toEqual(5);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)("should not return a list of results", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("http://localhost:3000/top")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        (0, vitest_1.expect)(json).toEqual({
                            error: "Bad Request",
                            message: "Missing query parameters, please send max and min as params"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=topDishes.test.js.map
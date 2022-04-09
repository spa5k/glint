"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var vitest_1 = require("vitest");
var sql_1 = tslib_1.__importDefault(require("../src/config/sql"));
(0, vitest_1.describe)("menuSearch", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        (0, vitest_1.it)("should return a list of results", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var user, response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["SELECT * FROM users ORDER BY RANDOM() LIMIT 1"], ["SELECT * FROM users ORDER BY RANDOM() LIMIT 1"])))];
                    case 1:
                        user = (_a.sent())[0];
                        return [4 /*yield*/, (0, node_fetch_1["default"])("http://localhost:3000/user?userId=".concat(user.id))];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        (0, vitest_1.expect)(json.user.id).toEqual(user.id);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)("should not return a user", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("http://localhost:3000/user")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        (0, vitest_1.expect)(json).toEqual({
                            error: "No such user",
                            message: "No user id provided"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)("should not return a user when wrong id is send", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("http://localhost:3000/user?userId=1")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        (0, vitest_1.expect)(json).toEqual({
                            error: "Internal Server Error",
                            message: "Something went wrong"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
var templateObject_1;
//# sourceMappingURL=userController.test.js.map
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var vitest_1 = require("vitest");
var sql_1 = tslib_1.__importDefault(require("../src/config/sql"));
(0, vitest_1.describe)("menuSearch", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        (0, vitest_1.it)("should return a list of results", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var user, menu, response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["SELECT * FROM users ORDER BY balance ASC LIMIT 1"], ["SELECT * FROM users ORDER BY balance ASC LIMIT 1"])))];
                    case 1:
                        user = (_a.sent())[0];
                        return [4 /*yield*/, (0, sql_1["default"])(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["SELECT * FROM menu ORDER BY price DESC LIMIT 1"], ["SELECT * FROM menu ORDER BY price DESC LIMIT 1"])))];
                    case 2:
                        menu = (_a.sent())[0];
                        return [4 /*yield*/, (0, node_fetch_1["default"])("http://localhost:3000/buy?userId=".concat(user.id, "&menuId=").concat(menu.id), { method: "POST" })];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        json = _a.sent();
                        (0, vitest_1.expect)(json).toEqual({
                            error: "Bad Request",
                            message: "Insufficient balance"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)("test balance change of user", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var user, menu, response, json, usersBalance, menuPrice, finalPrice, roundedFinalPrice, roundedUserBalance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sql_1["default"])(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["SELECT * FROM users ORDER BY balance DESC LIMIT 1"], ["SELECT * FROM users ORDER BY balance DESC LIMIT 1"])))];
                    case 1:
                        user = (_a.sent())[0];
                        return [4 /*yield*/, (0, sql_1["default"])(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["SELECT * FROM menu ORDER BY price ASC LIMIT 1"], ["SELECT * FROM menu ORDER BY price ASC LIMIT 1"])))];
                    case 2:
                        menu = (_a.sent())[0];
                        return [4 /*yield*/, (0, node_fetch_1["default"])("http://localhost:3000/buy?userId=".concat(user.id, "&menuId=").concat(menu.id), { method: "POST" })];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        json = _a.sent();
                        usersBalance = parseFloat(user.balance);
                        menuPrice = parseFloat(menu.price);
                        finalPrice = usersBalance - menuPrice;
                        roundedFinalPrice = Math.round(finalPrice * 100) / 100;
                        roundedUserBalance = 
                        // @ts-ignore
                        Math.round(parseFloat(json.user.balance) * 100) / 100;
                        // @ts-ignore
                        (0, vitest_1.expect)(roundedUserBalance).toEqual(parseFloat(roundedFinalPrice));
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=transactionController.test.js.map
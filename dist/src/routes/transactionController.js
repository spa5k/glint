"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var sql_1 = tslib_1.__importDefault(require("../config/sql"));
function transactionController(fastify) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            /*
            └── / (GET)
              ├── buy (GET)
                  └── / (GET)
            */
            fastify.post(":userId:menuId", function (request, reply) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, menuId, userId, userBalance, price, balance, data, err_1, updatedUserData, user, err_2;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, menuId = _a.menuId, userId = _a.userId;
                            // Extract hour, mins, am pm from date
                            if (!menuId || !userId) {
                                reply.code(400).send({
                                    error: "Bad Request",
                                    message: "Missing query parameters, please send menuId and userId as params"
                                });
                                return [2 /*return*/];
                            }
                            userBalance = 0;
                            price = 0;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["SELECT * FROM users WHERE id = ", ""], ["SELECT * FROM users WHERE id = ", ""])), userId)];
                        case 2:
                            balance = (_b.sent())[0];
                            console.log("before", balance);
                            userBalance = parseFloat(balance.balance);
                            return [4 /*yield*/, (0, sql_1["default"])(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["select get_menu_price(", ") as price;"], ["select get_menu_price(", ") as price;"])), menuId)];
                        case 3:
                            data = (_b.sent())[0];
                            price = parseFloat(data.price);
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _b.sent();
                            console.log(err_1);
                            return [2 /*return*/, reply.code(500).send({
                                    error: "Internal Server Error",
                                    message: "Something went wrong"
                                })];
                        case 5:
                            // Get price of menu
                            if (price > userBalance) {
                                return [2 /*return*/, reply.code(400).send({
                                        error: "Bad Request",
                                        message: "Insufficient balance"
                                    })];
                            }
                            _b.label = 6;
                        case 6:
                            _b.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, sql_1["default"].begin(function (sql) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var history, user, userData;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, sql(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n          insert into history (menu_id, user_id, amount) \n          values (", ", ", ", (select get_menu_price(", "))) \n          returning *;"], ["\n          insert into history (menu_id, user_id, amount) \n          values (", ", ", ", (select get_menu_price(", "))) \n          returning *;"])), menuId, userId, menuId)];
                                            case 1:
                                                history = (_a.sent())[0];
                                                if (!history.id) return [3 /*break*/, 3];
                                                return [4 /*yield*/, sql(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n          update users set balance = balance - (select amount from history where id=", ")\n          where id=", " returning *;"], ["\n          update users set balance = balance - (select amount from history where id=", ")\n          where id=", " returning *;"])), history.id, userId)];
                                            case 2:
                                                userData = (_a.sent())[0];
                                                user = userData;
                                                _a.label = 3;
                                            case 3: return [2 /*return*/, [user]];
                                        }
                                    });
                                }); })];
                        case 7:
                            user = (_b.sent())[0];
                            updatedUserData = user;
                            console.log("after", user);
                            return [3 /*break*/, 9];
                        case 8:
                            err_2 = _b.sent();
                            console.error(err_2);
                            return [2 /*return*/, reply.code(500).send({
                                    error: "Internal Server Error",
                                    message: "Something went wrong"
                                })];
                        case 9: return [2 /*return*/, reply.send({
                                user: updatedUserData
                            })];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports["default"] = transactionController;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=transactionController.js.map
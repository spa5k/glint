"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var sql_1 = tslib_1.__importDefault(require("../config/sql"));
function userController(fastify) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            /*
              └── / (GET)
                  ├── user (GET)
                  │   └── / (GET)
            */
            fastify.get(":userId", function (request, reply) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var userId, user, data, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(request.query);
                            userId = request.query.userId;
                            // if no user id
                            if (!userId) {
                                return [2 /*return*/, reply.code(400).send({
                                        error: "No such user",
                                        message: "No user id provided"
                                    })];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        select * from users where id=", ""], ["\n        select * from users where id=", ""])), userId)];
                        case 2:
                            data = (_a.sent())[0];
                            user = data;
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            console.error(err_1);
                            return [2 /*return*/, reply.code(500).send({
                                    error: "Internal Server Error",
                                    message: "Something went wrong"
                                })];
                        case 4:
                            // If no user,
                            if (!user) {
                                return [2 /*return*/, reply.code(404).send({
                                        error: "Not Found",
                                        message: "User not found"
                                    })];
                            }
                            return [2 /*return*/, reply.send({
                                    user: user
                                })];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports["default"] = userController;
var templateObject_1;
//# sourceMappingURL=userController.js.map
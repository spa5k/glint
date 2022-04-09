"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var sql_1 = tslib_1.__importDefault(require("../config/sql"));
function topDisherController(fastify) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            /*
            └── / (GET)
                └── top (GET)
                    └── / (GET)
            */
            fastify.get(":max:min:limit", function (request, reply) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, max, min, limit, currLimit, data, err_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, max = _a.max, min = _a.min, limit = _a.limit;
                            // Extract hour, mins, am pm from date
                            if (!max || !min) {
                                reply.code(400).send({
                                    error: "Bad Request",
                                    message: "Missing query parameters, please send max and min as params"
                                });
                                return [2 /*return*/];
                            }
                            currLimit = limit !== null && limit !== void 0 ? limit : 5;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  \n        select rs.name, rs.id from restaurant rs \n        left join menu m on m.restaurant_id=rs.id \n        where m.price between ", " and ", " \n        group by rs.name, rs.id having count(m.name)>5 \n        order by rs.name limit ", ";\n      "], ["\n  \n        select rs.name, rs.id from restaurant rs \n        left join menu m on m.restaurant_id=rs.id \n        where m.price between ", " and ", " \n        group by rs.name, rs.id having count(m.name)>5 \n        order by rs.name limit ", ";\n      "])), min, max, currLimit)];
                        case 2:
                            data = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _b.sent();
                            console.log(err_1);
                            return [2 /*return*/, reply.code(500).send({
                                    error: "Internal Server Error",
                                    message: "Something went wrong"
                                })];
                        case 4:
                            if (data.length === 0) {
                                return [2 /*return*/, reply.code(404).send({
                                        error: "Not Found",
                                        message: "No data found"
                                    })];
                            }
                            return [2 /*return*/, reply.send({
                                    top: data
                                })];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports["default"] = topDisherController;
var templateObject_1;
//# sourceMappingURL=topDishesController.js.map
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var sql_1 = tslib_1.__importDefault(require("../config/sql"));
// interface IQuerystring {
//   date: Date;
// }
function indexController(fastify) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            // GET /
            fastify.get("/", function (_request, reply) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var hour, min, amPm, time, dayInNumber, restaurant, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            hour = (0, dayjs_1["default"])().hour();
                            min = (0, dayjs_1["default"])().minute();
                            amPm = hour >= 12 ? "pm" : "am";
                            time = "".concat(hour > 12 ? hour % 12 : hour, ":").concat(min).concat(amPm);
                            dayInNumber = (0, dayjs_1["default"])().day();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        select r.name, r.id, o.day, o.hours from restaurant r join opening_hours o on r.id=o.restaurant_id where day=", " and hours @> ", "::time"], ["\n        select r.name, r.id, o.day, o.hours from restaurant r join opening_hours o on r.id=o.restaurant_id where day=", " and hours @> ", "::time"])), dayInNumber + 1, time)];
                        case 2:
                            restaurant = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            console.error(err_1);
                            return [2 /*return*/, reply.code(500).send({
                                    error: "Internal Server Error",
                                    message: "Something went wrong"
                                })];
                        case 4:
                            if (!restaurant) {
                                return [2 /*return*/, reply.code(404).send({
                                        error: "Not Found",
                                        message: "No restaurant found"
                                    })];
                            }
                            return [2 /*return*/, reply.send({
                                    restaurant: restaurant
                                })];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports["default"] = indexController;
var templateObject_1;
//# sourceMappingURL=indexController.js.map
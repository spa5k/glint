"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var sql_1 = tslib_1.__importDefault(require("../config/sql"));
function searchRestaurantController(fastify) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            /*
              └── / (GET)
                  └── search (GET)
                      └── / (GET)
                          ├── restaurant (GET)
                              └── / (GET)
            */
            fastify.get(":name", function (request, reply) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var name, data, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = request.query.name;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      select r.name as \"restaurantName\", r.id as \"restaurantId\" from menu m join restaurant r on r.id=m.restaurant_id where r.document @@ websearch_to_tsquery(", ") group by r.name,r.id;\n      "], ["\n      select r.name as \"restaurantName\", r.id as \"restaurantId\" from menu m join restaurant r on r.id=m.restaurant_id where r.document @@ websearch_to_tsquery(", ") group by r.name,r.id;\n      "])), name)];
                        case 2:
                            data = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            console.error(err_1);
                            return [2 /*return*/, reply.code(500).send({
                                    error: "Internal Server Error",
                                    message: "Something went wrong"
                                })];
                        case 4:
                            // If no data is found, return 404
                            if (data.length === 0) {
                                return [2 /*return*/, reply.code(404).send({
                                        error: "Not Found",
                                        message: "No data found"
                                    })];
                            }
                            return [2 /*return*/, reply.send({
                                    result: data
                                })];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports["default"] = searchRestaurantController;
var templateObject_1;
//# sourceMappingURL=searchRestaurant.js.map
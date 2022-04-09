"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var combinedSearchController_1 = tslib_1.__importDefault(require("./routes/combinedSearchController"));
var dateController_1 = tslib_1.__importDefault(require("./routes/dateController"));
var indexController_1 = tslib_1.__importDefault(require("./routes/indexController"));
var searchMenu_1 = tslib_1.__importDefault(require("./routes/searchMenu"));
var searchRestaurant_1 = tslib_1.__importDefault(require("./routes/searchRestaurant"));
var topDishesController_1 = tslib_1.__importDefault(require("./routes/topDishesController"));
var transactionController_1 = tslib_1.__importDefault(require("./routes/transactionController"));
var userController_1 = tslib_1.__importDefault(require("./routes/userController"));
function router(fastify) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            fastify.register(userController_1["default"], { prefix: "/user" });
            fastify.register(indexController_1["default"], { prefix: "/" });
            fastify.register(dateController_1["default"], { prefix: "/date" });
            fastify.register(combinedSearchController_1["default"], {
                prefix: "/search"
            });
            fastify.register(searchMenu_1["default"], { prefix: "/search/menu" });
            fastify.register(searchRestaurant_1["default"], {
                prefix: "/search/restaurant"
            });
            fastify.register(transactionController_1["default"], {
                prefix: "/buy"
            });
            fastify.register(topDishesController_1["default"], {
                prefix: "/top"
            });
            return [2 /*return*/];
        });
    });
}
exports["default"] = router;
//# sourceMappingURL=router.js.map
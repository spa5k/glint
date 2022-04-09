"use strict";
exports.__esModule = true;
exports.insertMenu = void 0;
var tslib_1 = require("tslib");
var sql_1 = tslib_1.__importDefault(require("../config/sql"));
var insertMenu = function (restaurantId, menus) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var menuPromise, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuPromise = [];
                menus.map(function (menu) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var dishName, randomPrice, roundedPrice, promise;
                    return tslib_1.__generator(this, function (_a) {
                        dishName = menu.dishName;
                        randomPrice = Math.random() * 1000;
                        roundedPrice = Math.round(randomPrice * 100) / 100;
                        promise = (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["INSERT INTO menu (name, price, restaurant_id) VALUES (", ", ", ", ", ")"], ["INSERT INTO menu (name, price, restaurant_id) VALUES (", ", ", ", ", ")"])), dishName, roundedPrice, restaurantId);
                        menuPromise.push(promise);
                        return [2 /*return*/];
                    });
                }); });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all(menuPromise)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error("menu promise", err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.insertMenu = insertMenu;
var templateObject_1;
//# sourceMappingURL=insertMenu.js.map
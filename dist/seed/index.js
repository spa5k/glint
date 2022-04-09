"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// We will first seed restaurant data
require("dotenv/config");
var sql_1 = __importDefault(require("../src/config/sql"));
var insertMenu_1 = require("../src/functions/insertMenu");
var insertOpeningHours_1 = require("../src/functions/insertOpeningHours");
var restaurant_with_menu_json_1 = __importDefault(require("./restaurant_with_menu.json"));
var users_with_purchase_history_json_1 = __importDefault(require("./users_with_purchase_history.json"));
var restaurantAndMenuSeeding = function () { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantIdArr, resPromiseArr, _i, RestaurantData1_1, restaurant, cashBalance, restaurantName, res_1, res, index, promises, element, restaurantId, menu, promise, _a, promises_1, promise, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                restaurantIdArr = [];
                resPromiseArr = [];
                for (_i = 0, RestaurantData1_1 = restaurant_with_menu_json_1["default"]; _i < RestaurantData1_1.length; _i++) {
                    restaurant = RestaurantData1_1[_i];
                    cashBalance = restaurant.cashBalance, restaurantName = restaurant.restaurantName;
                    try {
                        res_1 = (0, sql_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        INSERT INTO restaurant (name, balance) VALUES (", ", ", ") RETURNING id"], ["\n        INSERT INTO restaurant (name, balance) VALUES (", ", ", ") RETURNING id"])), restaurantName, cashBalance);
                        resPromiseArr.push(res_1);
                    }
                    catch (err) {
                        console.error("restaurant", err);
                        continue;
                    }
                }
                return [4 /*yield*/, Promise.all(resPromiseArr)];
            case 1:
                res = _c.sent();
                res.map(function (rest) {
                    restaurantIdArr.push(rest[0].id);
                });
                if (!(restaurantIdArr.length === restaurant_with_menu_json_1["default"].length)) return [3 /*break*/, 11];
                index = 0;
                _c.label = 2;
            case 2:
                if (!(index < restaurant_with_menu_json_1["default"].length)) return [3 /*break*/, 11];
                promises = [];
                element = restaurant_with_menu_json_1["default"][index];
                restaurantId = restaurantIdArr[index];
                menu = element.menu;
                try {
                    promise = (0, insertOpeningHours_1.insertOpeningHours)(restaurantId);
                    promises.push(promise);
                }
                catch (err) {
                    return [3 /*break*/, 10];
                }
                _a = 0, promises_1 = promises;
                _c.label = 3;
            case 3:
                if (!(_a < promises_1.length)) return [3 /*break*/, 6];
                promise = promises_1[_a];
                return [4 /*yield*/, Promise.all(promise)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                _a++;
                return [3 /*break*/, 3];
            case 6:
                _c.trys.push([6, 9, , 10]);
                return [4 /*yield*/, Promise.all(promises)];
            case 7:
                _c.sent();
                return [4 /*yield*/, (0, insertMenu_1.insertMenu)(restaurantId, menu)];
            case 8:
                _c.sent();
                return [3 /*break*/, 10];
            case 9:
                _b = _c.sent();
                return [3 /*break*/, 10];
            case 10:
                index++;
                return [3 /*break*/, 2];
            case 11: return [2 /*return*/];
        }
    });
}); };
var userAndHistorySeeding = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _loop_1, _i, UserData_1, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _loop_1 = function (user) {
                    var cashBalance, name_1, purchaseHistory, createdUser, userId;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                cashBalance = user.cashBalance, name_1 = user.name, purchaseHistory = user.purchaseHistory;
                                return [4 /*yield*/, (0, sql_1["default"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      INSERT INTO users (name, balance) VALUES (", ", ", ") RETURNING id"], ["\n      INSERT INTO users (name, balance) VALUES (", ", ", ") RETURNING id"])), name_1, cashBalance)];
                            case 1:
                                createdUser = _b.sent();
                                userId = createdUser[0].id;
                                // console.log(createdUser);
                                // Map over purchaseHistory.
                                // Get restaurant name, dishname
                                // Get price
                                purchaseHistory.map(function (purchase) { return __awaiter(void 0, void 0, void 0, function () {
                                    var dishName, restaurantName, transactionDate, res, _a, menuId, price, timestampzDate;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                dishName = purchase.dishName, restaurantName = purchase.restaurantName, transactionDate = purchase.transactionDate;
                                                return [4 /*yield*/, (0, sql_1["default"])(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        select menu.id as \"menuId\",price from menu JOIN restaurant ON menu.restaurant_id=restaurant.id where menu.name = ", " and restaurant.name = ", ""], ["\n        select menu.id as \"menuId\",price from menu JOIN restaurant ON menu.restaurant_id=restaurant.id where menu.name = ", " and restaurant.name = ", ""])), dishName, restaurantName)];
                                            case 1:
                                                res = _b.sent();
                                                _a = res[0], menuId = _a.menuId, price = _a.price;
                                                timestampzDate = new Date(transactionDate).toISOString();
                                                return [4 /*yield*/, (0, sql_1["default"])(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        INSERT INTO history (user_id, menu_id,  amount, created_at) VALUES (", ", ", ", ", ", ", ") returning id"], ["\n        INSERT INTO history (user_id, menu_id,  amount, created_at) VALUES (", ", ", ", ", ", ", ") returning id"])), userId, menuId, price, timestampzDate)];
                                            case 2:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, UserData_1 = users_with_purchase_history_json_1["default"];
                _a.label = 1;
            case 1:
                if (!(_i < UserData_1.length)) return [3 /*break*/, 4];
                user = UserData_1[_i];
                return [5 /*yield**/, _loop_1(user)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, restaurantAndMenuSeeding()];
            case 1:
                _a.sent();
                return [4 /*yield*/, userAndHistorySeeding()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main()["catch"](console.error)["finally"](function () {
    console.log("🚀 Seeding Done");
    process.exit(0);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map
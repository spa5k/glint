"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.insertOpeningHours = void 0;
var sql_1 = __importDefault(require("../config/sql"));
var dayToDayString_1 = require("../utils/dayToDayString");
var extractDay_1 = require("../utils/extractDay");
var insertOpeningHours = function (restaurantId) {
    var promiseArr = [];
    // get a random number between 1-7
    var randomDay = Math.floor(Math.random() * 7) + 1;
    var daysDone = [];
    for (var index = 0; index < randomDay; index++) {
        var _a = (0, extractDay_1.extractDay)(), closingHour = _a.closingHour, days = _a.days, openingHour = _a.openingHour;
        var dayNumber = (0, dayToDayString_1.dayToDayNumber)(days);
        if (daysDone.includes(dayNumber)) {
            continue;
        }
        daysDone.push(dayNumber);
        try {
            var promise = (0, sql_1["default"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          insert into opening_hours(restaurant_id, day, hours)\n          values (", ", ", ", ", ") returning id"], ["\n          insert into opening_hours(restaurant_id, day, hours)\n          values (", ", ", ", ", ") returning id"])), restaurantId, dayNumber + 1, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["timerange(", ", ", ")"], ["timerange(", ", ", ")"])), openingHour, closingHour));
            promiseArr.push(promise);
        }
        catch (error) {
            console.error("error", error);
        }
    }
    return promiseArr;
};
exports.insertOpeningHours = insertOpeningHours;
var templateObject_1, templateObject_2;
//# sourceMappingURL=insertOpeningHours.js.map
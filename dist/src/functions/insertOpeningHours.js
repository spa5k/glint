"use strict";
exports.__esModule = true;
exports.insertOpeningHours = void 0;
var tslib_1 = require("tslib");
var sql_1 = tslib_1.__importDefault(require("../config/sql"));
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
            var promise = (0, sql_1["default"])(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n          insert into opening_hours(restaurant_id, day, hours)\n          values (", ", ", ", ", ") returning id"], ["\n          insert into opening_hours(restaurant_id, day, hours)\n          values (", ", ", ", ", ") returning id"])), restaurantId, dayNumber + 1, (0, sql_1["default"])(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["timerange(", ", ", ")"], ["timerange(", ", ", ")"])), openingHour, closingHour));
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
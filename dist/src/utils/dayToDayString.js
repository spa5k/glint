"use strict";
exports.__esModule = true;
exports.dayToDayNumber = exports.dayToDayString = void 0;
// ["SUN","MON","TUES","WEDS","THURS","FRI","SAT"]
// Use the above array to return day of the week as a string
var dayToDayString = function (day) {
    var days = ["SUN", "MON", "TUES", "WEDS", "THURS", "FRI", "SAT"];
    return days[day];
};
exports.dayToDayString = dayToDayString;
// reverse of the function above
var dayToDayNumber = function (day) {
    var days = ["SUN", "MON", "TUES", "WEDS", "THURS", "FRI", "SAT"];
    return days.indexOf(day);
};
exports.dayToDayNumber = dayToDayNumber;
//# sourceMappingURL=dayToDayString.js.map
"use strict";
exports.__esModule = true;
exports.extractDay = void 0;
// Mon, Fri, Sun, Thurs, Weds, Tues
// If these letters are present in input, remove them from the string, then return the string, and the removed wordds in array
var extractDay = function () {
    var days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
    var collectedDays = [];
    var randomDay = days[Math.floor(Math.random() * days.length)];
    collectedDays.push(randomDay.toUpperCase());
    var randomOpeningHour = "".concat(Math.floor(Math.random() * 12), ":").concat(Math.floor(Math.random() * 60));
    var hoursOpen = randomOpeningHour.split(":")[0];
    var minutesOpen = randomOpeningHour.split(":")[1];
    if (hoursOpen.length === 1) {
        hoursOpen = "0".concat(hoursOpen);
    }
    if (minutesOpen.length < 2) {
        minutesOpen = "0".concat(minutesOpen);
    }
    // Join back
    randomOpeningHour = "".concat(hoursOpen, ":").concat(minutesOpen, "am");
    // Random closing hour, will always be after random opening hour
    var randomClosingHour = "".concat(Math.floor(Math.random() * 12), ":").concat(Math.floor(Math.random() * 60));
    var hoursClose = randomClosingHour.split(":")[0];
    var minutesClose = randomClosingHour.split(":")[1];
    if (hoursClose.length < 2) {
        hoursClose = "0".concat(hoursClose);
    }
    if (minutesClose.length < 2) {
        minutesClose = "0".concat(minutesClose);
    }
    // Join back
    randomClosingHour = "".concat(hoursClose, ":").concat(minutesClose, "pm");
    return {
        openingHour: randomOpeningHour,
        closingHour: randomClosingHour,
        days: randomDay.toUpperCase()
    };
};
exports.extractDay = extractDay;
//# sourceMappingURL=extractDay.js.map
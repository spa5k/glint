"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var postgres_1 = tslib_1.__importDefault(require("postgres"));
var sql = (0, postgres_1["default"])(process.env.DATABASE_URL);
exports["default"] = sql;
//# sourceMappingURL=sql.js.map
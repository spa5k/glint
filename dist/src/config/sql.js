"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var postgres_1 = __importDefault(require("postgres"));
var sql = (0, postgres_1["default"])(process.env.DATABASE_URL);
exports["default"] = sql;
//# sourceMappingURL=sql.js.map
"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
// Front
var reducer_1 = require("./reducer");
var rootReducer = redux_1.combineReducers({
    User: reducer_1["default"]
});
exports["default"] = rootReducer;

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var ContextProvider_1 = require("./contexts/ContextProvider");
var react_redux_1 = require("react-redux");
var slices_1 = require("./slices");
var toolkit_1 = require("@reduxjs/toolkit");
var store = toolkit_1.configureStore({ reducer: slices_1["default"], devTools: true });
var container = document.getElementById('root');
var root = client_1.createRoot(container);
root.render(react_1["default"].createElement(react_1["default"].Fragment, null,
    react_1["default"].createElement(react_redux_1.Provider, { store: store },
        react_1["default"].createElement(ContextProvider_1.ContextProvider, null,
            react_1["default"].createElement(App_1["default"], null)))));

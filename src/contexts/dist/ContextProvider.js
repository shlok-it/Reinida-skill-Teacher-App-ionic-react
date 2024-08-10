"use strict";
exports.__esModule = true;
exports.useStateContext = exports.ContextProvider = void 0;
var react_1 = require("react");
var react_2 = require("react");
var react_3 = require("react");
var StateContext = react_3.createContext({
    currentUser: {},
    state_list: [],
    district_list: [],
    block_list: [],
    toast: {
        message: null,
        show: false
    },
    setCurrentUser: function () { },
    setStateList: function () { },
    setDistrictList: function () { },
    setBlockList: function () { },
    showToast: function () { }
});
exports.ContextProvider = function (_a) {
    var children = _a.children;
    var _b = react_2.useState({}), currentUser = _b[0], setCurrentUser = _b[1];
    var _c = react_2.useState([]), state_list = _c[0], setStateList = _c[1];
    var _d = react_2.useState([]), district_list = _d[0], setDistrictList = _d[1];
    var _e = react_2.useState([]), block_list = _e[0], setBlockList = _e[1];
    var _f = react_2.useState({ message: '', show: false }), toast = _f[0], setToast = _f[1];
    var showToast = function (message) {
        setToast({ message: message, show: true });
        setTimeout(function () {
            setToast({ message: '', show: false });
        }, 5000);
    };
    return (React.createElement(StateContext.Provider, { value: {
            currentUser: currentUser,
            state_list: state_list,
            district_list: district_list,
            block_list: block_list,
            setCurrentUser: setCurrentUser,
            setStateList: setStateList,
            setDistrictList: setDistrictList,
            setBlockList: setBlockList,
            toast: toast,
            showToast: showToast
        } }, children));
};
exports.useStateContext = function () { return react_1.useContext(StateContext); };

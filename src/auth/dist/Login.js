"use strict";
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
exports.__esModule = true;
var react_1 = require("@ionic/react");
var react_secure_storage_1 = require("react-secure-storage");
var taxi_logo_png_1 = require("../assets/img/taxi-logo.png");
var CustomField_1 = require("../components/CustomField");
var fields_1 = require("../data/fields");
var Action_1 = require("../components/Action");
var Wave_1 = require("../components/Wave");
var react_2 = require("react");
var utils_1 = require("../data/utils");
var react_router_1 = require("react-router");
var api_1 = require("../connect/api");
var react_router_dom_1 = require("react-router-dom");
var Login = function () {
    var presentAlert = react_1.useIonAlert()[0];
    var params = react_router_1.useParams();
    var history = react_router_dom_1.useHistory();
    var fields = fields_1.useLoginFields();
    var _a = react_2.useState(false), errors = _a[0], setErrors = _a[1];
    var check_session = function () {
        var authenticated = react_secure_storage_1["default"].getItem("app_authenticated");
        if (authenticated) {
            var get_profile = react_secure_storage_1["default"].getItem("app_access_token");
            if (get_profile) {
                api_1.call_secure_api('login/session')
                    .then(function (resolve) {
                    if (resolve.status === true) {
                        history.push("/dashboard");
                    }
                    else {
                        presentAlert({ message: resolve.message, buttons: ['OK'] });
                    }
                }, function (reject) {
                });
            }
        }
    };
    var login = function () {
        var errors = utils_1.validateForm(fields);
        setErrors(errors);
        if (!errors.length) {
            var options = utils_1.getValues(fields);
            api_1.call_api('login/authenticate', options)
                .then(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(resolve.status === true)) return [3 /*break*/, 2];
                            react_secure_storage_1["default"].setItem("app_authenticated", true);
                            react_secure_storage_1["default"].setItem("app_access_token", resolve.data['accessToken']);
                            return [4 /*yield*/, presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] })];
                        case 1:
                            _a.sent();
                            setTimeout(function () {
                                //history.push("/dashboard");
                                window.location.reload();
                            }, 1500);
                            return [3 /*break*/, 3];
                        case 2:
                            presentAlert({ header: 'Alert!', message: resolve.message, buttons: ['OK'] });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }, function (reject) {
                console.log(reject);
                presentAlert({ header: 'Alert!', message: "Server Error", buttons: ['OK'] });
            });
        }
    };
    react_2.useEffect(function () {
        return function () {
            fields.forEach(function (field) { return field.input.state.reset(""); });
            setErrors(false);
        };
    }, [params]);
    react_2.useEffect(function () {
        check_session();
    }, []);
    return (React.createElement(react_1.IonPage, null,
        React.createElement(react_1.IonContent, { fullscreen: true },
            React.createElement("div", { className: "login-signup-header" },
                React.createElement(react_1.IonRow, null,
                    React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                        React.createElement(react_1.IonImg, { src: taxi_logo_png_1["default"], style: { height: '80px' } })))),
            React.createElement("div", { className: "ion-auth-container login-signup-form" },
                React.createElement(react_1.IonCard, { className: "ion-padding" },
                    React.createElement(react_1.IonRow, null,
                        React.createElement(react_1.IonCol, { size: "12", className: "ion-text-center" },
                            React.createElement(react_1.IonCardTitle, null, "Welcome Back"),
                            React.createElement("h5", null, "Enter your mobile number and password to login"))),
                    React.createElement(react_1.IonRow, null,
                        React.createElement(react_1.IonCol, { size: "12" },
                            fields.map(function (field, index) {
                                return React.createElement(CustomField_1["default"], { key: index, field: field, errors: errors });
                            }),
                            React.createElement(react_1.IonButton, { className: "custom-button", expand: "block", onClick: login }, "Login")))),
                React.createElement(react_1.IonRow, null,
                    React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                        React.createElement(react_1.IonLabel, { className: 'fs-12' },
                            "By continuing,you agree to our ",
                            React.createElement(react_1.IonRouterLink, { routerLink: "/temrs-condition" },
                                React.createElement("span", { className: 'text-primary' }, "Terms of Use")),
                            " and ",
                            React.createElement(react_1.IonRouterLink, { routerLink: "/privacy-policy" },
                                React.createElement("span", { className: 'text-primary' }, "Privacy Policy"))))))),
        React.createElement(react_1.IonFooter, null,
            React.createElement(react_1.IonGrid, { className: "ion-no-margin ion-no-padding" },
                React.createElement(Action_1.Action, { message: "Don't have an account?", text: "Sign up", link: "/signup" }),
                React.createElement(Wave_1.Wave, null)))));
};
exports["default"] = Login;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var icons_1 = require("ionicons/icons");
var react_2 = require("react");
var api_js_1 = require("../../connect/api.js");
var ContextProvider_js_1 = require("../../contexts/ContextProvider.js");
var react_router_dom_1 = require("react-router-dom");
var camera_1 = require("@capacitor/camera");
var general_js_1 = require("../../helper/general.js");
var filesystem_1 = require("@capacitor/filesystem");
var thunk_js_1 = require("../../slices/thunk.js");
var react_redux_1 = require("react-redux");
var KycDocumentDetail = function (_a) {
    var currentUser = _a.currentUser, nextTab = _a.nextTab, disableBack = _a.disableBack, onUpdate = _a.onUpdate;
    var _b = react_2.useState({}), errors = _b[0], setErrors = _b[1];
    var _c = react_1.useIonLoading(), present = _c[0], dismiss = _c[1];
    var setCurrentUser = ContextProvider_js_1.useStateContext().setCurrentUser;
    var presentAlert = react_1.useIonAlert()[0];
    var dispatch = react_redux_1.useDispatch();
    var presentAction = react_1.useIonActionSheet()[0];
    var history = react_router_dom_1.useHistory();
    var _d = react_2.useState(currentUser), values = _d[0], setValues = _d[1];
    var updateInputValue = function (event) {
        setValues(function (oldValues) {
            var _a;
            return (__assign(__assign({}, oldValues), (_a = {}, _a[event.target.name] = event.target.value, _a)));
        });
    };
    react_2.useEffect(function () {
        setValues(function (oldValues) { return (__assign(__assign({}, oldValues), { profile_image: values.profile_image ? (values.profile_base_url + values.profile_image) : '' })); });
        setValues(function (oldValues) { return (__assign(__assign({}, oldValues), { driving_license: values.driving_license ? (values.profile_base_url + values.driving_license) : '' })); });
    }, []);
    react_2.useEffect(function () {
        setErrors([]);
    }, [values]);
    var createAccount = function () {
        present({
            message: 'Please Wait...'
        });
        api_js_1.call_secure_api('update/kyc-document', values)
            .then(function (resolve) {
            var _a;
            dismiss();
            if (resolve.status === true) {
                //presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] });
                dispatch(thunk_js_1.getUserProfile(setCurrentUser));
                history.replace("/dashboard");
            }
            else {
                presentAlert({ header: 'Alert!', message: resolve.message, buttons: ['OK'] });
                setErrors(((_a = resolve.data) === null || _a === void 0 ? void 0 : _a.errors) || {});
            }
        }, function (reject) {
            console.log(reject);
            presentAlert({ header: 'Alert!', message: "Server Error", buttons: ['OK'] });
            dismiss();
        });
    };
    var compareWith = function (o1, o2) {
        return o1 == o2;
    };
    var pick_image = function (document_type) {
        presentAction({
            header: 'Choose Image From',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        openCamera(document_type);
                    }
                },
                {
                    text: 'Gallery',
                    icon: 'images',
                    handler: function () {
                        openGallery(document_type);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () { }
                },
            ]
        });
    };
    var openCamera = function (document_type) { return __awaiter(void 0, void 0, void 0, function () {
        var image, imageUrl, newPic_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, camera_1.Camera.getPhoto({
                        quality: 100,
                        allowEditing: false,
                        saveToGallery: false,
                        source: camera_1.CameraSource.Camera,
                        resultType: camera_1.CameraResultType.Base64
                    })];
                case 1:
                    image = _a.sent();
                    imageUrl = image.base64String;
                    if (imageUrl) {
                        newPic_1 = 'data:image/' + image.format + ';base64,' + imageUrl;
                        setValues(function (oldValues) {
                            var _a;
                            return (__assign(__assign({}, oldValues), (_a = {}, _a[document_type] = newPic_1, _a)));
                        });
                    }
                    else {
                        setValues(function (oldValues) {
                            var _a;
                            return (__assign(__assign({}, oldValues), (_a = {}, _a[document_type] = '', _a)));
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var openGallery = function (document_type) { return __awaiter(void 0, void 0, void 0, function () {
        var imageUrl, base64Data, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, camera_1.Camera.pickImages({
                        quality: 100
                    })];
                case 1:
                    imageUrl = _a.sent();
                    if (!(imageUrl && imageUrl.photos)) return [3 /*break*/, 6];
                    if (!react_1.isPlatform('hybrid')) return [3 /*break*/, 3];
                    return [4 /*yield*/, filesystem_1.Filesystem.readFile({
                            path: imageUrl.photos[0].path
                        })];
                case 2:
                    file = _a.sent();
                    base64Data =
                        'data:image/' + imageUrl.photos[0].format + ';base64,' + file.data;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, general_js_1.base64FromPath(imageUrl.photos[0].webPath)];
                case 4:
                    base64Data = _a.sent();
                    _a.label = 5;
                case 5:
                    setValues(function (oldValues) {
                        var _a;
                        return (__assign(__assign({}, oldValues), (_a = {}, _a[document_type] = base64Data, _a)));
                    });
                    return [3 /*break*/, 7];
                case 6:
                    setValues(function (oldValues) {
                        var _a;
                        return (__assign(__assign({}, oldValues), (_a = {}, _a[document_type] = '', _a)));
                    });
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "login-signup-form ion-padding-top" },
        React.createElement(react_1.IonLabel, { className: 'fw-bolder text-dark' }, "Document Detail"),
        React.createElement(react_1.IonRow, { className: "" },
            React.createElement(react_1.IonCol, { size: '12' },
                errors && (errors === null || errors === void 0 ? void 0 : errors.vehicle_type) && React.createElement("p", { className: "error" }, errors.vehicle_type[0]),
                React.createElement(react_1.IonSelect, { label: "Vehile Type", compareWith: compareWith, labelPlacement: "fixed", value: values.vehicle_type, placeholder: "Select vehile Type", name: 'vehicle_type', onIonChange: updateInputValue },
                    React.createElement(react_1.IonSelectOption, { value: "Truck" }, "Truck"),
                    React.createElement(react_1.IonSelectOption, { value: "Bus" }, "Bus"),
                    React.createElement(react_1.IonSelectOption, { value: "Auto" }, "Auto"),
                    React.createElement(react_1.IonSelectOption, { value: "Taxi" }, "Taxi"),
                    React.createElement(react_1.IonSelectOption, { value: "Other" }, "Other")))),
        React.createElement(react_1.IonRow, { className: "" },
            React.createElement(react_1.IonCol, { size: '12' },
                errors && (errors === null || errors === void 0 ? void 0 : errors.driving_license_number) && React.createElement("p", { className: "error" }, errors.driving_license_number[0]),
                React.createElement(react_1.IonInput, { labelPlacement: "stacked", type: 'text', value: values.driving_license_number, placeholder: "Driving License Number", name: 'driving_license_number', onIonInput: updateInputValue },
                    React.createElement(react_1.IonIcon, { slot: "start", icon: icons_1.cardOutline, "aria-hidden": "true" })))),
        React.createElement(react_1.IonRow, { className: "" },
            React.createElement(react_1.IonCol, { size: '12' },
                React.createElement(react_1.IonLabel, { className: 'fw-bolder text-dark' }, "Passport Size Photo"),
                errors && (errors === null || errors === void 0 ? void 0 : errors.profile_image) && React.createElement("p", { className: "error" }, errors.profile_image[0]),
                React.createElement("div", { className: "dropzone", onClick: function () { return pick_image('profile_image'); } },
                    !(values === null || values === void 0 ? void 0 : values.profile_image) && React.createElement(React.Fragment, null,
                        React.createElement(react_1.IonIcon, { icon: icons_1.imageOutline }),
                        React.createElement(react_1.IonLabel, null, "Upload Passport Size Photo")),
                    (values === null || values === void 0 ? void 0 : values.profile_image) && React.createElement(React.Fragment, null,
                        React.createElement(react_1.IonImg, { src: values === null || values === void 0 ? void 0 : values.profile_image }))))),
        React.createElement(react_1.IonRow, { className: "" },
            React.createElement(react_1.IonCol, { size: '12' },
                React.createElement(react_1.IonLabel, { className: 'fw-bolder text-dark' }, "Driving License"),
                errors && (errors === null || errors === void 0 ? void 0 : errors.driving_license) && React.createElement("p", { className: "error" }, errors.driving_license[0]),
                React.createElement("div", { className: "dropzone", onClick: function () { return pick_image('driving_license'); } },
                    !(values === null || values === void 0 ? void 0 : values.driving_license) && React.createElement(React.Fragment, null,
                        React.createElement(react_1.IonIcon, { icon: icons_1.imageOutline }),
                        React.createElement(react_1.IonLabel, null, "Upload Driving License")),
                    (values === null || values === void 0 ? void 0 : values.driving_license) && React.createElement(React.Fragment, null,
                        React.createElement(react_1.IonImg, { src: values === null || values === void 0 ? void 0 : values.driving_license }))))),
        !disableBack && React.createElement(react_1.IonRow, null,
            React.createElement(react_1.IonCol, { className: 'ion-text-center', size: '6' },
                React.createElement(react_1.IonButton, { className: "custom-button", expand: "block", onClick: function () { return nextTab(2); } }, "Back")),
            React.createElement(react_1.IonCol, { className: 'ion-text-center', size: '6' },
                React.createElement(react_1.IonButton, { className: "custom-button", expand: "block", onClick: createAccount }, "Submit"))),
        disableBack && (currentUser.kyc_status == 2 || currentUser.kyc_status == 1) && React.createElement(react_1.IonRow, null,
            React.createElement(react_1.IonCol, { className: 'ion-text-center', size: '12' },
                React.createElement(react_1.IonButton, { className: "custom-button", expand: "block", onClick: createAccount }, "Submit")))));
};
exports["default"] = KycDocumentDetail;

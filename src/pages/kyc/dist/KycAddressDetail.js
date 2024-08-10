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
exports.__esModule = true;
var react_1 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
var react_2 = require("react");
var api_js_1 = require("../../connect/api.js");
var ContextProvider_js_1 = require("../../contexts/ContextProvider.js");
var KycAddressDetail = function (_a) {
    var currentUser = _a.currentUser, nextTab = _a.nextTab;
    var _b = react_2.useState({}), errors = _b[0], setErrors = _b[1];
    var _c = react_1.useIonLoading(), present = _c[0], dismiss = _c[1];
    var _d = ContextProvider_js_1.useStateContext(), district_list = _d.district_list, block_list = _d.block_list, state_list = _d.state_list;
    var presentAlert = react_1.useIonAlert()[0];
    var _e = react_2.useState(currentUser), values = _e[0], setValues = _e[1];
    var updateInputValue = function (event) {
        setValues(function (oldValues) {
            var _a;
            return (__assign(__assign({}, oldValues), (_a = {}, _a[event.target.name] = event.target.value, _a)));
        });
    };
    react_2.useEffect(function () {
        setErrors([]);
    }, [values]);
    var createAccount = function () {
        present({
            message: 'Please Wait...'
        });
        api_js_1.call_secure_api('update/kyc-address', values)
            .then(function (resolve) {
            var _a;
            dismiss();
            if (resolve.status === true) {
                //presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] });
                nextTab(3);
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
    return (React.createElement("div", { className: "login-signup-form ion-padding-top" },
        React.createElement(react_1.IonLabel, { className: 'fw-bolder text-dark' }, "Address Detail"),
        React.createElement(react_1.IonRow, { className: "" },
            React.createElement(react_1.IonCol, { size: '12' },
                errors && (errors === null || errors === void 0 ? void 0 : errors.state_code) && React.createElement("p", { className: "error" }, errors.state_code[0]),
                React.createElement(react_1.IonSelect, { label: "State", compareWith: compareWith, labelPlacement: "fixed", placeholder: "Select State", value: values.state_code, name: 'state_code', onIonChange: updateInputValue }, state_list.map(function (item, index) {
                    return (React.createElement(react_1.IonSelectOption, { key: index, value: item.state_code }, item.name));
                })),
                errors && (errors === null || errors === void 0 ? void 0 : errors.district_id) && React.createElement("p", { className: "error" }, errors.district_id[0]),
                React.createElement(react_1.IonSelect, { label: "District", compareWith: compareWith, labelPlacement: "fixed", placeholder: "Select District", value: values.district_id, name: 'district_id', onIonChange: updateInputValue }, district_list.map(function (item, index) {
                    if (item.state_code == values.state_code) {
                        return (React.createElement(react_1.IonSelectOption, { key: index, value: item.id }, item.name));
                    }
                })),
                errors && (errors === null || errors === void 0 ? void 0 : errors.block_id) && React.createElement("p", { className: "error" }, errors.block_id[0]),
                React.createElement(react_1.IonSelect, { label: "Block", compareWith: compareWith, labelPlacement: "fixed", placeholder: "Select Block", value: values.block_id, name: 'block_id', onIonChange: updateInputValue }, block_list.map(function (item, index) {
                    if (item.district_id == values.district_id) {
                        return (React.createElement(react_1.IonSelectOption, { key: index, value: item.id }, item.name));
                    }
                })),
                errors && (errors === null || errors === void 0 ? void 0 : errors.pincode) && React.createElement("p", { className: "error" }, errors.pincode[0]),
                React.createElement(react_1.IonInput, { labelPlacement: "stacked", type: 'tel', value: values.pincode, maxlength: 6, min: 0, placeholder: "Your pincode", name: 'pincode', onIonInput: updateInputValue },
                    React.createElement(react_1.IonIcon, { slot: "start", icon: icons_1.locationOutline, "aria-hidden": "true" })),
                errors && (errors === null || errors === void 0 ? void 0 : errors.address) && React.createElement("p", { className: "error" }, errors.address[0]),
                React.createElement(react_1.IonTextarea, { labelPlacement: "stacked", value: values.address || '', placeholder: "Full adrress", name: 'address', onIonInput: updateInputValue },
                    React.createElement(react_1.IonIcon, { slot: "start", icon: icons_1.locationOutline, "aria-hidden": "true" })))),
        React.createElement(react_1.IonRow, null,
            React.createElement(react_1.IonCol, { className: 'ion-text-center', size: '6' },
                React.createElement(react_1.IonButton, { className: "custom-button", expand: "block", onClick: function () { return nextTab(1); } }, "Back")),
            React.createElement(react_1.IonCol, { className: 'ion-text-center', size: '6' },
                React.createElement(react_1.IonButton, { className: "custom-button", expand: "block", onClick: createAccount }, "Next")))));
};
exports["default"] = KycAddressDetail;

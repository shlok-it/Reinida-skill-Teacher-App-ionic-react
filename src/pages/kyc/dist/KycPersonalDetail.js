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
var KycPersonalDetail = function (_a) {
    var currentUser = _a.currentUser, nextTab = _a.nextTab;
    var _b = react_2.useState({}), errors = _b[0], setErrors = _b[1];
    var _c = react_1.useIonLoading(), present = _c[0], dismiss = _c[1];
    var presentAlert = react_1.useIonAlert()[0];
    var _d = react_2.useState(currentUser), values = _d[0], setValues = _d[1];
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
        api_js_1.call_secure_api('update/kyc-detail', values)
            .then(function (resolve) {
            var _a;
            dismiss();
            if (resolve.status === true) {
                //presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] });
                nextTab(2);
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
    return (React.createElement("div", { className: "login-signup-form ion-padding-top" },
        React.createElement(react_1.IonLabel, { className: 'fw-bolder text-dark pb-3' }, "Personal Detail"),
        React.createElement(react_1.IonRow, { className: "" },
            React.createElement(react_1.IonCol, { size: "12" },
                errors && (errors === null || errors === void 0 ? void 0 : errors.full_name) && React.createElement("p", { className: "error" }, errors.full_name[0]),
                React.createElement(react_1.IonInput, { labelPlacement: "stacked", type: 'text', value: values.full_name, placeholder: "Your name", name: 'full_name', onIonInput: updateInputValue },
                    React.createElement(react_1.IonIcon, { slot: "start", icon: icons_1.personOutline, "aria-hidden": "true" })),
                errors && (errors === null || errors === void 0 ? void 0 : errors.mobile) && React.createElement("p", { className: "error" }, errors.mobile[0]),
                React.createElement(react_1.IonInput, { labelPlacement: "stacked", type: 'tel', readonly: true, disabled: true, value: values.mobile, maxlength: 10, min: 0, placeholder: "Your mobile number", name: 'mobile', onIonInput: updateInputValue },
                    React.createElement(react_1.IonIcon, { slot: "start", icon: icons_1.callOutline, "aria-hidden": "true" })),
                errors && (errors === null || errors === void 0 ? void 0 : errors.email) && React.createElement("p", { className: "error" }, errors.email[0]),
                React.createElement(react_1.IonInput, { labelPlacement: "stacked", type: 'email', value: values.email, placeholder: "Your email id", name: 'email', onIonInput: updateInputValue },
                    React.createElement(react_1.IonIcon, { slot: "start", icon: icons_1.mailOutline, "aria-hidden": "true" })),
                errors && (errors === null || errors === void 0 ? void 0 : errors.dob) && React.createElement("p", { className: "error" }, errors.dob[0]),
                React.createElement(react_1.IonInput, { labelPlacement: "stacked", type: 'date', value: values.dob, placeholder: "Your date of birth", name: 'dob', onIonInput: updateInputValue },
                    React.createElement(react_1.IonIcon, { slot: "start", icon: icons_1.calendarClearOutline, "aria-hidden": "true" })),
                errors && (errors === null || errors === void 0 ? void 0 : errors.gender) && React.createElement("p", { className: "error" }, errors.gender[0]),
                React.createElement(react_1.IonSelect, { label: "Gender", labelPlacement: "fixed", value: values.gender, placeholder: "Select gender", name: 'gender', onIonChange: updateInputValue },
                    React.createElement(react_1.IonSelectOption, { value: "Male" }, "Male"),
                    React.createElement(react_1.IonSelectOption, { value: "Female" }, "Female"),
                    React.createElement(react_1.IonSelectOption, { value: "Other" }, "Other")),
                errors && (errors === null || errors === void 0 ? void 0 : errors.blood_group) && React.createElement("p", { className: "error" }, errors.blood_group[0]),
                React.createElement(react_1.IonSelect, { label: "Blood group", labelPlacement: "fixed", value: values.blood_group, placeholder: "Select blood group", name: 'blood_group', onIonChange: updateInputValue },
                    React.createElement(react_1.IonSelectOption, { value: "O+" }, "O+"),
                    React.createElement(react_1.IonSelectOption, { value: "O-" }, "O-"),
                    React.createElement(react_1.IonSelectOption, { value: "A+" }, "A+"),
                    React.createElement(react_1.IonSelectOption, { value: "A-" }, "A-"),
                    React.createElement(react_1.IonSelectOption, { value: "B+" }, "B+"),
                    React.createElement(react_1.IonSelectOption, { value: "B-" }, "B-"),
                    React.createElement(react_1.IonSelectOption, { value: "AB+" }, "AB+"),
                    React.createElement(react_1.IonSelectOption, { value: "AB-" }, "AB-")),
                errors && (errors === null || errors === void 0 ? void 0 : errors.merital_status) && React.createElement("p", { className: "error" }, errors.merital_status[0]),
                React.createElement(react_1.IonSelect, { label: "Merital Status", labelPlacement: "fixed", value: values.merital_status, placeholder: "Select merital status", name: 'merital_status', onIonChange: updateInputValue },
                    React.createElement(react_1.IonSelectOption, { value: "UnMarried" }, "UnMarried"),
                    React.createElement(react_1.IonSelectOption, { value: "Widow / Widower" }, "Widow / Widower"),
                    React.createElement(react_1.IonSelectOption, { value: "Divorced" }, "Divorced"),
                    React.createElement(react_1.IonSelectOption, { value: "Separated" }, "Separated")),
                React.createElement(react_1.IonButton, { className: "custom-button", expand: "block", onClick: createAccount }, "Next")))));
};
exports["default"] = KycPersonalDetail;

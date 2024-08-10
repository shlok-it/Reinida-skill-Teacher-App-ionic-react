"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
var react_router_dom_1 = require("react-router-dom");
var ContextProvider_1 = require("../../contexts/ContextProvider");
var react_2 = require("react");
var api_1 = require("../../connect/api");
var react_toastify_1 = require("react-toastify");
var react_redux_1 = require("react-redux");
var thunk_1 = require("../../slices/thunk");
var PaymentForm = function () {
    var history = react_router_dom_1.useHistory();
    var setCurrentUser = ContextProvider_1.useStateContext().setCurrentUser;
    var dispatch = react_redux_1.useDispatch();
    var _a = react_2.useState(null), reg_package = _a[0], SetRegPackage = _a[1];
    var _b = react_2.useState(null), renew_package = _b[0], SetRenewPackage = _b[1];
    var _c = react_2.useState(''), payment_mode = _c[0], SetPaymentMode = _c[1];
    var presentAlert = react_1.useIonAlert()[0];
    react_2.useEffect(function () {
        get_package_detail();
    }, []);
    var submit_registration = function () {
        if (payment_mode == '') {
            react_toastify_1.toast.error('Select payment mode');
        }
        else {
            api_1.call_secure_api('save-registration', { payment_mode: payment_mode, reg_package: reg_package === null || reg_package === void 0 ? void 0 : reg_package.id })
                .then(function (resolve) {
                if (resolve.status === true) {
                    presentAlert({
                        message: resolve.message,
                        buttons: ['OK']
                    });
                    dispatch(thunk_1.getUserProfile(setCurrentUser));
                    history.goBack();
                }
                else {
                    react_toastify_1.toast.error(resolve.message);
                }
            }, function (reject) {
                react_toastify_1.toast.error('Error ! please try again later');
            });
        }
    };
    var get_package_detail = function () {
        api_1.call_secure_api('reg-plan')
            .then(function (resolve) {
            if (resolve.status === true) {
                SetRegPackage(resolve.data.reg_package || {});
                SetRenewPackage(resolve.data.renew_package || {});
            }
            else {
                SetRegPackage({});
                SetRenewPackage({});
            }
        }, function (reject) {
        });
    };
    return (React.createElement(react_1.IonPage, null,
        React.createElement(react_1.IonContent, { fullscreen: true },
            React.createElement("div", { className: "page-header" },
                React.createElement(react_1.IonRow, { className: 'ion-align-items-center', style: { paddingTop: '18px' } },
                    React.createElement(react_1.IonCol, { size: '4', className: 'ion-text-left text-white fw-bold ps-3', onClick: function () { return history.goBack(); } },
                        React.createElement(react_1.IonIcon, { className: 'custom-back me-2', icon: icons_1.arrowBack })),
                    React.createElement(react_1.IonCol, { size: '8', className: 'ion-text-left text-white' },
                        React.createElement(react_1.IonLabel, null, "Payment Mode")))),
            React.createElement("div", { className: "ion-page-container" },
                React.createElement(react_1.IonCard, { className: 'ion-padding account-menu' },
                    React.createElement(react_1.IonCardContent, null,
                        React.createElement(react_1.IonLabel, { className: 'fw-bolder text-dark ion-text-center' }, "Payment Detail"),
                        React.createElement(react_1.IonRow, { className: "ion-justify-content-center" },
                            React.createElement(react_1.IonCol, { size: "5", className: "" },
                                React.createElement(react_1.IonLabel, { className: 'fw-bold' }, "Reg. Amount")),
                            React.createElement(react_1.IonCol, { size: "7", className: "ion-text-right" }, reg_package && React.createElement(react_1.IonLabel, null,
                                "Rs.",
                                reg_package.amount)),
                            React.createElement(react_1.IonCol, { size: "5", className: "" },
                                React.createElement(react_1.IonLabel, { className: 'fw-bold' }, "Validity")),
                            React.createElement(react_1.IonCol, { size: "7", className: "ion-text-right" }, reg_package && React.createElement(react_1.IonLabel, null,
                                reg_package.validity_ext != 'LifeTime' ? reg_package.validity : '',
                                reg_package.validity_ext)),
                            React.createElement(react_1.IonCol, { size: "5", className: "" },
                                React.createElement(react_1.IonLabel, { className: 'fw-bold' }, "Renewal Charge")),
                            React.createElement(react_1.IonCol, { size: "7", className: "ion-text-right" }, renew_package && React.createElement(react_1.IonLabel, null,
                                "Rs.",
                                renew_package.amount || '0',
                                " ",
                                renew_package.amount && React.createElement(react_1.IonText, null,
                                    "(",
                                    renew_package.validity_ext != 'LifeTime' ? renew_package.validity : '',
                                    renew_package.validity_ext || '---',
                                    ")")))),
                        React.createElement(react_1.IonRow, null,
                            React.createElement(react_1.IonCol, { size: "12", className: "ion-text-center" },
                                React.createElement(react_1.IonLabel, { color: 'dark' }, "Select Payment Method"))),
                        React.createElement(react_1.IonRow, null,
                            React.createElement(react_1.IonCol, { size: "6", className: "ion-text-center" },
                                React.createElement(react_1.IonButton, { fill: payment_mode == 'online' ? "solid" : "outline", onClick: function () { return SetPaymentMode('online'); }, color: 'success', shape: "round", size: "small" }, "Online")),
                            React.createElement(react_1.IonCol, { size: "6", className: "ion-text-center" },
                                React.createElement(react_1.IonButton, { fill: payment_mode == 'offline' ? "solid" : "outline", onClick: function () { return SetPaymentMode('offline'); }, color: 'danger', shape: "round", size: "small" }, "Offline"))),
                        React.createElement(react_1.IonRow, { className: "mt-5" },
                            React.createElement(react_1.IonCol, { size: "12", className: "ion-text-center" },
                                React.createElement(react_1.IonButton, { fill: "solid", color: 'tertiary', onClick: function () { return submit_registration(); } }, "Submit")))))))));
};
exports["default"] = PaymentForm;

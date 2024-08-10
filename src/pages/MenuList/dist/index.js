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
var icons_1 = require("ionicons/icons");
var ContextProvider_1 = require("../../contexts/ContextProvider");
var react_2 = require("react");
var moment_1 = require("moment");
var api_1 = require("../../connect/api");
var react_toastify_1 = require("react-toastify");
var general_1 = require("../../helper/general");
var Dashboard = function () {
    var _a, _b;
    var currentUser = ContextProvider_1.useStateContext().currentUser;
    var _c = react_1.useIonLoading(), present = _c[0], dismiss = _c[1];
    var _d = react_2.useState({}), order_detail = _d[0], SetOrderDetail = _d[1];
    var presentAlert = react_1.useIonAlert()[0];
    react_2.useEffect(function () {
        dismiss();
        if (currentUser.kyc_status == 3) {
            get_order_detail();
        }
        else if (currentUser.kyc_status == 4) {
            get_transaction_detail();
        }
    }, [currentUser]);
    var payWithRazorpay = function (detail) {
        var options = {
            description: detail.description,
            image: detail.image,
            currency: 'INR',
            key: detail.keyId,
            order_id: detail.order_id,
            amount: detail.amount,
            name: currentUser.full_name,
            prefill: {
                email: currentUser.email,
                contact: currentUser.mobile,
                name: currentUser.full_name
            },
            theme: {
                color: detail.theme
            },
            modal: {
                ondismiss: function () {
                    console.log('dismissed');
                }
            }
        };
        var successCallback = function (success) {
            //console.log(success)
            var orderId = success.razorpay_order_id;
            var signature = success.razorpay_signature;
            var razorpay_payment_id = success.razorpay_payment_id;
            //this.PaySuccessPayment(orderId, signature, razorpay_payment_id, detail.payment_mode);
        };
        var cancelCallback = function (error) {
            console.log(error.description + ' (Error ' + error.code + ')');
        };
        RazorpayCheckout.on('payment.success', successCallback);
        RazorpayCheckout.on('payment.cancel', cancelCallback);
        RazorpayCheckout.open(options);
    };
    var get_order_detail = function () {
        api_1.call_secure_api('reg-pending-order')
            .then(function (resolve) {
            if (resolve.status === true) {
                SetOrderDetail(resolve.data.order_detail || {});
            }
            else {
                SetOrderDetail({});
            }
        }, function (reject) {
        });
    };
    var get_transaction_detail = function () {
        api_1.call_secure_api('reg-transaction-detail')
            .then(function (resolve) {
            if (resolve.status === true) {
                SetOrderDetail(resolve.data.txn_detail || {});
            }
            else {
                SetOrderDetail({});
            }
        }, function (reject) {
        });
    };
    var generate_payment = function () {
        /* PaySuccessPayment({
           razorpay_order_id: "order_NtjEqsK7Mer1mM",
           razorpay_payment_id: "pay_NtjFUVca3mu4uX",
           razorpay_signature: "f45d43e5fbb263acf6b9a09519f187bf2a59bc5e7fe8a8d729e8cdb5ff813c12"
       });
       return; */
        api_1.call_secure_api('generate-payment')
            .then(function (resolve) {
            if (resolve.status === true) {
                make_payment(resolve.data);
            }
            else {
                react_toastify_1.toast.error(resolve.message);
            }
        }, function (reject) {
            react_toastify_1.toast.error('Error ! please try again later');
        });
    };
    var PaySuccessPayment = function (data) {
        api_1.call_secure_api('verify-payment-response', data)
            .then(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(resolve.status === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] })];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            window.location.reload();
                        }, 1500);
                        return [3 /*break*/, 3];
                    case 2:
                        react_toastify_1.toast.error(resolve.message);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); }, function (reject) {
            react_toastify_1.toast.error('Error ! please try again later');
        });
    };
    var make_payment = function (payment) {
        var options = {
            "key": payment.keyId,
            "amount": payment.amount,
            "currency": "INR",
            "name": currentUser.full_name,
            "description": "Product order",
            "image": payment.image,
            "order_id": payment.order_id,
            "handler": function (response) {
                PaySuccessPayment(response);
            },
            "modal": {
                'confirm_close': true,
                'ondismiss': function (response) {
                    console.log("ondismiss", response);
                }
            },
            "prefill": {
                "name": currentUser.full_name,
                "email": currentUser.email,
                "contact": currentUser.mobile
            },
            "notes": {
                "address": currentUser.address
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            console.log("payment.failed", response);
        });
        rzp1.open();
    };
    return (React.createElement(react_1.IonPage, { className: '' },
        React.createElement(react_1.IonContent, { fullscreen: true },
            React.createElement("div", { className: "dashboard-header" },
                React.createElement(react_1.IonRow, { className: 'ion-align-items-center', style: { paddingTop: '18px' } },
                    React.createElement(react_1.IonCol, { size: '3', className: 'ion-text-center' },
                        React.createElement(react_1.IonAvatar, null,
                            React.createElement(react_1.IonImg, { src: currentUser.profile_base_url + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.profile_image) }))),
                    React.createElement(react_1.IonCol, { size: '7' },
                        React.createElement(react_1.IonLabel, { style: { color: 'white', fontSize: '18px' } }, currentUser.full_name),
                        React.createElement("br", null),
                        React.createElement(react_1.IonLabel, { style: { color: 'white' } }, currentUser.reg_code)),
                    React.createElement(react_1.IonCol, { size: '2', className: 'ion-text-start' },
                        React.createElement(react_1.IonIcon, { icon: icons_1.notifications, className: 'home-header-icon' })))),
            React.createElement("div", { className: "ion-home-container" },
                currentUser.kyc_status == 0 && React.createElement(react_1.IonCard, { className: 'ion-padding' },
                    React.createElement(react_1.IonRow, null,
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonLabel, null, "Complete Kyc")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonButton, { routerLink: '/kyc-form' }, "Fill Kyc Form")))),
                currentUser.kyc_status == 2 && React.createElement(react_1.IonCard, { className: 'ion-padding' },
                    React.createElement(react_1.IonRow, null,
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonLabel, null, "Your Kyc is completed")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonButton, { routerLink: '/payment-form' }, "Please Make Payment")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonLabel, null, "Or")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonButton, { fill: "outline", routerLink: '/kyc-form' }, "Update kyc document")))),
                currentUser.kyc_status == 3 && order_detail && order_detail.payment_mode && React.createElement(react_1.IonCard, { className: 'ion-padding' },
                    order_detail.payment_mode == 'online' && React.createElement(react_1.IonRow, null,
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonLabel, null, "Your payment is pending please make payment")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonButton, { onClick: function () { return generate_payment(); } }, "Pay Now")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonLabel, null, "Or")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonButton, { fill: 'outline', routerLink: '/payment-form', size: 'small', color: 'medium' }, "Change Payment Mode"))),
                    order_detail.payment_mode == 'offline' && React.createElement(react_1.IonRow, null,
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonLabel, { color: 'dark' }, "Your payment mode is offline")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonText, null, "Please visit the city office for verification")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonLabel, null, "Or")),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonButton, { fill: 'outline', routerLink: '/payment-form', size: 'small', color: 'medium' }, "Change Payment Mode")))),
                currentUser.kyc_status == 4 && order_detail && order_detail.transaction && React.createElement(react_1.IonCard, { className: 'ion-padding' },
                    React.createElement(react_1.IonRow, null,
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonLabel, { color: 'dark' }, "Your online payment is successfull")),
                        React.createElement(react_1.IonCol, { size: '6', className: 'ion-text-left' },
                            React.createElement(react_1.IonText, { className: 'fw-bolder' }, "Txn Date")),
                        React.createElement(react_1.IonCol, { size: '6', className: 'ion-text-left' },
                            React.createElement(react_1.IonText, { className: 'fs-12' }, general_1.formatDateTime((_a = order_detail.transaction) === null || _a === void 0 ? void 0 : _a.payment_at))),
                        React.createElement(react_1.IonCol, { size: '6', className: 'ion-text-left' },
                            React.createElement(react_1.IonText, { className: 'fw-bolder' }, "Reference Id")),
                        React.createElement(react_1.IonCol, { size: '6', className: 'ion-text-left' },
                            React.createElement(react_1.IonText, { className: 'fs-12' }, ((_b = order_detail.transaction) === null || _b === void 0 ? void 0 : _b.merchantTransactionId) || '---')),
                        React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                            React.createElement(react_1.IonText, null, "Please visit the city office for verification")))),
                React.createElement(react_1.IonCard, { className: 'ion-padding' },
                    React.createElement(react_1.IonCardHeader, null,
                        React.createElement(react_1.IonRow, null,
                            React.createElement(react_1.IonCol, { size: "6", className: "ion-text-left" },
                                React.createElement(react_1.IonLabel, null,
                                    "Reg. Date: ",
                                    moment_1["default"](currentUser.created_at).format('DD/MM/YYYY'))),
                            React.createElement(react_1.IonCol, { size: "6", className: "ion-text-right" },
                                currentUser.status == 1 && React.createElement(react_1.IonLabel, { color: 'success' }, "Active"),
                                currentUser.status == 0 && React.createElement(react_1.IonLabel, { color: 'danger' }, "Kyc Pending"),
                                currentUser.status == 3 && React.createElement(react_1.IonLabel, { color: 'danger' }, "Not Verify"),
                                currentUser.status == 2 && React.createElement(react_1.IonLabel, { color: 'danger' }, "Payment Pending"),
                                currentUser.status == 4 && React.createElement(react_1.IonLabel, { color: 'danger' }, "Verification Pending"),
                                currentUser.status == 5 && React.createElement(react_1.IonLabel, { color: 'danger' }, "Expired")))),
                    React.createElement(react_1.IonCardContent, null,
                        React.createElement(react_1.IonRow, { className: "ion-justify-content-center" },
                            React.createElement(react_1.IonCol, { size: "6", className: "" },
                                React.createElement(react_1.IonLabel, null, "Name")),
                            React.createElement(react_1.IonCol, { size: "6", className: "" },
                                React.createElement(react_1.IonLabel, null, currentUser.full_name))),
                        React.createElement(react_1.IonRow, { className: "ion-justify-content-center" },
                            React.createElement(react_1.IonCol, { size: "6", className: "" },
                                React.createElement(react_1.IonLabel, null, "Reg. No.")),
                            React.createElement(react_1.IonCol, { size: "6", className: "" },
                                React.createElement(react_1.IonLabel, null, currentUser.reg_code))),
                        React.createElement(react_1.IonRow, { className: "ion-justify-content-center" },
                            React.createElement(react_1.IonCol, { size: "6", className: "" },
                                React.createElement(react_1.IonLabel, null, "Reg. Amount")),
                            React.createElement(react_1.IonCol, { size: "6", className: "" },
                                React.createElement(react_1.IonLabel, null,
                                    "Rs.",
                                    currentUser.reg_amount))),
                        React.createElement(react_1.IonRow, { className: "ion-justify-content-center" },
                            React.createElement(react_1.IonCol, { size: "6", className: "" },
                                React.createElement(react_1.IonLabel, null, "Renewal Date")),
                            React.createElement(react_1.IonCol, { size: "6", className: "" },
                                React.createElement(react_1.IonLabel, null, currentUser.renewal_date || '---'))))))),
        React.createElement(react_1.IonFooter, null,
            React.createElement(react_1.IonGrid, null,
                React.createElement(react_1.IonRow, { className: "ion-text-center ion-justify-content-center" },
                    React.createElement(react_1.IonCol, { size: "3", className: "" },
                        React.createElement(react_1.IonRouterLink, { routerLink: "/dashboard" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.homeOutline, style: { fontSize: '26px' } }),
                            React.createElement(react_1.IonLabel, null, "Home"))),
                    React.createElement(react_1.IonCol, { size: "3", className: "" },
                        React.createElement(react_1.IonRouterLink, { routerLink: "/report" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.cubeOutline, style: { fontSize: '26px' } }),
                            React.createElement(react_1.IonLabel, null, "Report"))),
                    React.createElement(react_1.IonCol, { size: "3", className: "" },
                        React.createElement(react_1.IonRouterLink, { routerLink: "/service" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.gridOutline, style: { fontSize: '26px' } }),
                            React.createElement(react_1.IonLabel, null, "Service"))),
                    React.createElement(react_1.IonCol, { size: "3", className: "" },
                        React.createElement(react_1.IonRouterLink, { routerLink: "/profile" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.personOutline, style: { fontSize: '26px' } }),
                            React.createElement(react_1.IonLabel, null, "Profile"))))))));
};
exports["default"] = Dashboard;

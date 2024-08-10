"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
var ContextProvider_1 = require("../../contexts/ContextProvider");
var react_2 = require("react");
var react_router_1 = require("react-router");
var react_secure_storage_1 = require("react-secure-storage");
var Profile = function () {
    var currentUser = ContextProvider_1.useStateContext().currentUser;
    var _a = react_1.useIonLoading(), present = _a[0], dismiss = _a[1];
    var history = react_router_1.useHistory();
    react_2.useEffect(function () {
        dismiss();
    }, []);
    var goBackPreveius = function () {
        history.goBack();
    };
    var userLogOut = function () {
        react_secure_storage_1["default"].removeItem("app_authenticated");
        react_secure_storage_1["default"].removeItem("app_access_token");
        history.replace('/login');
    };
    return (React.createElement(react_1.IonPage, { className: '' },
        React.createElement(react_1.IonContent, { fullscreen: true },
            React.createElement("div", { className: "account-page-header" },
                React.createElement(react_1.IonRow, { className: 'ion-align-items-center', style: { paddingTop: '18px' } },
                    React.createElement(react_1.IonCol, { size: '6', className: 'ion-text-left text-white fw-bold ps-3', onClick: function () { return goBackPreveius(); } },
                        React.createElement(react_1.IonIcon, { className: 'custom-back me-2', icon: icons_1.arrowBack }),
                        React.createElement(react_1.IonLabel, null, "Back")),
                    React.createElement(react_1.IonCol, { size: '6', className: 'ion-text-right pe-3' },
                        React.createElement(react_1.IonIcon, { icon: icons_1.notifications, className: 'home-header-icon' }))),
                React.createElement(react_1.IonRow, null,
                    React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                        React.createElement(react_1.IonAvatar, { className: 'd-inline-block' },
                            React.createElement(react_1.IonImg, { src: currentUser.profile_base_url + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.profile_image) }))),
                    React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                        React.createElement(react_1.IonLabel, { className: 'text-white' }, currentUser.full_name)),
                    React.createElement(react_1.IonCol, { size: '12', className: 'ion-text-center' },
                        React.createElement(react_1.IonLabel, { className: 'text-white' }, currentUser.reg_code)))),
            React.createElement("div", { className: "ion-account-container" },
                React.createElement(react_1.IonCard, { className: 'ion-padding account-menu' },
                    React.createElement(react_1.IonCardContent, null,
                        React.createElement(react_1.IonItem, { color: 'none', lines: 'none', routerLink: "/personal-information" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.person, slot: 'start' }),
                            React.createElement(react_1.IonLabel, null, "Personal Information"),
                            React.createElement(react_1.IonIcon, { icon: icons_1.chevronForward })),
                        React.createElement(react_1.IonItem, { color: 'none', lines: 'none', routerLink: "/document-detail" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.document, slot: 'start' }),
                            React.createElement(react_1.IonLabel, null, "Document Detail"),
                            React.createElement(react_1.IonIcon, { icon: icons_1.chevronForward })),
                        React.createElement(react_1.IonItem, { color: 'none', lines: 'none', routerLink: "/txn-history" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.pushOutline, slot: 'start' }),
                            React.createElement(react_1.IonLabel, null, "Txn History"),
                            React.createElement(react_1.IonIcon, { icon: icons_1.chevronForward })),
                        React.createElement(react_1.IonItem, { color: 'none', lines: 'none', routerLink: "/temrs-condition" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.readerOutline, slot: 'start' }),
                            React.createElement(react_1.IonLabel, null, "Terms & Conditions"),
                            React.createElement(react_1.IonIcon, { icon: icons_1.chevronForward })),
                        React.createElement(react_1.IonItem, { color: 'none', lines: 'none', routerLink: "/privacy-policy" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.readerOutline, slot: 'start' }),
                            React.createElement(react_1.IonLabel, null, "Privacy Policy"),
                            React.createElement(react_1.IonIcon, { icon: icons_1.chevronForward })),
                        React.createElement(react_1.IonItem, { color: 'none', lines: 'none', routerLink: "/change-password" },
                            React.createElement(react_1.IonIcon, { icon: icons_1.lockClosed, slot: 'start' }),
                            React.createElement(react_1.IonLabel, null, "Change Password"),
                            React.createElement(react_1.IonIcon, { icon: icons_1.chevronForward })),
                        React.createElement(react_1.IonItem, { color: 'none', lines: 'none' },
                            React.createElement(react_1.IonIcon, { icon: icons_1.settings, slot: 'start' }),
                            React.createElement(react_1.IonLabel, null, "Settings"),
                            React.createElement(react_1.IonIcon, { icon: icons_1.chevronForward })),
                        React.createElement(react_1.IonItem, { color: 'none', lines: 'none', onClick: function () { return userLogOut(); } },
                            React.createElement(react_1.IonIcon, { className: 'text-danger', icon: icons_1.logOut, slot: 'start' }),
                            React.createElement(react_1.IonLabel, { className: 'text-danger' }, "Logout"))))))));
};
exports["default"] = Profile;

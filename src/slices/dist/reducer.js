"use strict";
exports.__esModule = true;
exports.userIsUpdated = exports.initialState = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
//constants
exports.initialState = {
    userUpdated: false
};
var UserSlice = toolkit_1.createSlice({
    name: 'UserSlice',
    initialState: exports.initialState,
    reducers: {
        userIsUpdated: function (state, action) {
            state.userUpdated = action.payload.data;
        }
    }
});
exports.userIsUpdated = UserSlice.actions.userIsUpdated;
exports["default"] = UserSlice.reducer;

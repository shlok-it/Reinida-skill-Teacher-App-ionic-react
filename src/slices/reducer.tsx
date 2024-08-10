import { createSlice } from "@reduxjs/toolkit";
//constants


export const initialState = {
  userUpdated: false
};

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    userIsUpdated(state, action) {
      state.userUpdated = action.payload.data;
    }
  }
});

export const {
  userIsUpdated,
} = UserSlice.actions;

export default UserSlice.reducer;
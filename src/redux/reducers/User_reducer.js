import { createReducer } from '@reduxjs/toolkit';
import { authenticateUser } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userInfo: null,
  loading: false,
  error: null
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authenticateUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(authenticateUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin;
      state.userInfo = action.payload.userInfo;
      state.loading = false;
      state.error = null;
    })
    .addCase(authenticateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.userInfo = null;
      state.isAdmin = false;
      state.isLoggedIn = false;
    });
});

export default userReducer;

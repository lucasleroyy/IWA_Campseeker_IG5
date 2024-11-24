// userReducer.js
import { createReducer } from '@reduxjs/toolkit';
import { authenticateUser } from '../actions/authActions';
import { fetchUserById } from '../actions/userActions';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userInfo: null,
  userDetails: {},
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Authentification utilisateur
    .addCase(authenticateUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(authenticateUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo; // Stocke userId, token, email
      state.loading = false;
      state.error = null;
    })
    .addCase(authenticateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.userInfo = null;
      state.isLoggedIn = false;
    })
    .addCase('LOGOUT', (state) => {
      return {
        ...initialState,
        userDetails: {},
      };
    })
    // Récupération des détails d'un utilisateur
    .addCase(fetchUserById.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
      state.userDetails = {
        ...state.userDetails,
        [action.payload.userId]: action.payload, // Stocke les détails de l'utilisateur
      };
      state.loading = false;
    })
    .addCase(fetchUserById.rejected, (state, action) => {
      console.error('Error fetching user:', action.payload); // Log des erreurs
      state.loading = false;
    });
});

export default userReducer;

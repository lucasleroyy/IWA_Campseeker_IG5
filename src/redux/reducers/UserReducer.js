import { createReducer } from '@reduxjs/toolkit';
import { authenticateUser } from '../actions/authActions';
import { fetchUserById, updateUserProfile } from '../actions/userActions';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userInfo: null,
  userDetails: {},
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: false,
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
      state.error = action.payload;
    })
    // Mise à jour des informations utilisateur
    .addCase(updateUserProfile.pending, (state) => {
      state.updateLoading = true;
      state.updateError = null;
      state.updateSuccess = false;
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.userDetails = {
        ...state.userDetails,
        [action.payload.userId]: action.payload, // Met à jour les détails utilisateur
      };
      state.userInfo = {
        ...state.userInfo,
        ...action.payload, // Met à jour les informations globales
      };
      state.updateLoading = false;
      state.updateSuccess = true;
      state.updateError = null;
    })
    .addCase(updateUserProfile.rejected, (state, action) => {
      console.error('Error updating user:', action.payload); // Log des erreurs
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = action.payload;
    });
});

export default userReducer;

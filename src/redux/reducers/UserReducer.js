import { createReducer } from '@reduxjs/toolkit';
import { authenticateUser } from '../actions/authActions';
import { fetchUserById } from '../actions/userActions';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userInfo: null,
  userDetails: {}, // Nouveau champ pour stocker les informations des utilisateurs
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
      state.isAdmin = action.payload.xisAdmin;
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
    })
    .addCase('LOGOUT', (state) => {
      return initialState;
    })

    // Récupération des détails d'un utilisateur
    .addCase(fetchUserById.pending, (state, action) => {
      console.log("Fetching user:", action.meta.arg); // Log du userId en cours de chargement
      state.loading = true;
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
      console.log("Storing userDetails:", action.payload.userId, action.payload);
      state.userDetails = {
        ...state.userDetails,
        [action.payload.userId]: action.payload, // Utilise userId comme clé
      }
    })
       

    .addCase(fetchUserById.rejected, (state, action) => {
      console.error("Error fetching user:", action.payload); // Log des erreurs
      state.loading = false;
    });
});

export default userReducer;

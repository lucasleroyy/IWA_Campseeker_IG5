import { createReducer } from "@reduxjs/toolkit";
import { addFavorite, checkIfFavorite, removeFavorite } from "../actions/favorisActions";

const initialState = {
  favoris: [], // Liste des favoris
  loading: false,
  error: null,
};

const favorisReducer = createReducer(initialState, (builder) => {
  builder
    // Vérification si le lieu est favori
    .addCase(checkIfFavorite.pending, (state) => {
      state.loading = true;
    })
    .addCase(checkIfFavorite.fulfilled, (state, action) => {
      const { locationId, isFavorite } = action.payload;
      state.loading = false;

      // Ajoute uniquement si `isFavorite` est vrai et si ce `locationId` n'est pas déjà dans la liste
      if (isFavorite && !state.favoris.find((fav) => fav.locationId === locationId)) {
        state.favoris.push({ locationId });
      }
    })
    .addCase(checkIfFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Ajout aux favoris
    .addCase(addFavorite.pending, (state) => {
      state.loading = true;
    })
    .addCase(addFavorite.fulfilled, (state, action) => {
      state.loading = false;
      // Ajoute uniquement si le favori n'existe pas déjà
      if (!state.favoris.find((fav) => fav.locationId === action.payload.locationId)) {
        state.favoris.push(action.payload);
      }
    })
    .addCase(addFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Suppression des favoris
    .addCase(removeFavorite.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeFavorite.fulfilled, (state, action) => {
      state.loading = false;
      // Supprime le favori correspondant
      state.favoris = state.favoris.filter((fav) => fav.locationId !== action.payload.locationId);
    })
    .addCase(removeFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default favorisReducer;

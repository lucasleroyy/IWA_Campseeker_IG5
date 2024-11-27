import { createReducer } from "@reduxjs/toolkit";
import { searchLocationsByVille } from "../actions/searchActions";

const initialState = {
    locations: [],
    loading: false,
    error: null,
};

const searchReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(searchLocationsByVille.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(searchLocationsByVille.fulfilled, (state, action) => {
          state.loading = false;
          state.locations = action.payload; // Met à jour les lieux filtrés
      })
      .addCase(searchLocationsByVille.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; // Gère les erreurs
      });
});

export default searchReducer;
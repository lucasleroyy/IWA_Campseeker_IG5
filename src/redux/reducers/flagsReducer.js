import { createReducer } from '@reduxjs/toolkit';
import { reportFlag, fetchFlaggedLocations } from '../actions/flagsActions';

const initialState = {
  flags: [],
  flaggedLocations: [],
  loading: false,
  error: null,
};

const flagsReducer = createReducer(initialState, (builder) => {
  builder
    // Signalement de lieu
    .addCase(reportFlag.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(reportFlag.fulfilled, (state, action) => {
      state.loading = false;
      state.flags.push(action.payload); // Ajoute le nouveau flag à la liste
    })
    .addCase(reportFlag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Récupération des lieux signalés
    .addCase(fetchFlaggedLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFlaggedLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.flaggedLocations = action.payload; // Stocke les lieux signalés
    })
    .addCase(fetchFlaggedLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default flagsReducer;

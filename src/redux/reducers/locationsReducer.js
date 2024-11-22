import { createReducer } from '@reduxjs/toolkit';
import { fetchRecentLocations, fetchAllLocations } from '../actions/locationsActions';

const initialState = {
  locations: [],
  loading: false,
  error: null,
};

const locationsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchRecentLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRecentLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = action.payload; // Stocke les lieux récupérés
    })
    .addCase(fetchRecentLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Stocke l'erreur en cas de problème
    })

    
    .addCase(fetchAllLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = action.payload; // Stocke les lieux récupérés de fetchAllLocations
    })
    .addCase(fetchAllLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Stocke l'erreur en cas de problème de fetchAllLocations
    });
});



export default locationsReducer;

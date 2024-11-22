import { createReducer } from '@reduxjs/toolkit';
import { fetchRecentLocations, fetchAllLocations, fetchLocationById } from '../actions/locationsActions';


const initialState = {
  locations: [], // Liste des lieux récents
  locationDetails: null, // Détails d'un lieu spécifique
  loading: false,
  error: null,
};

const locationsReducer = createReducer(initialState, (builder) => {
  builder
    // Gestion des lieux récents
    .addCase(fetchRecentLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRecentLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = action.payload;
    })
    .addCase(fetchRecentLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Gestion des détails d'un lieu
    .addCase(fetchLocationById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.locationDetails = null; // Réinitialise les détails précédents
    })
    .addCase(fetchLocationById.fulfilled, (state, action) => {
      state.loading = false;
      state.locationDetails = action.payload;
    })
    .addCase(fetchLocationById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
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

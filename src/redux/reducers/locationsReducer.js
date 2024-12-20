import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRecentLocations,
  fetchAllLocations,
  fetchLocationById,
  deleteLocation,
  createLocation,
  linkEquipmentsToLocation,
  fetchLocationsByUserId,
  fetchLocationsByEquipments,
  updateLocation,
} from "../actions/locationsActions";

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
    })

    // Suppression d’un lieu
    .addCase(deleteLocation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteLocation.fulfilled, (state, action) => {
      state.loading = false;
      // Supprime le lieu de la liste par son ID
      state.locations = state.locations.filter(
        (location) => location.locationId !== action.payload
      );
    })
    .addCase(deleteLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Stocke l'erreur en cas d’échec
    })

    //créer un lieu
    .addCase(createLocation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.locations.push(action.payload); // Ajoute le nouveau lieu à la liste
    })
    .addCase(createLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Ajouter plusieurs équipements
    .addCase(linkEquipmentsToLocation.pending, (state) => {
      state.loading = true;
    })
    .addCase(linkEquipmentsToLocation.fulfilled, (state, action) => {
      state.loading = false;
      const { locationId, equipmentIds } = action.payload;
      const location = state.locations.find(
        (loc) => loc.locationId === locationId
      );
      if (location) {
        location.equipmentIds = equipmentIds; // Met à jour la liste d'équipements
      }
    })
    .addCase(linkEquipmentsToLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    // Fetch Locations by User ID
    .addCase(fetchLocationsByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchLocationsByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.userLocations = action.payload;
    })
    .addCase(fetchLocationsByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  builder
    // Ajout du traitement pour fetchLocationsByEquipment
    .addCase(fetchLocationsByEquipments.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchLocationsByEquipments.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = action.payload; // Met à jour les lieux avec ceux récupérés
    })
    .addCase(fetchLocationsByEquipments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Gestion de la mise à jour d'un lieu
    .addCase(updateLocation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateLocation.fulfilled, (state, action) => {
      state.loading = false;
      if (state.locationDetails?.locationId === action.payload.locationId) {
        state.locationDetails = action.payload; // Met à jour les détails du lieu
      }
    })
    .addCase(updateLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default locationsReducer;

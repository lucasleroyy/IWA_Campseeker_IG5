import { createAsyncThunk } from '@reduxjs/toolkit';

// Action pour signaler un lieu
export const reportFlag = createAsyncThunk(
  'flags/report',
  async ({ userId, locationId, reason }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // Récupère l'URL de l'API
    try {
      const response = await fetch(`${apiUrl}/flags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          locationId,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du flag.');
      }

      const data = await response.json();
      return data; // Retourne le flag créé
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Action pour récupérer les lieux signalés
export const fetchFlaggedLocations = createAsyncThunk(
  'flags/fetchFlaggedLocations',
  async (_, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; 
    try {
      const response = await fetch(`${apiUrl}/flags/locations`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des lieux signalés.');
      }

      const data = await response.json();

      // Vérifiez que chaque objet contient `flagId`
      return data.map((location) => ({
        ...location,
        flagId: location.flagId, // Assurez-vous que `flagId` est bien présent
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



// Action pour récupérer les flags de commentaires avec statut "pending"
export const fetchFlaggedComments = createAsyncThunk(
  'flags/fetchCommentFlags',
  async (_, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // Récupère l'URL de l'API
    try {
      const response = await fetch(`${apiUrl}/flags/comments`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commentaires signalés.');
      }

      const data = await response.json();
      return data.map((comment) => ({
        ...comment,
        flagId: comment.flagId, // Assurez-vous que `flagId` est bien présent
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateFlag = createAsyncThunk(
  "flags/updateFlag",
  async ({ flagId, status, reviewedBy }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // Récupère l'URL de l'API
    try {
      const response = await fetch(`${apiUrl}/flags/${flagId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          reviewedBy,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `Erreur lors de la mise à jour du flag : ${errorDetails.message || "inconnue"}`
        );
      }

      const data = await response.json();
      return data; // Retourne le flag mis à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du flag :", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


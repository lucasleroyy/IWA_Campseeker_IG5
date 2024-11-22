import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecentLocations = createAsyncThunk(
  'locations/fetchRecent',
  async (_, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/locations/recent`, {
        method: 'GET',
      });

      const data = await response.json();
      if (response.ok) {
        return data; // Retourne les lieux récupérés
      } else {
        return thunkAPI.rejectWithValue(data); // Retourne une erreur
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Gestion des erreurs réseau
    }
  }
);

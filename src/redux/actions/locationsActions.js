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


export const fetchAllLocations = createAsyncThunk(
  'locations/fetchAll',
  async (_, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/locations`);
      const data = await response.json();
      if (response.ok) {
        return data; // Retourne tous les lieux
      } else {
        return thunkAPI.rejectWithValue(data); // Retourne une erreur
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Gestion des erreurs réseau
    }
  }
);

export const fetchLocationById = createAsyncThunk(
  "locations/fetchById",
  async (id, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // Récupère l'URL de l'API
    try {
      const response = await fetch(`${apiUrl}/locations/${id}`, {
        method: "GET",
      });

      const data = await response.json();
      if (response.ok) {
        return data; // Retourne les détails du lieu
      } else {
        return thunkAPI.rejectWithValue(data); // Retourne une erreur
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Gestion des erreurs réseau
    }
  }
);


// Action pour supprimer un lieu par ID
export const deleteLocation = createAsyncThunk(
  'locations/delete',
  async (id, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // URL de l'API
    try {
      const response = await fetch(`${apiUrl}/locations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression du lieu.');
      }

      return id; // Retourne l'ID du lieu supprimé
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Retourne une erreur au reducer
    }
  }
);

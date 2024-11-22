import { createAsyncThunk } from '@reduxjs/toolkit';

// Action pour récupérer les équipements
export const fetchEquipments = createAsyncThunk(
  'equipments/fetchEquipments',
  async (_, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/equipments`);
      const data = await response.json();
      if (response.ok) {
        return data;  // Retourne les équipements récupérés
      } else {
        return thunkAPI.rejectWithValue(data);  // Retourne une erreur avec le message d'erreur
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);  // Gestion des erreurs réseau
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchLocationsByVille = createAsyncThunk(
  'locations/searchLocationsByVille',
  async (ville, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // Récupère l'URL API depuis le state
    try {
      const response = await fetch(`${apiUrl}/locations/ville/${ville}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la recherche des lieux.');
      }
      return await response.json(); // Retourne la liste des lieux
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Gère les erreurs
    }
  }
);

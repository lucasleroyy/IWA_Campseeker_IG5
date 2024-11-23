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

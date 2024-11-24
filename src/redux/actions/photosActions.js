import { createAsyncThunk } from '@reduxjs/toolkit';

export const addPhotoToLocation = createAsyncThunk(
    "photos/addPhoto",
    async ({ locationId, formData }, thunkAPI) => {
      const apiUrl = thunkAPI.getState().config.apiUrl;
      try {
        const response = await fetch(`${apiUrl}/photos/${locationId}`, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          return { locationId };
        } else {
          const data = await response.json();
          return thunkAPI.rejectWithValue(data.message || "Erreur lors de l'ajout de la photo.");
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
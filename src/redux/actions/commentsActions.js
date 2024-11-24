import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCommentsByLocationId = createAsyncThunk(
    "comments/fetchByLocationId",
    async (locationId, thunkAPI) => {
      const apiUrl = thunkAPI.getState().config.apiUrl;
  
      console.log("Fetching comments for locationId:", locationId); // Debug
  
      try {
        const response = await fetch(`${apiUrl}/comments/location/${locationId}`);
        const data = await response.json();
  
        console.log("API response:", data); // Debug
  
        if (response.ok) {
          return data; // Liste des commentaires
        } else {
          console.error("Error fetching comments:", data); // Debug
          return thunkAPI.rejectWithValue(data);
        }
      } catch (error) {
        console.error("Network error:", error.message); // Debug
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  // Action pour créer un commentaire
export const createComment = createAsyncThunk(
  "comments/create",
  async (commentData, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;

    try {
      const response = await fetch(`${apiUrl}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const data = await response.json();

      if (response.ok) {
        return data; // Retourne le commentaire créé
      } else {
        return thunkAPI.rejectWithValue(data); // Retourne une erreur
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Gestion des erreurs réseau
    }
  }
);

  
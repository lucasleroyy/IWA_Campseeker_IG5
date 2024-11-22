import { createAsyncThunk } from "@reduxjs/toolkit";

// Action pour ajouter un favori
export const addFavorite = createAsyncThunk(
  "favoris/addFavorite",
  async ({ userId, locationId }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // Vérifiez que cette URL est correcte
    try {
      console.log("URL appelée :", `${apiUrl}/favoris`);
      console.log("Payload envoyé :", { userId, locationId });

      const response = await fetch(`${apiUrl}/favoris`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, locationId }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Réponse du serveur :", data);
        return data; // Retourne le favori créé
      } else {
        console.error("Erreur côté serveur :", data);
        return thunkAPI.rejectWithValue(data); // Retourne une erreur
      }
    } catch (error) {
      console.error("Erreur réseau :", error.message);
      return thunkAPI.rejectWithValue(error.message); // Gestion des erreurs réseau
    }
  }
);

export const checkIfFavorite = createAsyncThunk(
  "favoris/checkIfFavorite",
  async ({ userId, locationId }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(
        `${apiUrl}/favoris/user/${userId}/location/${locationId}`
      );

      if (response.ok) {
        const isFavorite = await response.json();
        return { locationId, isFavorite };
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favoris/removeFavorite",
  async ({ userId, locationId }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;

    try {
      // Étape 1 : Vérifie si le favori existe pour l'utilisateur et le lieu
      console.log(`Vérification du favori : ${apiUrl}/favoris/user/${userId}/location/${locationId}`);
      const getResponse = await fetch(`${apiUrl}/favoris/user/${userId}/location/${locationId}`);
      if (!getResponse.ok) {
        const errorData = await getResponse.json();
        console.error("Erreur lors de la vérification :", errorData);
        return thunkAPI.rejectWithValue(errorData);
      }

      const isFavorite = await getResponse.json();
      if (!isFavorite) {
        console.log("Le lieu n'est pas dans les favoris, aucune suppression nécessaire.");
        return thunkAPI.rejectWithValue("Le lieu n'est pas dans les favoris.");
      }

      // Étape 2 : Récupérer tous les favoris de l'utilisateur pour obtenir le favoriteId
      const favoritesResponse = await fetch(`${apiUrl}/favoris/user/${userId}`);
      const favorites = await favoritesResponse.json();

      const favorite = favorites.find((fav) => fav.locationId === locationId);
      if (!favorite) {
        console.error("Impossible de trouver le favoriteId.");
        return thunkAPI.rejectWithValue("Impossible de trouver le favoriteId.");
      }

      // Étape 3 : Appeler la route DELETE avec le favoriteId
      console.log(`Suppression du favori avec favoriteId : ${favorite.favoriteId}`);
      const deleteResponse = await fetch(`${apiUrl}/favoris/${favorite.favoriteId}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        return { userId, locationId }; // Retourne les données supprimées
      } else {
        const errorData = await deleteResponse.json();
        console.error("Erreur lors de la suppression :", errorData);
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      console.error("Erreur réseau ou autre :", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




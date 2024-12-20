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

export const createLocation = createAsyncThunk(
  "locations/create",
  async (locationData, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    console.log("API URL pour créer le lieu :", apiUrl);
    console.log("Données envoyées :", locationData);

    try {
      const response = await fetch(`${apiUrl}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });

      const data = await response.json();
      console.log("Réponse brute du serveur :", data);

      if (response.ok) {
        return data; // Retourne les détails du lieu créé
      } else {
        console.error("Erreur API :", data);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.error("Erreur réseau :", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Lier plusieurs équipements à un lieu
export const linkEquipmentsToLocation = createAsyncThunk(
  "locations/linkEquipments",
  async ({ locationId, equipmentIds }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/locations/${locationId}/equipments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipmentIds),
      });

      if (response.ok) {
        return { locationId, equipmentIds };
      } else {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message || "Erreur lors de l'association des équipements.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Action to fetch locations by user ID
export const fetchLocationsByUserId = createAsyncThunk(
  "locations/fetchByUserId",
  async (userId, { rejectWithValue, getState }) => {
    const apiUrl = getState().config.apiUrl; // Fetch the API URL from the state
    try {
      const response = await fetch(`${apiUrl}/locations/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch locations for the user.");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action pour mettre à jour un lieu
export const updateLocation = createAsyncThunk(
  "locations/updateLocation",
  async ({ id, locationData }, { getState, rejectWithValue }) => {
    const apiUrl = getState().config.apiUrl; // Récupère l'URL de l'API depuis le state
    try {
      const response = await fetch(`${apiUrl}/locations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        throw new Error("Impossible de mettre à jour le lieu.");
      }

      return await response.json(); // Retourne les données mises à jour
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action to fetch locations by multiple equipment IDs
export const fetchLocationsByEquipments = createAsyncThunk(
  'locations/fetchByEquipments',
  async (equipmentIds, { getState, rejectWithValue }) => {
    const apiUrl = getState().config.apiUrl;
    try {
      // Join the equipmentIds array into a comma-separated string for the query
      const response = await fetch(`${apiUrl}/search/locations?equipmentIds=${equipmentIds.join(',')}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        return data;  // Return the fetched locations
      } else {
        return rejectWithValue(data);  // Return error if not successful
      }
    } catch (error) {
      return rejectWithValue(error.message);  // Handle network errors
    }
  }
);

// Délier un équipement d’un lieu
export const unlinkEquipmentFromLocation = createAsyncThunk(
  'locations/unlinkEquipmentFromLocation',
  async ({ locationId, equipmentId }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/locations/${locationId}/equipments/${equipmentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l’équipement.');
      }
      return { locationId, equipmentId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
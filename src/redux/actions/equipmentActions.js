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

// Action to add an equipment
export const addEquipment = createAsyncThunk(
  'equipments/addEquipment',
  async (equipmentData, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/equipments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipmentData)
      });
      const data = await response.json();
      if (response.ok) {
        return data;  // Return the newly added equipment
      } else {
        return thunkAPI.rejectWithValue(data);  // Return an error with the error message
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);  // Handle network errors
    }
  }
);

export const removeEquipment = createAsyncThunk(
    'equipments/removeEquipment',
    async (equipmentId, thunkAPI) => {
      const apiUrl = thunkAPI.getState().config.apiUrl;
      try {
        const response = await fetch(`${apiUrl}/equipments/${equipmentId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log(`Equipment with ID: ${equipmentId} deleted successfully.`);
          return equipmentId; // Return the id of the deleted equipment
        } else {
          const data = await response.json();
          console.error(`Error deleting equipment:`, data);
          return thunkAPI.rejectWithValue(data); // Return an error with the error message
        }
      } catch (error) {
        console.error("Network error:", error.message);
        return thunkAPI.rejectWithValue(error.message); // Handle network errors
      }
    }
  );
  

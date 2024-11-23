import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`);
      const data = await response.json();
      if (response.ok) {
        return {
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role, // Ajoute le rôle ici
        };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

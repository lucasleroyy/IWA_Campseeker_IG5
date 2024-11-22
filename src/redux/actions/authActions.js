import { createAsyncThunk } from '@reduxjs/toolkit';

export const authenticateUser = createAsyncThunk(
  'user/authenticate',
  async ({ email, password }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Réponse API de connexion :', data);
        // Inclut le userId et le token dans la payload
        return { userInfo: { userId: data.userId, token: data.token } };
      } else {
        console.error('Erreur API de connexion :', data);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.error('Erreur réseau :', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const logout = () => ({
  type: 'LOGOUT'
});

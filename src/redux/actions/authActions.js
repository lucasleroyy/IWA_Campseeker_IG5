import { createAsyncThunk } from '@reduxjs/toolkit';


export const authenticateUser = createAsyncThunk('user/authenticate', async ({ email, password }, thunkAPI) => {
  console.log('Authenticating user with:', email);
  const apiUrl = thunkAPI.getState().config.apiUrl;
  try {
    const response = await fetch(`${apiUrl}/auth/login`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });    
    const data = await response.json();
    console.log('Response:', data);
    if (response.ok) {
      console.log('Login successful', data);
      return { userInfo: data, isAdmin: data.isAdmin };
    } else {
      console.log('Login failed', data);
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    console.log('Network or other error', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ firstName, lastName, email, password, phoneNumber, role = 'user' }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password, phoneNumber, role }),
      });

      // Vérifiez si le corps de la réponse existe avant de le parser
      const text = await response.text(); // Récupère la réponse sous forme de texte brut
      const data = text ? JSON.parse(text) : {}; // Parse uniquement si le texte existe

      console.log('Response:', data);

      if (response.ok) {
        console.log('Registration successful', data);
        return data; // Renvoie les données en cas de succès
      } else {
        console.log('Registration failed', data);
        return thunkAPI.rejectWithValue(data); // Rejet en cas d'erreur
      }
    } catch (error) {
      console.log('Network or other error', error);
      return thunkAPI.rejectWithValue(error.message); // Rejet en cas d'erreur réseau
    }
  }
);

export const logout = () => ({
  type: 'LOGOUT'
});

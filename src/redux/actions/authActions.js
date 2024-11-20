import { createAsyncThunk } from '@reduxjs/toolkit';


export const authenticateUser = createAsyncThunk('user/authenticate', async ({ email, password }, thunkAPI) => {
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

export const logout = () => ({
  type: 'LOGOUT'
});

import { createAsyncThunk } from '@reduxjs/toolkit';


export const authenticateUser = createAsyncThunk('user/authenticate', async ({ email, password }, thunkAPI) => {
  console.log('Logging in with:', email, password);
  try {
    const response = await fetch('http://162.38.35.249:8080/auth/login', { 
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


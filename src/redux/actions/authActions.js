// authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Authentification utilisateur
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

      // Vérifie si la réponse est OK et contient les champs attendus
      if (response.ok && data.userId && data.token) {
        console.log('Réponse API de connexion :', data);
        return { userInfo: { userId: data.userId, token: data.token, email } }; // Ajoutez l'email si nécessaire
      } else if (!response.ok) {
        console.error('Erreur API de connexion :', data.message || data);
        return thunkAPI.rejectWithValue(data.message || 'Erreur d\'authentification');
      } else {
        console.error('Données manquantes dans la réponse de l\'API :', data);
        return thunkAPI.rejectWithValue('Les informations utilisateur sont incomplètes.');
      }
    } catch (error) {
      console.error('Erreur réseau :', error.message);
      return thunkAPI.rejectWithValue('Erreur réseau : ' + error.message);
    }
  }
);

// Inscription utilisateur
export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { firstName, lastName, email, password, phoneNumber, role = 'user' },
    thunkAPI
  ) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          role,
        }),
      });

      const text = await response.text(); // Récupère la réponse brute
      const data = text ? JSON.parse(text) : {}; // Parse uniquement si non vide

      // Vérifie la validité de la réponse
      if (response.ok) {
        console.log('Inscription réussie :', data);
        return data; // Retourne les données utilisateur
      } else {
        console.error('Erreur API d\'inscription :', data.message || data);
        return thunkAPI.rejectWithValue(data.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur réseau :', error.message);
      return thunkAPI.rejectWithValue('Erreur réseau : ' + error.message);
    }
  }
);

// Déconnexion utilisateur
export const logout = () => ({
  type: 'LOGOUT',
});

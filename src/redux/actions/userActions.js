import { createAsyncThunk } from '@reduxjs/toolkit';

// Action pour récupérer les détails d'un utilisateur par ID
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
          email: data.email, // Ajoutez l'email si nécessaire
          role: data.role,
          phoneNumber: data.phoneNumber,
        };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl;

    try {
      const token = thunkAPI.getState().user.userInfo?.token;

      if (!token) {
        throw new Error("Token d'authentification manquant.");
      }

      console.log('Requête PUT :', {
        url: `${apiUrl}/users/${userData.userId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: userData,
      });

      const response = await fetch(`${apiUrl}/users/${userData.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      // Log de la réponse complète
      console.log('Réponse API :', {
        status: response.status,
        body: await response.clone().text(),
        headers: Array.from(response.headers.entries()),
      });

      // Gérer les réponses vides
      if (response.headers.get('Content-Length') === '0') {
        if (response.ok) {
          console.warn('Réponse vide avec un statut 2xx.');
          return {}; // Retourne un objet vide si tout va bien
        } else {
          console.error(`Erreur API (Statut ${response.status}) : Réponse vide`);
          return thunkAPI.rejectWithValue(
            `Erreur API : Statut ${response.status}, réponse vide.`
          );
        }
      }

      // Tenter de parser le JSON
      const data = await response.json();
      if (response.ok) {
        return data; // Retourne les données mises à jour
      } else {
        return thunkAPI.rejectWithValue(data.message || 'Erreur lors de la mise à jour.');
      }
    } catch (error) {
      console.error('Erreur inattendue :', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Erreur inattendue lors de la mise à jour.'
      );
    }
  }
);

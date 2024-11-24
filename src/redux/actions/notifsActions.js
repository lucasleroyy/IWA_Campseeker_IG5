import {createAsyncThunk } from "@reduxjs/toolkit";

// Action pour récupérer les notifications non lues
export const fetchUnreadNotifications = createAsyncThunk(
  "notifications/fetchUnread",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const apiUrl = state.config.apiUrl; // URL de l'API depuis la config
    const userId = state.user.userInfo?.userId; // ID de l'utilisateur connecté

    if (!userId) {
      return thunkAPI.rejectWithValue("Utilisateur non connecté.");
    }

    try {
      const response = await fetch(`${apiUrl}/notifications/unread?userId=${userId}`);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notifications.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Action pour marquer une notification comme lue
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, thunkAPI) => {
    const state = thunkAPI.getState();
    const apiUrl = state.config.apiUrl; // URL de l'API depuis la config

    try {
      const response = await fetch(
        `${apiUrl}/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la notification.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

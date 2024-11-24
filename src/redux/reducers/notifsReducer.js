import {createSlice } from "@reduxjs/toolkit";
import { fetchUnreadNotifications, markNotificationAsRead } from "../actions/notifsActions";

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: {
      notifications: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUnreadNotifications.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUnreadNotifications.fulfilled, (state, action) => {
          state.loading = false;
          state.notifications = action.payload;
        })
        .addCase(fetchUnreadNotifications.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(markNotificationAsRead.fulfilled, (state, action) => {
          const updatedNotification = action.payload;
          state.notifications = state.notifications.map((notification) =>
            notification.notificationId === updatedNotification.notificationId
              ? updatedNotification
              : notification
          );
        })
        .addCase(markNotificationAsRead.rejected, (state, action) => {
          state.error = action.payload;
        });
    },
  });
  
  export default notificationsSlice.reducer;
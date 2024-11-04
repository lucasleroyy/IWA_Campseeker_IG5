import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/User_reducer.js';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = {
  user: { userInfo: userInfoFromStorage }, // Assure-toi que l'état correspond à la structure de ton reducer
};

const store = configureStore({
  reducer: {
    user: userReducer,  // Utilise "reducer" pour inclure tous les reducers combinés
  },
  preloadedState, // Assigne l'état préchargé ici
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),  // redux-thunk est déjà inclus par défaut, pas besoin de l'ajouter manuellement
});

export default store;

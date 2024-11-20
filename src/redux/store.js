import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './reducers/User_reducer';

// Configuration de redux-persist
const persistConfig = {
  key: 'root',  // Niveau le plus élevé de réduction à persister
  storage: AsyncStorage,  // Définir AsyncStorage comme méthode de stockage
  whitelist: ['user']  // Vous pouvez spécifier quelles parties de l'état vous voulez persister
};

// Utiliser persistReducer pour envelopper le reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Créer le store avec le reducer persistant
const store = configureStore({
  reducer: {
    user: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorez les vérifications de sérialisation pour des actions spécifiques
        ignoredActions: ['persist/PERSIST']
      }
    }),
});

// Créer le persistor
const persistor = persistStore(store);

export { store, persistor };

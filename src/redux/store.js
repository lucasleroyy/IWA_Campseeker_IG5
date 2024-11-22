// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers/indexReducer'; // RootReducer combiné

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'config', 'locations'], // Persistez également le réducteur `locations`
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore les vérifications de sérialisation pour redux-persist
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

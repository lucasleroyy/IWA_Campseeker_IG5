// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers/indexReducer';  // Importez le rootReducer combiné

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'config']  // Assurez-vous de persister aussi le configReducer si nécessaire
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }),
});

const persistor = persistStore(store);

export { store, persistor };

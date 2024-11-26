import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { ThemeProvider } from './src/ThemeContext'; // Assurez-vous que le chemin est correct
import AppNavigator from './src/App_navigation';
import useAppStateReset from './useAppStateReset';

const AppWithAppState = () => {
  useAppStateReset();
  return <AppNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider> {/* Ajout de ThemeProvider ici */}
          <AppWithAppState />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

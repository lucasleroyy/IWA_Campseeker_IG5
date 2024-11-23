import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { resetStore } from './src/redux/actions/configAction';
import AppNavigator from './src/App_navigation';
import useAppStateReset from './useAppStateReset';

const AppWithAppState = () => {
  useAppStateReset(); // Appel du hook ici
  return <AppNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWithAppState />
      </PersistGate>
    </Provider>
  );
};

export default App;
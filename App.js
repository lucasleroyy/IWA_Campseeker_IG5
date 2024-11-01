import React from 'react';
import { I18nextProvider } from 'react-i18next'; // Assurez-vous que c'est correctement importé
import i18n from './src/i18n'; // Assurez-vous que i18n est exporté correctement
import AppNavigator from './src/App_navigation'; // Vérifiez l'import d'AppNavigator
import { ThemeProvider } from './src/ThemeContext'; // Vérifiez l'import de ThemeProvider

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;

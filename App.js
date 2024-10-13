import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageInscription from './src/Pages/PageInscription';
import PageConnexion from './src/Pages/PageConnexion';
import PageConditions from './src/Pages/PageConditions'; 
import PageProfil from './src/Pages/PageProfil'; // Import de la page profil

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Change initialRouteName to 'PageProfil' for testing */}
      <Stack.Navigator initialRouteName="PageProfil">
        <Stack.Screen 
          name="PageProfil" 
          component={PageProfil} 
          options={{ title: 'Profil utilisateur', headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

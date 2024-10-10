import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageConnexion from './src/Pages/PageConnexion'; // Assure-toi que le chemin est correct

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageConnexion">
        <Stack.Screen 
          name="PageConnexion" 
          component={PageConnexion} 
          options={{ headerShown: false }} // Masquer le header pour un affichage propre
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

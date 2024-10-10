import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageInscription from './src/Pages/PageInscription';
import PageConnexion from './src/Pages/PageConnexion';
import PageConditions from './src/Pages/PageConditions'; // Import de la page

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageInscription">
        <Stack.Screen 
          name="PageInscription" 
          component={PageInscription} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PageConnexion" 
          component={PageConnexion} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PageConditions" 
          component={PageConditions} 
          options={{ title: 'Conditions d\'utilisation' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

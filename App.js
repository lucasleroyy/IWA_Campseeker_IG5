import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageInscription from './src/Pages/PageInscription';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageInscription">
        <Stack.Screen 
          name="PageInscription" 
          component={PageInscription} 
          options={{ headerShown: false }} // Masquer le header pour un affichage propre
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

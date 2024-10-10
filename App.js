import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageConnexion from './src/Pages/PageConnexion';
import PageInscription from './src/Pages/PageInscription';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageConnexion">
        <Stack.Screen 
          name="PageConnexion" 
          component={PageConnexion} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PageInscription" 
          component={PageInscription} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

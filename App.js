import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './src/pages/Test';
import PageRecherche from './src/pages/PageRecherche';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Test">
        <Stack.Screen 
          name="Test" 
          component={Test} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PageRecherche" 
          component={PageRecherche} 
          options={{ title: 'Recherche' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

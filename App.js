import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test_Lucas from './src/Pages/Test_Lucas';
import PageRecherche from './src/Pages/PageRecherche';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Test_Lucas">
        <Stack.Screen 
          name="Test_Lucas" 
          component={Test_Lucas} 
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

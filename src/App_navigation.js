import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PageRecherche from './pages/Page_recherche';
import AjoutLieu from './pages/Ajout_lieu';
import Favoris from './pages/Page_favoris';
import ProfilUser from './pages/Profil_user';
import ConditionsService from './pages/Conditions_service';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageRecherche" screenOptions={{
          headerShown: false,
          animationEnabled: false  // Désactive les animations de transition
        }}>
        <Stack.Screen name="PageRecherche" component={PageRecherche} />
        <Stack.Screen name="AjouterLieu" component={AjoutLieu} />
        <Stack.Screen name="PageFavoris" component={Favoris} />
        <Stack.Screen name="ProfilUser" component={ProfilUser} />
        <Stack.Screen name="ConditionsService" component={ConditionsService} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

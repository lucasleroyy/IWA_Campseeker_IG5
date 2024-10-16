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
      <Stack.Navigator
        initialRouteName="PageRecherche"
        screenOptions={{
          animationEnabled: false, // Désactive les animations de transition
        }}
      >
        <Stack.Screen
          name="PageRecherche"
          component={PageRecherche}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AjouterLieu"
          component={AjoutLieu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PageFavoris"
          component={Favoris}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilUser"
          component={ProfilUser}
          options={{ headerShown: false }}
        />
        {/* Ici, on affiche le bouton de retour pour ConditionsService */}
        <Stack.Screen
          name="ConditionsService"
          component={ConditionsService}
          options={{
            title: 'Conditions Générales d\'Utilisation', // Le titre dans l'en-tête
            headerShown: true, // Afficher l'en-tête avec le bouton retour
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

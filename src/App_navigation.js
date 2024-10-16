import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PageRecherche from './pages/Page_recherche';
import AjoutLieu from './pages/Ajout_lieu';
import PageFavoris from './pages/Page_favoris';
import PageInfoLieu from './pages/Page_infos_lieu';
import ProfilUser from './pages/Profil_user';
import ConditionsService from './pages/Conditions_service';
import PolitiqueConfidentialite from './pages/Politique_confidentialite';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageRecherche" screenOptions={{
        animationEnabled: false
      }}>
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
          component={PageFavoris} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ProfilUser" 
          component={ProfilUser} 
          options={{ headerShown: false }}
        />

        {/* Pages avec le header affiché */}
        <Stack.Screen 
          name="PageInfoLieu" 
          component={PageInfoLieu} 
          options={{ headerShown: true, headerBackTitle: 'Retour' }}
        />
        <Stack.Screen 
          name="ConditionsService" 
          component={ConditionsService} 
          options={{ headerShown: true, headerBackTitle: 'Retour' }}
        />

<Stack.Screen 
  name="PolitiqueConfidentialite" 
  component={PolitiqueConfidentialite} 
  options={{ headerShown: true }} 
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

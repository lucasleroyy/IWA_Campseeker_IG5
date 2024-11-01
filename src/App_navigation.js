import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PageRecherche from './pages/Page_recherche';
import AjoutLieu from './pages/Ajout_lieu';
import PageFavoris from './pages/Page_favoris';
import PageInfoLieu from './pages/Page_infos_lieu';
import ProfilUser from './pages/Profil_user';
import PageAccueil from './pages/Page_accueil';
import ConditionsService from './pages/Conditions_service';
import MesLieux from './pages/Mes_lieux_user';
import DetailMesLieux from './pages/Detail_mes_lieux';
import PolitiqueConfidentialite from './pages/Politique_confidentialite';
import AccueilAdmin from './pages/Admin/Accueil_admin';
import ListeLieuxCommentaireAdmin from './pages/Admin/Liste_lieux_commentaire_admin';
import CommentaireAdmin from './pages/Admin/Commentaire_admin';
import ListeLieuxAdminInfo from './pages/Admin/Liste_lieux_info_admin';
import LieuAdmin from './pages/Admin/Lieu_admin';
import SupportAdmin from './pages/Admin/Support_admin';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageAccueil" screenOptions={{
        animationEnabled: false
      }}>
        <Stack.Screen
          name="PageAccueil"
          component={PageAccueil}
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
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Détail du lieu', }}
        />
        <Stack.Screen 
          name="ConditionsService" 
          component={ConditionsService} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Conditions de Service', }}
        />

        <Stack.Screen 
<<<<<<< HEAD
          name="PolitiqueConfidentialite" 
          component={PolitiqueConfidentialite} 
          options={{ headerShown: true , headerBackTitle: 'Retour' }} 
=======
          name="MesLieux" 
          component={MesLieux} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Mes lieux', }}
        />
        <Stack.Screen 
          name="DetailMesLieux" 
          component={DetailMesLieux} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Détail du lieu', }}
        />
        
        <Stack.Screen 
          name="PageRecherche" 
          component={PageRecherche} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Recherche',}}
        />

        <Stack.Screen 
          name="PolitiqueConfidentialite" 
          component={PolitiqueConfidentialite} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Politique de Confidentialité',}} 
        />
        <Stack.Screen 
          name="AccueilAdmin" 
          component={AccueilAdmin} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Accueil Admin',}} 
        />

        <Stack.Screen 
          name="ListeLieuxCommentaireAdmin" 
          component={ListeLieuxCommentaireAdmin} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Les Lieux',}} 
        />

        <Stack.Screen 
          name="CommentaireAdmin" 
          component={CommentaireAdmin} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Commentaire du lieu', }}
        />

        <Stack.Screen 
          name="ListeLieuxInfoAdmin" 
          component={ListeLieuxAdminInfo} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Les Lieux', }}
        />
        <Stack.Screen 
          name="LieuAdmin" 
          component={LieuAdmin} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Commentaire du lieu', }}
        />
        <Stack.Screen 
          name="SupportAdmin" 
          component={SupportAdmin} 
          options={{ headerShown: true, headerBackTitle: 'Retour', title: 'Support', }}
>>>>>>> ef88d58939a90bfac24c7e020ec27c748f9839b0
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

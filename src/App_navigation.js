import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PageRecherche from "./pages/Page_recherche";
import AjoutLieu from "./pages/Ajout_lieu";
import PageFavoris from "./pages/Page_favoris";
import PageInfoLieu from "./pages/Page_infos_lieu";
import ProfilUser from "./pages/Profil_user";
import PageAccueil from "./pages/Page_accueil";
import ConditionsService from "./pages/Conditions_service";
import MesLieux from "./pages/Mes_lieux_user";
import DetailMesLieux from "./pages/Detail_mes_lieux";
import PolitiqueConfidentialite from "./pages/Politique_confidentialite";
import AccueilAdmin from "./pages/Admin/Accueil_admin";
import ListeLieuxCommentaireAdmin from "./pages/Admin/Liste_lieux_commentaire_admin";
import CommentaireAdmin from "./pages/Admin/Commentaire_admin";
import ListeLieuxAdminInfo from "./pages/Admin/Liste_lieux_info_admin";
import LieuAdmin from "./pages/Admin/Lieu_admin";
import SupportAdmin from "./pages/Admin/Support_admin";
import Parametres from "./pages/Parametres";
import FAQUser from "./pages/faq_user"; // Import correct pour faq_user
import MonCompteUser from "./pages/Mon_compte_user";
import GestionEquipement from "./pages/Admin/Equipements_admin";
import Notification from "./pages/Notifications";
import ModifierMonLieu from "./pages/Modifier_mon_lieu";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Connexion"
        screenOptions={{
          animationEnabled: true,
          gestureEnabled: true, // Doit être vrai pour activer les gestes de navigation
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#333",
          headerBackTitleStyle: { fontSize: 14 },
        }}
      >
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

        <Stack.Screen
          name="Connexion"
          component={Connexion}
          options={{ headerShown: false }}
        />

        {/* Pages avec le header affiché */}
        <Stack.Screen
          name="Inscription"
          component={Inscription}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Connexion",
          }}
        />

        <Stack.Screen
          name="PageInfoLieu"
          component={PageInfoLieu}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Détail du lieu",
          }}
        />
        <Stack.Screen
          name="ConditionsService"
          component={ConditionsService}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Conditions de Service",
          }}
        />
        <Stack.Screen
          name="Parametres"
          component={Parametres}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Paramètres",
          }}
        />
        <Stack.Screen
          name="MesLieux"
          component={MesLieux}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Mes lieux",
          }}
        />
        <Stack.Screen
          name="DetailMesLieux"
          component={DetailMesLieux}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Détail du lieu",
          }}
        />
        <Stack.Screen
          name="PageRecherche"
          component={PageRecherche}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Recherche",
          }}
        />
        <Stack.Screen
          name="PolitiqueConfidentialite"
          component={PolitiqueConfidentialite}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Politique de Confidentialité",
          }}
        />

        <Stack.Screen
          name="MonCompte"
          component={MonCompteUser}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Mon Compte",
          }}
        />

        <Stack.Screen
          name="ModifierMonLieu"
          component={ModifierMonLieu}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Modifier le lieu",
          }}
        />

        {/* Ajout de l'écran FAQUser */}
        <Stack.Screen
          name="faq_user"
          component={FAQUser}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "F.A.Q",
          }}
        />

        <Stack.Screen
          name="AccueilAdmin"
          component={AccueilAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListeLieuxCommentaireAdmin"
          component={ListeLieuxCommentaireAdmin}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Les Lieux",
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notification}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Notifications",
          }}
        />
        <Stack.Screen
          name="CommentaireAdmin"
          component={CommentaireAdmin}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Commentaire du lieu",
          }}
        />
        <Stack.Screen
          name="ListeLieuxInfoAdmin"
          component={ListeLieuxAdminInfo}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Les Lieux",
          }}
        />
        <Stack.Screen
          name="LieuAdmin"
          component={LieuAdmin}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Commentaire du lieu",
          }}
        />
        <Stack.Screen
          name="SupportAdmin"
          component={SupportAdmin}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Support",
          }}
        />
        <Stack.Screen
          name="GestionEquipement"
          component={GestionEquipement}
          options={{
            headerShown: true,
            headerBackTitle: "Retour",
            title: "Équipements",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

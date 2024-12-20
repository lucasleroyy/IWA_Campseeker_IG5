import React, { useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { resetStore } from "../redux/actions/configAction";
import { fetchUnreadNotifications } from "../redux/actions/notifsActions";
import { persistor } from "../redux/store";
import ChampRedirection from "../components/Champ_redirection";
import Bandeau from "../components/Bandeau";
import { useTheme } from "../ThemeContext";
import { useTranslation } from "react-i18next";



const PageProfil = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation(); 

  // Sélectionnez les notifications depuis Redux
  const { notifications } = useSelector((state) => state.notifications);

  // Comptez uniquement les notifications non lues
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  useEffect(() => {
    dispatch(fetchUnreadNotifications());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(resetStore());
    persistor.purge(); // Réinitialise complètement redux-persist
    navigation.navigate("Connexion");
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? "#333333" : "rgba(166, 116, 55, 0.1)" },
    ]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>{t('profile.title')}</Text>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color:isDarkMode ? "#FFFFFF" : "#333333" }]}>{t('profile.sections.general')}</Text>

          {/* Autres champs */}
          <ChampRedirection
            label={t('profile.labels.myAccount')}
            targetScreen="MonCompte"
            navigation={navigation}
          />
          <ChampRedirection
            label={t('profile.labels.myPlaces')}
            targetScreen="MesLieux"
            navigation={navigation}
          />
          <ChampRedirection
            label={t('profile.labels.settings')}
            targetScreen="Parametres"
            navigation={navigation}
          />
        </View>
        {/* Champ Notifications avec cloche et compteur */}
        <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => navigation.navigate("Notifications")}
          >
            <View style={styles.labelContainer}>
              <Icon
                name={unreadCount > 0 ? "bell" : "bell-outline"}
                size={20}
                color="#000"
                style={styles.icon}
              />
              <Text style={styles.label}>{t('profile.labels.notifications')}</Text>
            </View>
            <View style={styles.rightContainer}>
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
              <Icon name="chevron-right" size={30} color="#597962" />
            </View>
          </TouchableOpacity>

        <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color:isDarkMode ? "#FFFFFF" : "#333333" }]}>{t('profile.sections.help')}</Text>
          <ChampRedirection
            label={t('profile.labels.faq')}
            targetScreen="faq_user"
            navigation={navigation}
          />
        </View>

        <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color:isDarkMode ? "#FFFFFF" : "#333333" }]}>{t('profile.sections.legal')}</Text>
          <ChampRedirection
            label={t('profile.labels.terms')}
            targetScreen="ConditionsService"
            navigation={navigation}
          />
          <ChampRedirection
            label={t('profile.labels.privacyPolicy')}
            targetScreen="PolitiqueConfidentialite"
            navigation={navigation}
          />
        </View>

        <View style={styles.section}>
          <ChampRedirection
            label={t('profile.labels.logout')}
            onPress={handleLogout}
            style={styles.deconnexion}
          />
        </View>
      </ScrollView>

      <Bandeau currentPage="ProfilUser" onNavigate={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
    paddingBottom: 50, 
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: "15%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#F25C05",
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "5%",
    marginBottom: 10,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: 50,
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#F25C05",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  deconnexion: {
    color: "#F2994A",
  },
});

export default PageProfil;

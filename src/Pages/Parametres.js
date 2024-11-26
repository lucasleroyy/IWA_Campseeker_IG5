import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChampSelection from '../components/Champ_selection';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext';

const Parametres = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode = false, toggleTheme = () => {} } = useTheme() || {}; // Ajout des valeurs par défaut

  // État local
  const [language, setLanguage] = useState('fr');
  const [newsNotification, setNewsNotification] = useState(true);
  const [reviewNotification, setReviewNotification] = useState(true);

  // Chargement de la langue depuis AsyncStorage
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  // Changement de langue
  const changeLanguage = async (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  };

  // Notification Alert
  const handleNotificationToggle = (notificationType, isEnabled) => {
    const message = isEnabled
      ? t('notificationEnabled', { notificationType })
      : t('notificationDisabled', { notificationType });
    Alert.alert(t('notificationTitle'), message);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
        {t('settings')}
      </Text>

      {/* Langue */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>
          {t('language')}
        </Text>
        <View style={styles.languageContainer}>
          <ChampSelection
            label="Français"
            isSelected={language === 'fr'}
            onPress={() => changeLanguage('fr')}
          />
          <ChampSelection
            label="English"
            isSelected={language === 'en'}
            onPress={() => changeLanguage('en')}
          />
        </View>
      </View>

      {/* Thème */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>
          {t('theme')}
        </Text>
        <View style={styles.themeContainer}>
          <ChampSelection
            label={t('darkMode')}
            isSelected={isDarkMode}
            onPress={toggleTheme}
          />
          <ChampSelection
            label={t('lightMode')}
            isSelected={!isDarkMode}
            onPress={toggleTheme}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#F2EDE5',
  },
  darkContainer: {
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  notificationSection: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 15,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  notificationLabel: {
    fontSize: 16,
    flex: 1,
  },
});

export default Parametres;

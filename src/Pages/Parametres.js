import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChampSelection from '../components/Champ_selection';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext';

const Parametres = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();

  // States for language and notifications
  const [language, setLanguage] = useState('fr');
  const [newsNotification, setNewsNotification] = useState(true);
  const [reviewNotification, setReviewNotification] = useState(true);

  // Load and set language from AsyncStorage when the component mounts
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  // Handle language change and save to AsyncStorage
  const changeLanguage = async (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  };

  // Display alert for notification toggle
  const handleNotificationToggle = (notificationType, isEnabled) => {
    const message = isEnabled
      ? `Vous avez activé les notifications pour "${notificationType}".`
      : `Vous avez désactivé les notifications pour "${notificationType}".`;
    Alert.alert('Notification', message);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
        {t('settings')}
      </Text>

      {/* Language Section */}
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

      {/* Theme Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>
          {t('Theme')}
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

      {/* Notification Section */}
      <View style={styles.notificationSection}>
        <Text style={[styles.notificationTitle, isDarkMode ? styles.darkText : styles.lightText]}>
          {t('notifications')}
        </Text>

        {/* News Notification */}
        <View style={styles.notificationRow}>
          <Text style={[styles.notificationLabel, isDarkMode ? styles.darkText : styles.lightText]}>
            {t('news')}
          </Text>
          <ChampSelection
            label={t('yes')}
            isSelected={newsNotification}
            onPress={() => {
              setNewsNotification(true);
              handleNotificationToggle(t('news'), true);
            }}
          />
          <ChampSelection
            label={t('no')}
            isSelected={!newsNotification}
            onPress={() => {
              setNewsNotification(false);
              handleNotificationToggle(t('news'), false);
            }}
          />
        </View>

        {/* Review Notification */}
        <View style={styles.notificationRow}>
          <Text style={[styles.notificationLabel, isDarkMode ? styles.darkText : styles.lightText]}>
            {t('reviewAlert')}
          </Text>
          <ChampSelection
            label={t('yes')}
            isSelected={reviewNotification}
            onPress={() => {
              setReviewNotification(true);
              handleNotificationToggle(t('reviewAlert'), true);
            }}
          />
          <ChampSelection
            label={t('no')}
            isSelected={!reviewNotification}
            onPress={() => {
              setReviewNotification(false);
              handleNotificationToggle(t('reviewAlert'), false);
            }}
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
    color: '#D2691E',
  },
  darkText: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 30,
    padding: 20,
    borderColor: '#D2691E',
    borderWidth: 1,
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: '#D2691E',
    borderWidth: 1,
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

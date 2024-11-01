import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChampSelection from '../components/Champ_selection';

const Parametres = () => {
  const [language, setLanguage] = useState('Français');
  const [theme, setTheme] = useState('Mode Clair');
  const [newsNotification, setNewsNotification] = useState(true);
  const [reviewNotification, setReviewNotification] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      {/* Section Langue */}
      <View style={styles.section}>
        <View style={styles.languageContainer}>
          <ChampSelection
            label="Français"
            isSelected={language === 'Français'}
            onPress={() => setLanguage('Français')}
          />
          <ChampSelection
            label="English"
            isSelected={language === 'English'}
            onPress={() => setLanguage('English')}
          />
        </View>
        <View style={styles.themeContainer}>
          <ChampSelection
            label="Mode Sombre"
            isSelected={theme === 'Mode Sombre'}
            onPress={() => setTheme('Mode Sombre')}
          />
          <ChampSelection
            label="Mode Clair"
            isSelected={theme === 'Mode Clair'}
            onPress={() => setTheme('Mode Clair')}
          />
        </View>
      </View>

      {/* Section Notifications */}
      <View style={styles.notificationSection}>
        <Text style={styles.notificationTitle}>Notification</Text>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationLabel}>Actualités</Text>
          <ChampSelection
            label="Oui"
            isSelected={newsNotification}
            onPress={() => setNewsNotification(true)}
          />
          <ChampSelection
            label="Non"
            isSelected={!newsNotification}
            onPress={() => setNewsNotification(false)}
          />
        </View>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationLabel}>Nouvel avis sur votre lieu</Text>
          <ChampSelection
            label="Oui"
            isSelected={reviewNotification}
            onPress={() => setReviewNotification(true)}
          />
          <ChampSelection
            label="Non"
            isSelected={!reviewNotification}
            onPress={() => setReviewNotification(false)}
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
    backgroundColor: '#F2EDE5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D2691E',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginBottom: 30,
    padding: 20,
    borderColor: '#D2691E',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: '#D2691E',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
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
    color: '#000',
    flex: 1,
  },
});

export default Parametres;

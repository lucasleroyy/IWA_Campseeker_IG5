import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext';
import BoiteBlanche from '../components/Boite_blanche';

const PolitiqueConfidentialite = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#333333' : 'rgba(166, 116, 55, 0.1)' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Titre principal */}
        <Text style={styles.title}>{t('profile.privacyPolicy.title')}</Text>
        <BoiteBlanche>
          {[
            'introduction',
            'dataCollected',
            'dataPurposes',
            'dataSharing',
            'userRights',
            'dataRetention',
            'dataSecurity',
            'dataTransfer',
            'policyChanges',
            'contact',
          ].map((sectionKey) => (
            <View key={sectionKey}>
              <Text style={styles.sectionTitle}>
                {t(`profile.privacyPolicy.${sectionKey}.title`)}
              </Text>
              <Text style={styles.text}>
                {t(`profile.privacyPolicy.${sectionKey}.content`)}
              </Text>
            </View>
          ))}
        </BoiteBlanche>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: '5%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F25C05',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify'

  },
});

export default PolitiqueConfidentialite;

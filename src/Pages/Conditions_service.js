import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext';
import BoiteBlanche from '../components/Boite_blanche';

const ConditionsService = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#333333' : 'rgba(166, 116, 55, 0.1)' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{t('profile.termsOfService.title')}</Text>
        <BoiteBlanche>
          {[
            'introduction',
            'modifications',
            'acceptableUse',
            'intellectualProperty',
            'dataCollection',
            'liability',
            'termination',
            'jurisdiction',
            'contact',
          ].map((sectionKey) => (
            <View key={sectionKey} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t(`profile.termsOfService.sections.${sectionKey}`)}
              </Text>
              <Text style={styles.text}>
                {t(`profile.termsOfService.content.${sectionKey}`)}
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

export default ConditionsService;

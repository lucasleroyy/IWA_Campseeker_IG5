import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PageConditions = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Conditions d'utilisation</Text>
      <Text style={styles.text}>
        Ceci est un exemple de conditions d'utilisation. Veuillez lire attentivement ces conditions avant de continuer.
        {"\n\n"}
        1. Vous acceptez de respecter toutes les règles et les politiques de l'application.
        {"\n"}
        2. L'application est fournie "telle quelle" sans garantie de quelque nature que ce soit.
        {"\n"}
        3. En utilisant cette application, vous consentez à nos pratiques de collecte de données.
        {"\n\n"}
        Merci de votre compréhension et bonne utilisation de l'application CampSeeker.
      </Text>

      <Text style={styles.link} onPress={() => navigation.goBack()}>
        Retour à l'inscription
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    color: '#FF6D00',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default PageConditions;

import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import FicheLieu from '../components/Fiche_lieu';

const Page_info_lieu = ({ route }) => {
  const { id } = route.params;  // Récupère l'id du lieu pour charger les détails

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Nom du Lieu </Text>
      <FicheLieu id={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
    paddingBottom: 50,
  },
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
});

export default Page_info_lieu;

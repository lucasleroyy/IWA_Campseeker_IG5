import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Bandeau from '../components/Bandeau';

const Ajout_lieu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text>Ajouter un lieu</Text>
      </ScrollView>
      <Bandeau currentPage="AjouterLieu" onNavigate={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
  },
  scrollContainer: {
    flexGrow: 1,  // Permet à ScrollView de s'étendre en fonction du contenu
    paddingVertical: 70,
  },
});

export default Ajout_lieu;

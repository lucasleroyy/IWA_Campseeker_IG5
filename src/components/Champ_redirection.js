import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChampRedirection = ({ label, targetScreen }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(targetScreen);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.label}>{label}</Text>
      <MaterialIcons name="chevron-right" size={24} color="#597962" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fond blanc
    borderRadius: 20, // Bords arrondis
    height: 50, // Hauteur fixe
    width: '90%', // Largeur fixe (ajustable si nécessaire)
    alignSelf: 'center', // Centre horizontalement
    paddingHorizontal: 15, // Espace autour du contenu
    marginVertical: 10, // Espace en haut et en bas
    justifyContent: 'space-between', // Place le texte à gauche et l'icône à droite
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Ombre pour Android
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Couleur noire pour le texte
  },
});

export default ChampRedirection;

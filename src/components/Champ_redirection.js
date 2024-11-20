import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer l'icône de FontAwesome

const ChampRedirection = ({ label, targetScreen, icon, onPress }) => {
  const navigation = useNavigation();

  const defaultHandlePress = () => {
    navigation.navigate(targetScreen);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress || defaultHandlePress}>
      <View style={styles.labelContainer}>
        {icon && <Icon name={icon} size={20} color="#000" style={styles.icon} />}
        <Text style={styles.label}>{label}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={30} color="#597962" />
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
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Pour aligner l'icône et le texte
  },
  icon: {
    marginRight: 10, // Espace entre l'icône et le texte
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Couleur noire pour le texte
  },
});

export default ChampRedirection;

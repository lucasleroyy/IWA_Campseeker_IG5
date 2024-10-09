import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Obtenir la largeur de l'écran pour répartir équitablement les icônes
const { width } = Dimensions.get('window');

const Bandeau = ({ currentPage, onNavigate }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onNavigate('Search')} style={styles.iconContainer}>
        <MaterialIcons
          name="search"
          size={currentPage === 'Search' ? 50 : 30}  // Agrandir l'icône active
          color={currentPage === 'Search' ? '#597962' : 'white'}  // Vert pour la page active
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('Add')} style={styles.iconContainer}>
        <MaterialIcons
          name="add-circle-outline"
          size={currentPage === 'Add' ? 50 : 30}  // Agrandir l'icône active
          color={currentPage === 'Add' ? '#597962' : 'white'}  // Vert pour la page active
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('Favorites')} style={styles.iconContainer}>
        <MaterialIcons
          name="favorite-outline"
          size={currentPage === 'Favorites' ? 50 : 30}  // Agrandir l'icône active
          color={currentPage === 'Favorites' ? '#597962' : 'white'}  // Vert pour la page active
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('Profile')} style={styles.iconContainer}>
        <MaterialIcons
          name="person-outline"
          size={currentPage === 'Profile' ? 50 : 30}  // Agrandir l'icône active
          color={currentPage === 'Profile' ? '#597962' : 'white'}  // Vert pour la page active
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F2A25C',  // Couleur orange du bandeau
    height: 70,  // Hauteur fixe du bandeau
    width: width,  // Largeur totale de l'écran
    position: 'absolute',
    bottom: 0,  // Toujours en bas de la page
    position: 'absolute',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Bandeau;

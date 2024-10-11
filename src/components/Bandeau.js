import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Obtenir la largeur de l'écran pour répartir équitablement les icônes
const { width } = Dimensions.get('window');

const Bandeau = ({ currentPage, onNavigate }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onNavigate('PageRecherche')} style={styles.iconContainer}>
        <MaterialIcons
          name="search"
          size={currentPage === 'PageRecherche' ? 50 : 30}  // Agrandir l'icône active
          color={currentPage === 'PageRecherche' ? '#597962' : 'white'}  // Vert pour la page active
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('AjouterLieu')} style={styles.iconContainer}>
        <MaterialIcons
          name="add-circle-outline"
          size={currentPage === 'AjouterLieu' ? 50 : 30}  // Agrandir l'icône active
          color={currentPage === 'AjouterLieu' ? '#597962' : 'white'}  // Vert pour la page active
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('PageFavoris')} style={styles.iconContainer}>
        <MaterialIcons
          name="favorite-outline"
          size={currentPage === 'PageFavoris' ? 50 : 30}  // Agrandir l'icône active
          color={currentPage === 'PageFavoris' ? '#597962' : 'white'}  // Vert pour la page active
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('ProfilUser')} style={styles.iconContainer}>
        <MaterialIcons
          name="person-outline"
          size={currentPage === 'ProfilUser' ? 50 : 30}  // Agrandir l'icône active
          color={currentPage === 'ProfilUser' ? '#597962' : 'white'}  // Vert pour la page active
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

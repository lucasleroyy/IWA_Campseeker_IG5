import React from 'react';
import { View, StyleSheet } from 'react-native';

const BoiteBlanche = ({ children }) => {
  return (
    <View style={styles.box}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFFFFF', // Blanc
    padding: 10,
    borderRadius: 10,
    width: '90%', // Largeur fixe à 90% de l'écran pour éviter les chevauchements
    alignSelf: 'center', // Centre horizontalement la boîte
    marginVertical: 10, // Espace en haut et en bas
    borderWidth: 1, // Taille du contour
    borderColor: '#FF6D00', // Couleur orange pour le contour
    flex: 0, 
  },
});

export default BoiteBlanche;

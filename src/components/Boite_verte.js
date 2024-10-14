import React from 'react';
import { View, StyleSheet } from 'react-native';

const BoiteVerte = ({ children }) => {
  return (
    <View style={styles.box}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#597962', // Vert nature
    borderRadius: 10, // Bords arrondis pour un effet plus doux
    width: '90%', // Largeur fixe à 90% de l'écran pour éviter les chevauchements
    alignSelf: 'center', // Centre horizontalement la boîte
  },
});

export default BoiteVerte;

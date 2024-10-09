import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Bouton = ({ label, onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6D00',  // Couleur orange
    borderRadius: 20,  // Bords arrondis
    paddingVertical: 10,
    paddingHorizontal: 50,  // Ajouter un espace de 20 à gauche et à droite
    alignItems: 'center',
    shadowColor: '#000',  // Ombre
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,  // Pour Android
    alignSelf: 'center',  // Centre le bouton dans son conteneur parent
    marginVertical: 20,  // Marge en haut et en bas
  },
  buttonText: {
    color: '#FFF',  // Texte blanc
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Bouton;

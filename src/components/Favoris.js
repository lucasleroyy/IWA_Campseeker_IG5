import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Favoris = () => {
    const [isFavorite, setIsFavorite] = useState(false);
  
    const toggleFavorite = () => {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);
  
      // Afficher une notification selon l'état du favori
      if (newFavoriteState) {
        Alert.alert('Favoris', 'Ajouté aux favoris.');
      } else {
        Alert.alert('Favoris', 'Retiré des favoris.');
      }
    };

  return (
    <TouchableOpacity onPress={toggleFavorite} style={styles.container}>
      <MaterialIcons 
        name={isFavorite ? 'favorite' : 'favorite-border'} 
        size={30} 
        color="#FF6D00" // Orange pour le cœur
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10, // Pour augmenter la zone de clic autour du cœur
  },
});

export default Favoris;

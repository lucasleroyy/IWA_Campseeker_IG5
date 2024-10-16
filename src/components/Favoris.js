// Favoris.js
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Favoris = ({ isFavorite = false, onPress }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      Alert.alert('Favoris', 'Ajouté aux favoris.');
    } else {
      Alert.alert('Favoris', 'Retiré des favoris.');
      if (onPress) onPress();
    }
  };

  return (
    <TouchableOpacity onPress={toggleFavorite} style={styles.container}>
      <MaterialIcons 
        name={favorite ? 'favorite' : 'favorite-border'} 
        size={30} 
        color="#FF6D00"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Favoris;

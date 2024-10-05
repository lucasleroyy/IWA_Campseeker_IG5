import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bandeau from './src/components/Bandeau'; // Assure-toi du bon chemin

const App = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      {currentPage === 'Search' && <Text>Page de Recherche</Text>}
      {currentPage === 'Add' && <Text>Page Ajouter</Text>}
      {currentPage === 'Favorites' && <Text>Mes lieux favoris</Text>}
      {currentPage === 'Profile' && <Text>Page Profil</Text>}

      <Bandeau currentPage={currentPage} onNavigate={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

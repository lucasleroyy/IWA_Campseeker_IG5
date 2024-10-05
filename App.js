import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Bandeau from './src/components/Bandeau.js'; // Assure-toi du bon chemin

const App = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentPage === 'Search' && <Text>Page de Recherche</Text>}
      {currentPage === 'Add' && <Text>Page Ajouter</Text>}
      {currentPage === 'Favorites' && <Text>Page Favoris</Text>}

      <Bandeau currentPage={currentPage} onNavigate={onNavigate} />
    </View>
  );
};

export default App;

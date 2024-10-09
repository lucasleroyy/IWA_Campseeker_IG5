import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bandeau from './src/components/Bandeau'; 
import Champ from './src/components/Champ';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <Champ placeholder="Mot de passe" />
      <Bandeau currentPage={currentPage} onNavigate={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
  },
});

export default App;

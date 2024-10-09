import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Bandeau from './src/components/Bandeau'; 
import Scroll_horizontal from './src/components/Scroll_horizontal';
import Photo from './src/components/Photo';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };

  const photos = [
    <Photo key={1} imageUrl={require('./assets/bivouac.png')} width={300} height={200} />,
    <Photo key={2} imageUrl={require('./assets/bivouac3.png')} width={300} height={200} />,
  ];

  return (
    <View style={styles.container}>
      <Scroll_horizontal items={photos} />
      <Bandeau currentPage={currentPage} onNavigate={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
    marginTop: 50,
  },
});



export default App;

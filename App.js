import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bandeau from './src/components/Bandeau';


const App = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>

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

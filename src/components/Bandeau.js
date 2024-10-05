import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Bandeau = ({ currentPage, onNavigate }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onNavigate('Search')}>
        <MaterialIcons
          name="search"
          size={currentPage === 'Search' ? 35 : 30}
          color={currentPage === 'Search' ? 'green' : 'white'}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onNavigate('Add')}>
        <MaterialIcons
          name="add-circle-outline"
          size={currentPage === 'Add' ? 35 : 30}
          color={currentPage === 'Add' ? 'green' : 'white'}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onNavigate('Favorites')}>
        <MaterialIcons
          name="favorite-outline"
          size={currentPage === 'Favorites' ? 35 : 30}
          color={currentPage === 'Favorites' ? 'green' : 'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFB74D',
    height: 60,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default Bandeau;

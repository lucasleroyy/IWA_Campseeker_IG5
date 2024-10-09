import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Recherche = ({ placeholder, editable = true }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#000" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#000"
        editable={editable}  // Permet de rendre le champ modifiable ou non
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',  
    alignItems: 'center',  
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '95%',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',  // Couleur du texte
  },
});

export default Recherche;

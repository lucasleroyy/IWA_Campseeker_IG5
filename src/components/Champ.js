import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Champ = ({ placeholder, editable = true }) => {
  return (
    <View style={styles.container}>
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
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',  // Couleur du texte
  },
});

export default Champ;

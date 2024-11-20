import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Champ = ({ placeholder, value, onChangeText, editable = true }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}  // Utiliser la prop value
        onChangeText={onChangeText}  // Utiliser la prop onChangeText
        placeholderTextColor="#000"
        editable={editable}
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

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Champ = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
}) => {
  const [inputHeight, setInputHeight] = useState(40); // Hauteur initiale

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { height: inputHeight }]} // Ajuste la hauteur dynamiquement
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#000"
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline} // Active le mode multi-lignes
        onContentSizeChange={(event) => {
          setInputHeight(event.nativeEvent.contentSize.height + 10); // Ajuste la hauteur en fonction du contenu
        }}
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
    paddingVertical: 5,
    fontSize: 16,
    color: '#000', 
  },
});

export default Champ;

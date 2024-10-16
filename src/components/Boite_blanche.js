import React from 'react';
import { View, StyleSheet } from 'react-native';

const BoiteBlanche = ({ children }) => {
  return (
    <View style={styles.box}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    width: '97%', 
    alignSelf: 'center', 
    marginVertical: 10, 
    borderWidth: 1, 
    borderColor: '#FF6D00', 
    flex: 0,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, 
  },
});

export default BoiteBlanche;

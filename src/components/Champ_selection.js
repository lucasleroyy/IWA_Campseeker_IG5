import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Champ_selection = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tag, isSelected ? styles.selectedTag : styles.defaultTag]}
      onPress={onPress}
    >
      <Text style={isSelected ? styles.selectedText : styles.defaultText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  defaultTag: {
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
  },
  selectedTag: {
    backgroundColor: '#F2A25C',
  },
  defaultText: {
    color: '#000',
  },
  selectedText: {
    color: '#FFF',
  },
});

export default Champ_selection;

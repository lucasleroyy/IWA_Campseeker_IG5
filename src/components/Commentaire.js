import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Commentaire = ({ pseudo, note, texte }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pseudo}>{pseudo}</Text>
        <View style={styles.note}>
          {/* Affiche un nombre d'étoiles correspondant à la note */}
          {[...Array(note)].map((_, index) => (
            <MaterialIcons key={index} name="star" size={18} color="#FF6D00" />
          ))}
        </View>
      </View>
      <View style={styles.separator} />
      <Text style={styles.texte}>{texte}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pseudo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#FF6D00',
    marginVertical: 5,
  },
  texte: {
    fontSize: 14,
    color: '#000',
  },
});

export default Commentaire;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import BoiteBlanche from '../components/Boite_blanche';
import Bouton from '../components/Bouton';
import Bandeau from '../components/Bandeau';

const MonComponent = () => {
  return (
    <View style={styles.container}>
      <BoiteBlanche>
        <Bouton label="Bouton Blanc" onClick={() => alert('Bouton dans la boîte blanche cliqué!')} />
      </BoiteBlanche>

      <BoiteVerte>
        <Bouton label="Bouton Vert" onClick={() => alert('Bouton dans la boîte verte cliqué!')} />
      </BoiteVerte>

      <Bandeau currentPage="Search" onNavigate={(page) => console.log('Naviguer vers', page)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0', // Fond gris pour bien voir les composants
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MonComponent;

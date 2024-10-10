import React from 'react';
import { View, StyleSheet } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import BoiteBlanche from '../components/Boite_blanche';
import Bouton from '../components/Bouton';
import Bandeau from '../components/Bandeau';
import ChampRedirection from '../components/Champ_redirection';
import Favoris from '../components/Favoris'; 
import Commentaire from '../components/Commentaire';

const MonComponent = () => {
  return (
    <View style={styles.container}>
      <BoiteBlanche>
        <Bouton label="Bouton Blanc" onClick={() => alert('Bouton dans la boîte blanche cliqué!')} />
      </BoiteBlanche>

      <BoiteVerte>
        <Bouton label="Bouton Vert" onClick={() => alert('Bouton dans la boîte verte cliqué!')} />
      </BoiteVerte>

       {/* Ajout de ChampRedirection pour naviguer vers une autre page */}
       
      <ChampRedirection label="Recherche" targetScreen="PageRecherche" />

      {/* Ajout du composant Favoris pour le tester */}
      <Favoris />

       {/* Ajout de quelques commentaires pour tester le composant Commentaire */}
       <Commentaire pseudo="Utilisateur1" note={5} texte="Commentaire 1 wazzaaaa" />

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

import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import BoiteVerte from './Boite_verte';
import Photo from './Photo';
import Favoris from './Favoris';
import Champ from './Champ';
import Carte from './Carte';
import Bouton from './Bouton';
import Commentaire from './Commentaire';
import ScrollHorizontal from './Scroll_horizontal';

const { width } = Dimensions.get('window');  // Largeur de l'écran pour référence

const Fiche_lieu = () => {
  const photos = [
    <Photo key={1} imageUrl={require('../../assets/bivouac.png')} width={300} height={200} />,
    <Photo key={2} imageUrl={require('../../assets/bivouac3.png')} width={300} height={200} />,
  ];

  const commentaires = [
    <Commentaire key={1} pseudo="Utilisateur1" note={5} texte="Commentaire 1 wazzaaaa" />,
    <Commentaire key={2} pseudo="Utilisateur2" note={3} texte="Commentaire 2 wazzaaaa" />,
    <Commentaire key={3} pseudo="Utilisateur3" note={4} texte="Commentaire 3 wazzaaaa" />,
  ];

  return (
    <View style={styles.container}>
      <BoiteVerte style={styles.boiteVerte}>
        <Favoris />
        <ScrollHorizontal items={photos} />
        <Champ placeholder="Pseudo" editable={false} />
        <Champ placeholder="Adresse" editable={false} />
        <Champ placeholder="Coordonnées GPS" editable={false} />
        <Carte
          style={styles.map}
          initialRegion={{
            latitude: 48.8584,
            longitude: 2.2945,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Text style={styles.texte}>Commentaires : </Text>
        <ScrollHorizontal items={commentaires} containerWidth={width * 0.9} />
        <Bouton label="Ajouter un commentaire" onClick={() => console.log('Ajouter')} />
      </BoiteVerte>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '90%',  
    height: 400,
    alignSelf: 'center',
  },
  texte:{
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
});

export default Fiche_lieu;

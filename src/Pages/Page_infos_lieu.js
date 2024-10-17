import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Photo from '../components/Photo';
import Favoris from '../components/Favoris';
import Champ from '../components/Champ';
import Carte from '../components/Carte';
import Bouton from '../components/Bouton';
import Commentaire from '../components/Commentaire';
import ScrollHorizontal from '../components/Scroll_horizontal';

const Page_info_lieu = ({ route }) => {
  const { width } = Dimensions.get('window');
  const { id } = route.params;  // Récupère l'id du lieu pour charger les détails
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.titre}>Nom du Lieu </Text>
      <BoiteVerte style={styles.boiteVerte}>
        <Favoris />
        <ScrollHorizontal items={photos} />
        <Champ placeholder="Pseudo" editable={false} />
        <Champ placeholder="Adresse" editable={false} />
        <Champ placeholder="Coordonnées GPS" editable={false} />
        <Carte ville='Montpellier' style={styles.map} />
        <Text style={styles.texte}>Commentaires : </Text>
        <ScrollHorizontal items={commentaires} containerWidth={width * 0.9} />
        <Bouton label="Ajouter un commentaire" onClick={() => console.log('Ajouter')} />
      </BoiteVerte>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: '15%',
  },
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
});

export default Page_info_lieu;

import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Champ from '../components/Champ';
import Bouton from '../components/Bouton';
import ScrollHorizontal from '../components/Scroll_horizontal';
import Commentaire from '../components/Commentaire';
import Photo from '../components/Photo';
import Carte from '../components/Carte';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DetailMesLieux = ({ route }) => {
  const { id, removeLocation } = route.params;  // Récupère l'id du lieu et la fonction removeLocation
  const navigation = useNavigation();

  const photos = [
    <Photo key={1} imageUrl={require('../../assets/bivouac.png')} width={300} height={200} />,
    <Photo key={2} imageUrl={require('../../assets/bivouac3.png')} width={300} height={200} />,
  ];

  const commentaires = [
    <Commentaire key={1} pseudo="Utilisateur1" note={5} texte="Commentaire 1 wazzaaaa" />,
    <Commentaire key={2} pseudo="Utilisateur2" note={3} texte="Commentaire 2 wazzaaaa" />,
    <Commentaire key={3} pseudo="Utilisateur3" note={4} texte="Commentaire 3 wazzaaaa" />,
  ];

  const handleDelete = () => {
    if (removeLocation) {
      removeLocation(id); // Supprime l'élément de la liste
      navigation.goBack(); // Retourne à la page précédente
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>Nom du lieu </Text>
        <BoiteVerte>
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
          <Text style={styles.sectionTitle}>ÉQUIPEMENTS :</Text>
          <Champ placeholder="Wifi" editable={false} />
          <Champ placeholder="Sanitaire" editable={false} />
          <Text style={styles.sectionTitle}>COMMENTAIRES :</Text>
          <ScrollHorizontal items={commentaires} containerWidth={width * 0.9} />
          <Bouton label="Supprimer le lieu" onClick={handleDelete} />
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
    paddingVertical: '5%',
  },
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F25C05',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: '5%',
    marginVertical: 10,
  },
});

export default DetailMesLieux;

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Bandeau from '../components/Bandeau';
import Photo from '../components/Photo';
import Champ from '../components/Champ';
import Scroll_horizontal from '../components/Scroll_horizontal';
import Bouton from '../components/Bouton';
import Carte from '../components/Carte';
import Recherche from '../components/Recherche';

const Test = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };

  const photos = [
    <Photo key={1} imageUrl={require('../../assets/bivouac.png')} width={300} height={200} />,
    <Photo key={2} imageUrl={require('../../assets/bivouac3.png')} width={300} height={200} />,
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Carte
          style={styles.map}
          initialRegion={{
            latitude: 48.8584, // Latitude pour Paris
            longitude: 2.2945, // Longitude pour Paris
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Scroll_horizontal items={photos} />
        <Champ placeholder="Email" editable={true} />
        <Bouton label="Ceci est un bouton" onClick={() => console.log('Ajouter')} />
        <Recherche placeholder="Rechercher un lieu" editable={true} />
      </ScrollView>

      {/* Bandeau en bas de l'écran, hors de la ScrollView */}
      
      <Bandeau currentPage={currentPage} onNavigate={onNavigate}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
    marginTop: 50,
  },
  scrollContainer: {
    flexGrow: 1,  // Permet à ScrollView de s'étendre en fonction du contenu
    paddingVertical: 70,
  },
  map: {
    width: '90%',  // Assure que la carte est large mais laisse un peu d'espace sur les côtés
    height: 400,  // Ajuste la hauteur selon ce qui convient
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Test;

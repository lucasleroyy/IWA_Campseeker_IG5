import React, { useState } from 'react';
import { View,Text, StyleSheet, ScrollView } from 'react-native';
import Bandeau from '../components/Bandeau';
import Photo from '../components/Photo';
import Champ from '../components/Champ';
import Scroll_horizontal from '../components/Scroll_horizontal';
import Bouton from '../components/Bouton';
import Carte from '../components/Carte';
import Recherche from '../components/Recherche';
import Champ_selection from '../components/Champ_selection';
import ChampRedirection from '../components/Champ_redirection';
import Favoris from '../components/Favoris'; 
import Commentaire from '../components/Commentaire';
import BoiteVerte from '../components/Boite_verte';
import BoiteBlanche from '../components/Boite_blanche';

const Test = () => {
  const [currentPage, setCurrentPage] = useState('Search');
  const [selectedTags, setSelectedTags] = useState([]);
  

  const onNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleTagPress = (label) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(label)) {
        // Si le tag est déjà sélectionné, on le retire de la liste
        return prevSelectedTags.filter((tag) => tag !== label);
      } else {
        // Sinon, on l'ajoute à la liste
        return [...prevSelectedTags, label];
      }
    });
  };

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
        <BoiteBlanche>
          <Bouton label="Bouton Blanc" onClick={() => alert('Bouton dans la boîte blanche cliqué!')} />
          <Photo imageUrl={require('../../assets/bivouac3.png')} width={300} height={200} />
        </BoiteBlanche>

        <BoiteVerte>
          <Bouton label="Bouton Vert" onClick={() => alert('Bouton dans la boîte verte cliqué!')} />
        </BoiteVerte>
        {/* Ajout de ChampRedirection pour naviguer vers une autre page */}
        <ChampRedirection label="Recherche" targetScreen="PageRecherche" />
        <Favoris />
        {/* Ajout de quelques commentaires pour tester le composant Commentaire */}
        <Commentaire pseudo="Utilisateur1" note={5} texte="Commentaire 1 wazzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
        <View style={styles.Equipementcontainer}>
            <Champ_selection 
                label="Abrité" 
                isSelected={selectedTags.includes('Abrité')} 
                onPress={() => handleTagPress('Abrité')} />
            <Champ_selection 
                label="Sanitaire"
                isSelected={selectedTags.includes('Sanitaire')}
                onPress={() => handleTagPress('Sanitaire')} />
            <Champ_selection 
                label="Wifi" 
                isSelected={selectedTags.includes('Wifi')}
                onPress={() => handleTagPress('Wifi')} />
            <Champ_selection
                label="Parking"
                isSelected={selectedTags.includes('Parking')}
                onPress={() => handleTagPress('Parking')} />
            <Champ_selection 
                label="Électricité"
                isSelected={selectedTags.includes('Électricité')}
                onPress={() => handleTagPress('Électricité')} />
            <Text>Tags sélectionnés: {selectedTags.join(', ')}</Text>
        </View>


        <Scroll_horizontal items={photos} />
        <Scroll_horizontal items={commentaires} />
        <Champ placeholder="Email" editable={true} />
        <Bouton label="Ceci est un bouton" onClick={() => console.log('Ajouter')} />
        <Recherche placeholder="Rechercher un lieu" editable={true} />
        {/*<Carte
                    style={styles.map}
                    initialRegion={{
                        latitude: 48.8584, // Latitude pour Paris
                        longitude: 2.2945, // Longitude pour Paris
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                */}
      </ScrollView>
      
      <Bandeau currentPage={currentPage} onNavigate={onNavigate}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
  Equipementcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 10,
  },
});

export default Test;

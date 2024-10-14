import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Bandeau from '../components/Bandeau';
import BoiteVerte from '../components/Boite_verte';
import Champ from '../components/Champ';
import Bouton from '../components/Bouton';
import ChampSelection from '../components/Champ_selection';
import Photo from '../components/Photo';
import ScrollHorizontal from '../components/Scroll_horizontal';

const Ajout_lieu = ({ navigation }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [photos, setPhotos] = useState([]);  // État pour stocker les URIs des photos

  const handleTagPress = (label) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(label)) {
        return prevSelectedTags.filter((tag) => tag !== label);
      } else {
        return [...prevSelectedTags, label];
      }
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission d'accès à la galerie refusée !");
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
  
      if (imageUri) {
        setPhotos((prevPhotos) => [...prevPhotos, imageUri]);
      } else {
        console.warn("Aucune URI d'image valide n'a été trouvée");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>
          Proposer votre lieu de <Text style={{ color: '#FF6D00' }}>bivouac</Text> !
        </Text>
        <BoiteVerte>
          <View style={styles.photoContainer}>
            {/* Utilisation de Scroll_horizontal */}
            <ScrollHorizontal items={photos.map((uri, index) => (
              <Photo key={index} imageUrl={{ uri }} width={300} height={200} />
            ))} />
            <Bouton label="+" onClick={pickImage} />
          </View>

          <Champ label="Nom du lieu" placeholder="Nom du lieu" />
          <Champ label="Adresse" placeholder="Adresse" />
          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <Champ label="Code postal" placeholder="Code postal" />
            </View>
            <View style={styles.halfWidth}>
              <Champ label="Ville" placeholder="Ville" />
            </View>
          </View>
          <Champ label="Coordonnées GPS" placeholder="Coordonnées GPS" />
          <Champ label="Description" placeholder="Description" />
          <Text> Équipements :</Text>
          <View style={styles.Equipementcontainer}>
            <ChampSelection
                label="Abrité" 
                isSelected={selectedTags.includes('Abrité')} 
                onPress={() => handleTagPress('Abrité')} />
            <ChampSelection 
                label="Sanitaire"
                isSelected={selectedTags.includes('Sanitaire')}
                onPress={() => handleTagPress('Sanitaire')} />
            <ChampSelection 
                label="Wifi"                   
                isSelected={selectedTags.includes('Wifi')}
                onPress={() => handleTagPress('Wifi')} />
            <ChampSelection
                label="Parking"
                isSelected={selectedTags.includes('Parking')}
                onPress={() => handleTagPress('Parking')} />
            <ChampSelection
                label="Électricité"
                isSelected={selectedTags.includes('Électricité')}
                onPress={() => handleTagPress('Électricité')} />
          </View>
          <Bouton label="Ajouter" onClick={() => alert('Lieu ajouté!')} />
        </BoiteVerte>
      </ScrollView>
      <Bandeau currentPage="AjouterLieu" onNavigate={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 100,
  },
  Equipementcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '50%',
  },
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Ajout_lieu;

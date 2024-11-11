import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Champ from '../components/Champ';
import Bouton from '../components/Bouton';
import ScrollHorizontal from '../components/Scroll_horizontal';
import ChampSelection from '../components/Champ_selection';
import Photo from '../components/Photo';
import * as ImagePicker from 'expo-image-picker';

const ModifierMonLieu = ({ route, navigation }) => {
  const { id, locationName, address, gpsCoordinates, photos: initialPhotos, selectedTags: initialTags } = route.params;

  const [newLocationName, setNewLocationName] = useState(locationName || '');
  const [newAddress, setNewAddress] = useState(address || '');
  const [newGpsCoordinates, setNewGpsCoordinates] = useState(gpsCoordinates || '');
  const [photos, setPhotos] = useState(initialPhotos || []);
  const [selectedTags, setSelectedTags] = useState(initialTags || []);

  const handleSaveChanges = () => {
    // Code pour sauvegarder les modifications
    navigation.goBack();
  };

  const handleCancelChanges = () => {
    navigation.goBack();
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
      setPhotos((prevPhotos) => [...prevPhotos, imageUri]);
    }
  };

  const deleteImage = (uri) => {
    Alert.alert("Supprimer la photo", "Voulez-vous vraiment supprimer cette photo ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo !== uri));
        },
      },
    ]);
  };

  const handleTagPress = (label) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(label) ? prevTags.filter((tag) => tag !== label) : [...prevTags, label]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BoiteVerte>
          <Champ placeholder="Nom du lieu" value={newLocationName} onChangeText={setNewLocationName} />
          <Champ placeholder="Adresse" value={newAddress} onChangeText={setNewAddress} />
          <Champ placeholder="Coordonnées GPS" value={newGpsCoordinates} onChangeText={setNewGpsCoordinates} />
          
          <View style={styles.photoContainer}>
            <ScrollHorizontal items={photos.map((uri, index) => (
              <TouchableOpacity key={index} onLongPress={() => deleteImage(uri)}>
                <Photo imageUrl={typeof uri === 'string' ? { uri } : uri} width={300} height={200} />
              </TouchableOpacity>
            ))} />
            <Bouton label="+" onClick={pickImage} />
          </View>

          <Text style={styles.sectionTitle}>ÉQUIPEMENTS :</Text>
          <View style={styles.equipementContainer}>
            {["Abrité", "Sanitaire", "Wifi", "Parking", "Électricité"].map((label) => (
              <ChampSelection key={label} label={label} isSelected={selectedTags.includes(label)} onPress={() => handleTagPress(label)} />
            ))}
          </View>
          
          <View style={styles.buttonContainer}>
            <Bouton label="Enregistrer" onClick={handleSaveChanges} buttonStyle={styles.equalButton} />
            <Bouton label="Annuler" onClick={handleCancelChanges} buttonStyle={styles.equalButton} />
          </View>
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
  equipementContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginLeft: '5%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: '5%',
    marginBottom: 10,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  equalButton: {
    flex: 1,
    marginHorizontal: 5, // Spacing between buttons
  },
});

export default ModifierMonLieu;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Photo from '../components/Photo';
import ScrollHorizontal from '../components/Scroll_horizontal';
import Champ from '../components/Champ';
import ChampSelection from '../components/Champ_selection';
import Carte from '../components/Carte';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const DetailMesLieux = ({ route }) => {
  const { id, removeLocation } = route.params;
  const navigation = useNavigation();

  // State management
  const [isModalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState([
    require('../../assets/bivouac.png'),
    require('../../assets/bivouac3.png'),
  ]);
  const [locationName, setLocationName] = useState('Lac des Sapins');
  const [address, setAddress] = useState('123 Rue des Lacs');
  const [gpsCoordinates, setGpsCoordinates] = useState('48.8584, 2.2945');
  const [pseudo, setPseudo] = useState('LucalLL');
  const [selectedTags, setSelectedTags] = useState(['Abrité', 'Sanitaire', 'Wifi']);

  const handleDelete = () => {
    Alert.alert("Lieu supprimé", "Le lieu a été supprimé.", [
      {
        text: "OK",
        onPress: () => {
          if (removeLocation) {
            removeLocation(id);
            navigation.goBack();
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate('ModifierMonLieu', {
      id,
      locationName,
      address,
      gpsCoordinates,
      photos,
      selectedTags,
    });
  };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>{locationName}</Text>
        <BoiteVerte>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleEdit} style={styles.icon}>
              <MaterialIcons name="edit" size={28} color="#F25C05" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.icon}>
              <MaterialIcons name="delete" size={28} color="#F25C05" />
            </TouchableOpacity>
          </View>

          <ScrollHorizontal items={photos.map((photo, index) => <Photo key={index} imageUrl={photo} width={300} height={200} />)} />
          <Champ placeholder={pseudo} value={pseudo} editable={false} />
          <Champ placeholder={address} value={address} editable={false} />
          <Champ placeholder={gpsCoordinates} value={gpsCoordinates} editable={false} />
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
          <View style={styles.equipementContainer}>
            {selectedTags.map((tag) => (
              <ChampSelection key={tag} label={tag} isSelected={true} />
            ))}
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
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F25C05',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -10,
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: '5%',
    marginBottom: 10,
  },
  equipementContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginLeft: '5%',
  },
  map: {
    width: '90%',
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default DetailMesLieux;

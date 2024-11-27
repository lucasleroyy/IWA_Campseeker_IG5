import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import BoiteVerte from "../components/Boite_verte";
import Champ from "../components/Champ";
import Bouton from "../components/Bouton";
import ChampSelection from "../components/Champ_selection";
import Photo from "../components/Photo";
import { fetchEquipments } from "../redux/actions/equipmentActions";
import {
  createLocation,
  linkEquipmentsToLocation,
} from "../redux/actions/locationsActions";
import { addPhotoToLocation } from "../redux/actions/photosActions";
import Bandeau from "../components/Bandeau";

const Ajout_lieu = ({ navigation }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationZip, setLocationZip] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [locationLatitude, setLocationLatitude] = useState("");
  const [locationLongitude, setLocationLongitude] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const apiUrl = useSelector((state) => state.config.apiUrl);
  const { equipments, loading, error } = useSelector(
    (state) => state.equipments
  );

  const [localEquipments, setLocalEquipments] = useState([]);

  useEffect(() => {
    if (!equipments.length) {
      dispatch(fetchEquipments());
    } else {
      setLocalEquipments(equipments);
    }
  }, [equipments, dispatch]);

  const handleTagPress = (equipmentId) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(equipmentId)
        ? prevSelectedTags.filter((tag) => tag !== equipmentId)
        : [...prevSelectedTags, equipmentId]
    );
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Veuillez autoriser l'accès à la galerie."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image :", error);
    }
  };

  const deleteImage = () => {
    Alert.alert("Supprimer la photo", "Voulez-vous vraiment supprimer cette photo ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Supprimer", style: "destructive", onPress: () => setPhoto(null) },
    ]);
  };

  const handleSubmit = async () => {
    if (
      !locationName ||
      !locationAddress ||
      !locationCity ||
      !locationZip ||
      !locationDescription ||
      !locationLatitude ||
      !locationLongitude
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (selectedTags.length === 0) {
      Alert.alert("Erreur", "Veuillez sélectionner au moins un équipement.");
      return;
    }

    if (!photo) {
      Alert.alert("Erreur", "Veuillez ajouter une photo.");
      return;
    }

    const locationData = {
      name: locationName,
      adresse: locationAddress,
      ville: locationCity,
      codePostal: locationZip,
      description: locationDescription,
      userId,
      latitude: locationLatitude,
      longitude: locationLongitude,
    };

    try {
      const response = await dispatch(createLocation(locationData)).unwrap();
      const locationId = response.locationId;

      await dispatch(
        linkEquipmentsToLocation({ locationId, equipmentIds: selectedTags })
      ).unwrap();

      const formData = new FormData();
      formData.append("photo", {
        uri: photo,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      await dispatch(addPhotoToLocation({ locationId, formData })).unwrap();

      Alert.alert("Succès", "Lieu ajouté avec succès !");
      setLocationName("");
      setLocationAddress("");
      setLocationCity("");
      setLocationZip("");
      setLocationDescription("");
      setLocationLatitude("");
      setLocationLongitude("");
      setPhoto(null);
      setSelectedTags([]);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      Alert.alert("Erreur", error.message || "Impossible d'ajouter le lieu.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>
          Proposer votre lieu de{" "}
          <Text style={{ color: "#F25C05" }}>bivouac</Text> !
        </Text>
        <BoiteVerte>
          <View style={styles.photoContainer}>
            {photo ? (
              <TouchableOpacity onLongPress={deleteImage}>
                <Photo imageUrl={{ uri: photo }} width={300} height={200} />
              </TouchableOpacity>
            ) : (
              <Bouton label="Ajouter une photo" onClick={pickImage} />
            )}
          </View>

          <Champ
            label="Nom du lieu"
            placeholder="Nom du lieu"
            value={locationName}
            onChangeText={setLocationName}
          />
          <Champ
            label="Adresse"
            placeholder="Adresse"
            value={locationAddress}
            onChangeText={setLocationAddress}
          />
          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <Champ
                label="Code postal"
                placeholder="Code postal"
                value={locationZip}
                onChangeText={setLocationZip}
              />
            </View>
            <View style={styles.halfWidth}>
              <Champ
                label="Ville"
                placeholder="Ville"
                value={locationCity}
                onChangeText={setLocationCity}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <Champ
                label="Latitude"
                placeholder="Latitude"
                value={locationLatitude}
                onChangeText={setLocationLatitude}
              />
            </View>
            <View style={styles.halfWidth}>
              <Champ
                label="Longitude"
                placeholder="Longitude"
                value={locationLongitude}
                onChangeText={setLocationLongitude}
              />
            </View>
          </View>
          <Champ
            label="Description"
            placeholder="Description"
            value={locationDescription}
            onChangeText={setLocationDescription}
          />

          <Text style={styles.sectionTitle}>ÉQUIPEMENTS :</Text>
          {loading ? (
            <Text>Chargement des équipements...</Text>
          ) : error ? (
            <Text>Erreur : {error}</Text>
          ) : (
            <View style={styles.Equipementcontainer}>
              {localEquipments.map((equipment) => (
                <ChampSelection
                  key={equipment.equipmentId}
                  label={equipment.name}
                  isSelected={selectedTags.includes(equipment.equipmentId)}
                  onPress={() => handleTagPress(equipment.equipmentId)}
                />
              ))}
            </View>
          )}
          <Bouton label="Ajouter" onClick={handleSubmit} />
        </BoiteVerte>
      </ScrollView>
      <Bandeau currentPage="AjouterLieu" onNavigate={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: "15%",
    alignItems: "center",
  },
  Equipementcontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "50%",
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  photoContainer: {
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: "5%",
    marginVertical: 10,
  },
});

export default Ajout_lieu;

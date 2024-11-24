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
import Bandeau from "../components/Bandeau";
import BoiteVerte from "../components/Boite_verte";
import Champ from "../components/Champ";
import Bouton from "../components/Bouton";
import ChampSelection from "../components/Champ_selection";
import Photo from "../components/Photo";
import { fetchEquipments } from "../redux/actions/equipmentActions";
import {
  createLocation,
  linkEquipmentToLocation,
} from "../redux/actions/locationsActions";
import { addPhotoToLocation } from "../redux/actions/photosActions";

const Ajout_lieu = ({ navigation }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [photo, setPhoto] = useState(null); // Stocke une seule photo
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
  const equipments = useSelector((state) => state.equipments.equipments);

  useEffect(() => {
    dispatch(fetchEquipments());
  }, [dispatch]);

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
      setPhoto(result.assets[0].uri); // Stocke l'URI de la photo
    } else {
      console.warn("Aucune URI d'image valide trouvée.");
    }
  };

  const deleteImage = () => {
    Alert.alert(
      "Supprimer la photo",
      "Voulez-vous vraiment supprimer cette photo ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setPhoto(null); // Supprime la photo
          },
        },
      ]
    );
  };

  const handleSubmit = async () => {
    console.log("Soumission du formulaire...");

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
      userId, // ID de l'utilisateur connecté
      latitude: locationLatitude,
      longitude: locationLongitude,
    };

    console.log("Données du lieu à créer :", locationData);

    try {
      const response = await dispatch(createLocation(locationData));
      console.log("Réponse de création du lieu :", response);

      if (response.meta.requestStatus !== "fulfilled") {
        throw new Error("Erreur lors de la création du lieu.");
      }

      const locationId = response.payload.locationId;
      console.log("Lieu créé avec ID :", locationId);

      // Ajout des équipements
      const equipmentPromises = selectedTags.map((tag) => {
        const equipment = equipments.find((e) => e.name === tag);
        if (equipment) {
          console.log("Ajout de l'équipement :", equipment);
          return dispatch(
            linkEquipmentToLocation({
              locationId,
              equipmentId: equipment.equipmentId,
            })
          );
        }
      });
      await Promise.all(equipmentPromises);

      // Ajout de la photo
      const formData = new FormData();
      formData.append("photo", {
        uri: photo,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      await dispatch(addPhotoToLocation({ locationId, formData }));

      Alert.alert("Succès", "Lieu ajouté avec succès !");
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
          <View style={styles.Equipementcontainer}>
            <ChampSelection
              label="Abrité"
              isSelected={selectedTags.includes("Abrité")}
              onPress={() => handleTagPress("Abrité")}
            />
            <ChampSelection
              label="Sanitaire"
              isSelected={selectedTags.includes("Sanitaire")}
              onPress={() => handleTagPress("Sanitaire")}
            />
            <ChampSelection
              label="Wifi"
              isSelected={selectedTags.includes("Wifi")}
              onPress={() => handleTagPress("Wifi")}
            />
            <ChampSelection
              label="Parking"
              isSelected={selectedTags.includes("Parking")}
              onPress={() => handleTagPress("Parking")}
            />
            <ChampSelection
              label="Électricité"
              isSelected={selectedTags.includes("Électricité")}
              onPress={() => handleTagPress("Électricité")}
            />
          </View>
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

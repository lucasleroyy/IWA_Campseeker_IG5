import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationById, deleteLocation } from "../redux/actions/locationsActions";
import BoiteVerte from "../components/Boite_verte";
import Photo from "../components/Photo";
import ScrollHorizontal from "../components/Scroll_horizontal";
import Champ from "../components/Champ";
import ChampSelection from "../components/Champ_selection";
import Carte from "../components/Carte";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DetailMesLieux = ({ route }) => {
  const { id } = route.params; // Récupération des paramètres de navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Récupération des données depuis le store
  const { locationDetails, loading, error } = useSelector(
    (state) => state.locations
  );
  const apiUrl = useSelector((state) => state.config.apiUrl);

  useEffect(() => {
    // Charger les détails du lieu au montage
    if (id) {
      dispatch(fetchLocationById(id));
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer ce lieu ? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            dispatch(deleteLocation(id))
              .unwrap()
              .then(() => {
                Alert.alert("Succès", "Le lieu a été supprimé avec succès.");
                navigation.goBack(); // Retour à la page précédente
              })
              .catch((error) => {
                console.error("Erreur lors de la suppression :", error);
                Alert.alert(
                  "Erreur",
                  "Impossible de supprimer le lieu. Veuillez réessayer plus tard."
                );
              });
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate("ModifierMonLieu", { id });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des détails du lieu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  if (!locationDetails) {
    return (
      <View style={styles.container}>
        <Text>Lieu introuvable.</Text>
      </View>
    );
  }

  // Données du lieu
  const {
    name,
    adresse,
    latitude,
    longitude,
    photo,
    equipments = [],
    ville,
    codePostal,
  } = locationDetails;

  const imageUrl = photo?.photoId
    ? `${apiUrl}/photos/get/${photo.photoId}`
    : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>{name}</Text>
        <BoiteVerte>
          <View style={styles.iconContainer}>
            {/*<TouchableOpacity onPress={handleEdit} style={styles.icon}>
              <MaterialIcons name="edit" size={28} color="#F25C05" />
            </TouchableOpacity>
            */}
            <TouchableOpacity onPress={handleDelete} style={styles.icon}>
              <MaterialIcons name="delete" size={28} color="#F25C05" />
            </TouchableOpacity>
          </View>

          {imageUrl && (
            <Photo imageUrl={imageUrl} width="100%" height={200} />
          )}
          <Champ placeholder={adresse} value={adresse} editable={false} />
          <Champ placeholder={ville} value={ville} editable={false} />
          <Champ
            placeholder="Coordonnées GPS"
            value={`${latitude}, ${longitude}`}
            editable={false}
          />
          <Carte
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <Text style={styles.sectionTitle}>ÉQUIPEMENTS :</Text>
          <View style={styles.equipementContainer}>
            {equipments.length > 0 ? (
              equipments.map((equipment) => (
                <ChampSelection
                  key={equipment.equipmentId}
                  label={equipment.name}
                  isSelected={true}
                />
              ))
            ) : (
              <Text style={styles.noEquipmentsText}>Aucun équipement</Text>
            )}
          </View>
        </BoiteVerte>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: "5%",
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#F25C05",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: -10,
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: "5%",
    marginBottom: 10,
  },
  equipementContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginLeft: "5%",
  },
  map: {
    width: "90%",
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  noEquipmentsText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

export default DetailMesLieux;

import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocationById } from "../redux/actions/locationsActions";
import BoiteVerte from "../components/Boite_verte";
import Photo from "../components/Photo";
import Favoris from "../components/Favoris";
import Champ from "../components/Champ";
import Carte from "../components/Carte";
import Bouton from "../components/Bouton";
import Commentaire from "../components/Commentaire";
import { addFavorite } from "../redux/actions/favorisActions";
import Champ_selection from "../components/Champ_selection";
import { MaterialIcons } from "@expo/vector-icons";

const Page_info_lieu = ({ route }) => {
  const { width } = Dimensions.get("window");
  const { id } = route.params; // Récupère l'id du lieu pour charger les détails
  const dispatch = useDispatch();

  // Sélecteurs pour accéder aux détails du lieu et à l'état de chargement
  const { locationDetails, loading, error } = useSelector(
    (state) => state.locations
  );

  const apiUrl = useSelector((state) => state.config.apiUrl); // Récupère l'URL de l'API

  // Récupération des données à l'ouverture de la page
  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
    }
  }, [id, dispatch]);

  // Gestion du chargement et des erreurs
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des détails...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erreur : {error}</Text>
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

  // Données récupérées
  const { name, adresse, photo, equipments } = locationDetails;

  // Construction de l'URL de la photo
  const imageUrl = photo?.photoId
    ? `${apiUrl}/photos/get/${photo.photoId}` // Construit une URL valide
    : null;

  const handleReportLieu = () => {
    Alert.alert(
      "Signaler ce lieu",
      "Êtes-vous sûr de vouloir signaler ce lieu ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Oui", onPress: () => console.log("Lieu signalé") },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>{name}</Text>
        <BoiteVerte style={styles.boiteVerte}>
          <View style={styles.headerContainer}>
            <Favoris locationId={id} apiUrl={apiUrl} />

            <TouchableOpacity
              onPress={handleReportLieu}
              style={styles.reportIcon}
            >
              <MaterialIcons name="report" size={30} color="#F25C05" />
            </TouchableOpacity>
          </View>

          {/* Vue pour aligner la photo et les champs */}
          <View style={styles.photoContainer}>
            {imageUrl && (
              <Photo imageUrl={imageUrl} width="100%" height={200} />
            )}
          </View>
          <Champ
            placeholder={`${adresse}, ${locationDetails.ville} ${locationDetails.codePostal}`}
            editable={false}
          />

          <Carte
            ville={`${adresse}, ${locationDetails.ville}`}
            style={styles.map}
          />
          <Text style={styles.sectionTitle}>ÉQUIPEMENTS :</Text>
          <View style={styles.Equipementcontainer}>
            {equipments.map((equipment) => (
              <Champ_selection
                key={equipment.equipmentId}
                label={equipment.name}
                isSelected={true}
              />
            ))}
          </View>
          {/* <Text style={styles.sectionTitle}>COMMENTAIRES :</Text>
          <ScrollHorizontal items={commentaires} containerWidth={width * 0.9} />
          <Bouton
            label="Ajouter un commentaire"
            onClick={() => console.log("Ajouter")}
          /> */}
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
    alignItems: "center",
    paddingVertical: "15%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: -15,
  },
  photoContainer: {
    width: "90%", // Largeur du conteneur pour s'adapter à l'écran
    alignSelf: "center", // Centrer le conteneur horizontalement
    marginBottom: 10,
  },
  reportIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "90%",
    height: 200,
    marginVertical: 10,
    alignSelf: "center",
  },
  Equipementcontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: "5%",
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
});

export default Page_info_lieu;

import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocationById } from "../redux/actions/locationsActions";
import { reportFlag } from "../redux/actions/flagsActions";
import BoiteVerte from "../components/Boite_verte";
import Photo from "../components/Photo";
import Favoris from "../components/Favoris";
import Champ from "../components/Champ";
import Carte from "../components/Carte";
import Champ_selection from "../components/Champ_selection";
import { MaterialIcons } from "@expo/vector-icons";
import Scroll_horizontal from "../components/Scroll_horizontal";
import Commentaire from "../components/Commentaire";
import { fetchCommentsByLocationId } from "../redux/actions/commentsActions";
import { fetchUserById } from "../redux/actions/userActions";
import Bouton from "../components/Bouton";

const Page_info_lieu = ({ route }) => {
  const { width } = Dimensions.get("window");
  const { id } = route.params; // ID du lieu pour charger les détails
  const dispatch = useDispatch();

  const { locationDetails, loading, error } = useSelector(
    (state) => state.locations
  );
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const apiUrl = useSelector((state) => state.config.apiUrl); // URL de l'API
  const { comments, loading: commentsLoading } = useSelector(
    (state) => state.comments
  );
  const users = useSelector((state) => state.user.userDetails);

  const [ownerName, setOwnerName] = useState(""); // État pour stocker le nom complet du propriétaire

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
      dispatch(fetchCommentsByLocationId(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (locationDetails?.userId) {
      const locationOwnerId = locationDetails.userId;

      // Vérifier si les informations sont déjà disponibles dans le store
      if (users[locationOwnerId]) {
        const { firstName, lastName } = users[locationOwnerId];
        setOwnerName(`${firstName} ${lastName}`);
      } else {
        // Sinon, récupérer les informations de l'utilisateur
        dispatch(fetchUserById(locationOwnerId)).then((response) => {
          if (response.payload) {
            const { firstName, lastName } = response.payload;
            setOwnerName(`${firstName} ${lastName}`);
          }
        });
      }
    }
  }, [locationDetails, users, dispatch]);

  const handleReportLieu = () => {
    if (!userId) {
      Alert.alert("Erreur", "Vous devez être connecté pour signaler un lieu.");
      return;
    }
    setModalVisible(true); // Affiche le modal
  };

  const submitFlag = () => {
    if (!reason.trim()) {
      Alert.alert(
        "Erreur",
        "Veuillez saisir une raison pour signaler ce lieu."
      );
      return;
    }

    dispatch(
      reportFlag({
        userId,
        locationId: id,
        reason,
      })
    )
      .then(() => {
        Alert.alert("Succès", "Lieu signalé avec succès.");
        setModalVisible(false);
        setReason(""); // Réinitialise la raison
      })
      .catch((error) => {
        console.error("Erreur lors du signalement :", error);
        Alert.alert("Erreur", "Impossible de signaler le lieu.");
      });
  };

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

  const { name, adresse, photo, equipments } = locationDetails;

  const imageUrl = photo?.photoId
    ? `${apiUrl}/photos/get/${photo.photoId}`
    : null;

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
          <View style={styles.photoContainer}>
            {imageUrl && (
              <Photo imageUrl={imageUrl} width="100%" height={200} />
            )}
          </View>


          {/* Affichage du nom complet du propriétaire */}
          {ownerName && (
            <Text style={styles.ownerText}>Propriétaire : {ownerName}</Text>
          )}

          {(adresse && locationDetails.ville && locationDetails.codePostal) && (
            <Text style={styles.ownerText}>Adresse : {`${adresse}, ${locationDetails.ville}, ${locationDetails.codePostal}`}</Text>
          )}


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
          <Text style={styles.sectionTitle}>COMMENTAIRES :</Text>
          {commentsLoading ? (
            <Text>Chargement des commentaires...</Text>
          ) : (
            <>
              <Scroll_horizontal
                items={comments.map((comment) => {
                  const user = users?.[comment.userId];
                  const userName = user
                    ? `${user.firstName} ${user.lastName}`.trim()
                    : "Utilisateur inconnu";

                  return (
                    <Commentaire
                      key={comment.commentId}
                      pseudo={userName || "Utilisateur inconnu"}
                      note={comment.rating || 0}
                      texte={comment.commentText || "Pas de texte"}
                    />
                  );
                })}
              />
            </>
          )}
          <Bouton label="Ajouter un commentaire"  onClick={alert}/>
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
    paddingVertical: 20,
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
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  reportIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "90%",
    height: 400,
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
    marginTop: 10,
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  ownerText: {
    fontSize: 18,
    marginHorizontal: "5%",
    marginTop: 10,
  },
});

export default Page_info_lieu;

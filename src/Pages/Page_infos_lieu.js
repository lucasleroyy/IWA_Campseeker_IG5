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
import Carte from "../components/Carte";
import Champ_selection from "../components/Champ_selection";
import { MaterialIcons } from "@expo/vector-icons";
import Scroll_horizontal from "../components/Scroll_horizontal";
import Commentaire from "../components/Commentaire";
import { fetchCommentsByLocationId } from "../redux/actions/commentsActions";
import { fetchUserById } from "../redux/actions/userActions";
import Bouton from "../components/Bouton";

const Page_info_lieu = ({ route }) => {
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
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");

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

  const {
    name,
    adresse,
    latitude,
    longitude,
    photo,
    equipments,
    ville,
    codePostal,
  } = locationDetails || {};

  const imageUrl = photo?.photoId
    ? `${apiUrl}/photos/get/${photo.photoId}`
    : null;

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

          {adresse && locationDetails.ville && locationDetails.codePostal && (
            <Text style={styles.ownerText}>
              Adresse :{" "}
              {`${adresse}, ${locationDetails.ville}, ${locationDetails.codePostal}`}
            </Text>
          )}

          {latitude && longitude && (
            <Text style={styles.ownerText}>
              Coordonnées : Latitude {latitude}, Longitude {longitude}
            </Text>
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
          ) : comments.length === 0 ? (
            <Text style={styles.noCommentsText}>
              Soyez le premier à laisser un commentaire sous ce lieu !
            </Text>
          ) : (
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
          )}

          <Bouton label="Ajouter un commentaire" onClick={alert} />
        </BoiteVerte>
      </ScrollView>
      {/* Modal pour signaler un lieu */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Signaler ce lieu</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Raison du signalement"
              value={reason}
              onChangeText={setReason}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setReason("");
                }}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={submitFlag}
              >
                <Text style={styles.submitButtonText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    color: "#F25C05",
  },
  ownerText: {
    fontSize: 18,
    marginHorizontal: "5%",
    marginTop: 10,
  },
  noCommentsText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#F25C05",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Page_info_lieu;

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

  const [modalVisible, setModalVisible] = useState(false); // État pour le modal
  const [reason, setReason] = useState(""); // État pour la raison
  const users = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    if (id) {
      console.log("API URL:", apiUrl); // Debug
      console.log("Fetching comments for location:", id); // Debug

      dispatch(fetchLocationById(id));
      dispatch(fetchCommentsByLocationId(id));
    }
  }, [id, dispatch, apiUrl]);

  useEffect(() => {
    if (comments.length > 0) {
      // Liste unique des userId à partir des commentaires
      const userIds = [...new Set(comments.map((comment) => comment.userId))];
      userIds.forEach((id) => {
        if (!users[id]) {
          dispatch(fetchUserById(id)); // Charge les données utilisateur manquantes
        }
      });
    }
  }, [comments, users, dispatch]);

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
          {/* Champ multiligne pour l'adresse */}
          <Champ
            placeholder={`${adresse}, ${locationDetails.ville}, ${locationDetails.codePostal}`}
            editable={false}
            multiline={true} // Permet plusieurs lignes
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
          <Text style={styles.sectionTitle}>COMMENTAIRES :</Text>
          {commentsLoading ? (
            <Text>Chargement des commentaires...</Text>
          ) : (
            <>
              {console.log("Comments to render:", comments)} {/* Debug */}
              <Scroll_horizontal
                items={comments.map((comment) => {
                  const user = users?.[comment.userId];
                  const userName = user
                    ? `${user.firstName} ${user.lastName}`.trim()
                    : "Utilisateur inconnu";

                  console.log("Rendu commentaire :", {
                    pseudo: userName,
                    note: comment.rating,
                    texte: comment.commentText,
                  });

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
          <Bouton label="Ajouter un commentaire" onClick={alert}/>
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
    marginTop: 10,
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
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

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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocationById,
  deleteLocation,
  updateLocation,
} from "../redux/actions/locationsActions";
import BoiteVerte from "../components/Boite_verte";
import Photo from "../components/Photo";
import Carte from "../components/Carte";
import Champ_selection from "../components/Champ_selection";
import { MaterialIcons } from "@expo/vector-icons";
import Scroll_horizontal from "../components/Scroll_horizontal";
import Commentaire from "../components/Commentaire";

const DetailMesLieux = ({ route, navigation }) => {
  const screenWidth = Dimensions.get("window").width; // Largeur de l'écran
  const boiteVerteWidth = screenWidth * 0.9;

  const { id } = route.params; // ID du lieu pour charger les détails
  const dispatch = useDispatch();

  const { comments, loading: commentsLoading } = useSelector(
    (state) => state.comments
  );
  const users = useSelector((state) => state.user.userDetails);

  const { locationDetails, loading, error } = useSelector(
    (state) => state.locations
  );
  const apiUrl = useSelector((state) => state.config.apiUrl); // URL de l'API

  const [isEditModalVisible, setEditModalVisible] = useState(false); // État pour la modale
  const [updatedLocation, setUpdatedLocation] = useState({}); // Données mises à jour

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer ce lieu ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            dispatch(deleteLocation(id))
              .unwrap()
              .then(() => {
                Alert.alert("Succès", "Le lieu a été supprimé avec succès.");
                navigation.goBack();
              })
              .catch((error) => {
                Alert.alert("Erreur", "Impossible de supprimer le lieu.");
              });
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    setUpdatedLocation({
      name: locationDetails.name,
      adresse: locationDetails.adresse,
      ville: locationDetails.ville,
      codePostal: locationDetails.codePostal,
      latitude: locationDetails.latitude.toString(),
      longitude: locationDetails.longitude.toString(),
    });
    setEditModalVisible(true);
  };

  const isValidCoordinate = (value) => {
    return /^-?\d+(\.\d+)?$/.test(value); // Vérifie si c'est un nombre décimal valide
  };

  const submitEdit = () => {
    if (
      !isValidCoordinate(updatedLocation.latitude) ||
      !isValidCoordinate(updatedLocation.longitude)
    ) {
      Alert.alert("Erreur", "Veuillez entrer des coordonnées valides.");
      return;
    }

    const formattedLocation = {
      ...updatedLocation,
      latitude: parseFloat(updatedLocation.latitude),
      longitude: parseFloat(updatedLocation.longitude),
    };

    dispatch(updateLocation({ id, locationData: formattedLocation }))
      .unwrap()
      .then(() => {
        Alert.alert("Succès", "Le lieu a été mis à jour avec succès.");
        setEditModalVisible(false);
      })
      .catch((error) => {
        Alert.alert("Erreur", "Impossible de mettre à jour le lieu.");
      });
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
        <Text>Erreur : {error}</Text>
      </View>
    );
  }

  const {
    name,
    adresse,
    latitude,
    longitude,
    photo,
    equipments = [],
    ville,
    codePostal,
  } = locationDetails || {};

  const imageUrl = photo?.photoId
    ? `${apiUrl}/photos/get/${photo.photoId}`
    : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>{name}</Text>
        <BoiteVerte style={styles.boiteVerte}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleEdit} style={styles.icons}>
              <MaterialIcons name="edit" size={30} color="#F25C05" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.icons}>
              <MaterialIcons name="delete" size={30} color="#F25C05" />
            </TouchableOpacity>
          </View>
          <View style={styles.photoContainer}>
            {imageUrl && (
              <Photo imageUrl={imageUrl} width="100%" height={200} />
            )}
          </View>

          {adresse && ville && codePostal && (
            <Text style={styles.ownerText}>
              Adresse : {`${adresse}, ${ville}, ${codePostal}`}
            </Text>
          )}
          {latitude && longitude && (
            <Text style={styles.ownerText}>
              Coordonnées : Latitude {latitude}, Longitude {longitude}
            </Text>
          )}
          <Carte ville={`${adresse}, ${ville}`} style={styles.map} />
          <Text style={styles.sectionTitle}>ÉQUIPEMENTS :</Text>
          <View style={styles.equipmentsContainer}>
            {equipments.length > 0 ? (
              equipments.map((equipment) => (
                <Champ_selection
                  key={equipment.equipmentId}
                  label={equipment.name}
                  isSelected={true}
                />
              ))
            ) : (
              <Text style={styles.noEquipmentsText}>Aucun équipement</Text>
            )}
          </View>
          <Text style={styles.sectionTitle}>COMMENTAIRES :</Text>
          {commentsLoading ? (
            <Text>Chargement des commentaires...</Text>
          ) : comments.length === 0 ? (
            <Text style={styles.noCommentsText}>
              Il n'y a pas encore de commentaires pour votre lieu.
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
                    key={comment.commentId} // Assurez-vous que `commentId` est bien défini ici
                    commentId={comment.commentId} // Passez l'ID du commentaire
                    pseudo={userName || "Utilisateur inconnu"}
                    note={comment.rating || 0}
                    texte={comment.commentText || "Pas de texte"}
                  />
                );
              })}
              parentWidth={boiteVerteWidth}
            />
          )}
        </BoiteVerte>
      </ScrollView>

      {/* Modale d'édition */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier le lieu</Text>
            <TextInput
              style={styles.textInput}
              value={updatedLocation.name}
              onChangeText={(text) =>
                setUpdatedLocation({ ...updatedLocation, name: text })
              }
              placeholder="Nom du lieu"
            />
            <TextInput
              style={styles.textInput}
              value={updatedLocation.adresse}
              onChangeText={(text) =>
                setUpdatedLocation({ ...updatedLocation, adresse: text })
              }
              placeholder="Adresse"
            />
            <TextInput
              style={styles.textInput}
              value={updatedLocation.ville}
              onChangeText={(text) =>
                setUpdatedLocation({ ...updatedLocation, ville: text })
              }
              placeholder="Ville"
            />
            <TextInput
              style={styles.textInput}
              value={updatedLocation.codePostal}
              onChangeText={(text) =>
                setUpdatedLocation({ ...updatedLocation, codePostal: text })
              }
              placeholder="Code postal"
            />
            <TextInput
              style={styles.textInput}
              value={updatedLocation.latitude}
              onChangeText={(text) =>
                setUpdatedLocation({ ...updatedLocation, latitude: text })
              }
              placeholder="Latitude"
            />

            <TextInput
              style={styles.textInput}
              value={updatedLocation.longitude}
              onChangeText={(text) =>
                setUpdatedLocation({ ...updatedLocation, longitude: text })
              }
              placeholder="Longitude"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={submitEdit}
              >
                <Text style={styles.submitButtonText}>Enregistrer</Text>
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
    justifyContent: "flex-end",
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
  icons: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 10,
  },
  map: {
    width: "90%",
    height: 400,
    marginVertical: 10,
    alignSelf: "center",
  },
  equipmentsContainer: {
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
  noEquipmentsText: {
    fontSize: 18,
    color: "#000",
    marginVertical: 10,
  },
  noCommentsText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  photoContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15, // Coins arrondis pour un effet moderne
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Ombre pour Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F25C05", // Couleur accentuée
    marginBottom: 20, // Espacement sous le titre
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc", // Bordure discrète
    borderWidth: 1,
    borderRadius: 10, // Bordure arrondie
    paddingHorizontal: 10,
    marginBottom: 15, // Espacement entre les champs
    fontSize: 16,
    backgroundColor: "#f9f9f9", // Fond léger
  },
  modalButtons: {
    flexDirection: "row", // Boutons côte à côte
    justifyContent: "space-between",
    width: "100%", // Largeur des boutons alignée avec le contenu
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5, // Espacement horizontal entre les boutons
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc", // Bouton gris pour "Annuler"
  },
  cancelButtonText: {
    color: "#000", // Texte noir pour "Annuler"
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#F25C05", // Couleur accentuée pour "Enregistrer"
  },
  submitButtonText: {
    color: "#fff", // Texte blanc pour "Enregistrer"
    fontWeight: "bold",
  },
});

export default DetailMesLieux;

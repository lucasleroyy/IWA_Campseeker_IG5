import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocationById, deleteLocation } from "../../redux/actions/locationsActions";
import { fetchCommentsByLocationId } from "../../redux/actions/commentsActions";
import { fetchUserById } from "../../redux/actions/userActions";
import BoiteVerte from "../../components/Boite_verte";
import Photo from "../../components/Photo";
import Champ_selection from "../../components/Champ_selection";
import Carte from "../../components/Carte";
import Scroll_horizontal from "../../components/Scroll_horizontal";
import Commentaire from "../../components/Commentaire";

const LieuAdmin = ({ route, navigation }) => {
  const { width } = Dimensions.get("window");
  const { id } = route.params; // ID du lieu pour charger les détails
  const dispatch = useDispatch();

  const { locationDetails, loading, error } = useSelector((state) => state.locations);
  const apiUrl = useSelector((state) => state.config.apiUrl);
  const { comments, loading: commentsLoading } = useSelector((state) => state.comments);
  const users = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
      dispatch(fetchCommentsByLocationId(id));
    }
  }, [id, dispatch]);

  // Fetch user details for all comments
  useEffect(() => {
    if (comments.length > 0) {
      comments.forEach((comment) => {
        if (!users[comment.userId]) {
          dispatch(fetchUserById(comment.userId));
        }
      });
    }
  }, [comments, dispatch, users]);

  const handleDeleteLocation = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ce lieu ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: () => {
            dispatch(deleteLocation(id))
              .unwrap()
              .then(() => {
                Alert.alert("Succès", "Lieu supprimé avec succès.");
                navigation.goBack();
              })
              .catch((error) => {
                console.error("Erreur lors de la suppression :", error);
                Alert.alert("Erreur", "Impossible de supprimer le lieu.");
              });
          },
        },
      ]
    );
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

  const { name, adresse, latitude, longitude, photo, equipments = [], ville, codePostal } =
    locationDetails || {};
  const imageUrl = photo?.photoId ? `${apiUrl}/photos/get/${photo.photoId}` : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>{name}</Text>
        <BoiteVerte style={styles.boiteVerte}>
          <View style={styles.photoContainer}>
            {imageUrl && <Photo imageUrl={imageUrl} width="100%" height={200} />}
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
              Il n'y a pas encore de commentaires pour ce lieu.
            </Text>
          ) : (
            <Scroll_horizontal
              items={comments.map((comment) => {
                const user = users[comment.userId];
                const userName = user
                  ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                  : "Utilisateur inconnu";

                return (
                  <Commentaire
                    key={comment.commentId}
                    commentId={comment.commentId}
                    pseudo={userName}
                    note={comment.rating || 0}
                    texte={comment.commentText || "Pas de texte"}
                  />
                );
              })}
              parentWidth={width * 0.9}
            />
          )}
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
  photoContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  map: {
    width: "90%",
    height: 200,
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
    color: "#000",
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
  }
});

export default LieuAdmin;

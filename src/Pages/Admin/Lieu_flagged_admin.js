import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocationById } from "../../redux/actions/locationsActions";
import { fetchCommentsByLocationId } from "../../redux/actions/commentsActions";
import { deleteLocation } from "../../redux/actions/locationsActions";
import { updateFlag } from "../../redux/actions/flagsActions";
import { fetchUserById } from "../../redux/actions/userActions";
import BoiteVerte from "../../components/Boite_verte";
import Champ from "../../components/Champ";
import Photo from "../../components/Photo";
import Bouton from "../../components/Bouton";
import Champ_selection from "../../components/Champ_selection";
import Carte from "../../components/Carte";
import Scroll_horizontal from "../../components/Scroll_horizontal";
import Commentaire from "../../components/Commentaire";

const LieuFlaggedAdmin = ({ route, navigation }) => {
  const { id, flagId } = route.params; // ID du lieu pour charger les détails
  const dispatch = useDispatch();
  
  const { locationDetails, loading, error } = useSelector((state) => state.locations);
  const apiUrl = useSelector((state) => state.config.apiUrl);
  const { comments, loading: commentsLoading } = useSelector((state) => state.comments);
  const users = useSelector((state) => state.user.userDetails);
  const userId = useSelector((state) => state.user.userInfo?.userId);

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
      dispatch(fetchCommentsByLocationId(id));
    }
  }, [id, dispatch]);

  const handleDeleteLocation = (locationId, flagId, userId) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ce lieu ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: () => {
            dispatch(deleteLocation(locationId))
              .unwrap()
              .then(() => {
                // Met à jour le flag après la suppression
                dispatch(
                  updateFlag({
                    flagId,
                    status: "resolved", // Statut mis à jour
                    reviewedBy: userId, // Administrateur ayant résolu le flag
                  })
                )
                  .unwrap()
                  .then(() => {
                    Alert.alert(
                      "Succès",
                      "Lieu supprimé et flag mis à jour avec succès."
                    );
                    navigation.navigate("AccueilAdmin");
                  })
                  .catch((error) => {
                    console.error("Erreur lors de la mise à jour du flag :", error);
                    Alert.alert(
                      "Erreur",
                      "Le lieu a été supprimé, mais la mise à jour du flag a échoué."
                    );
                  });
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

  const { name, adresse, photo, equipments } = locationDetails;
  const imageUrl = photo?.photoId ? `${apiUrl}/photos/get/${photo.photoId}` : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>{name}</Text>
        <BoiteVerte style={styles.boiteVerte}>
          <View style={styles.photoContainer}>
            {imageUrl && <Photo imageUrl={imageUrl} width="100%" height={200} />}
          </View>
          <Champ placeholder={`${adresse}, ${locationDetails.ville}, ${locationDetails.codePostal}`} editable={false} multiline />
          <Carte ville={`${adresse}, ${locationDetails.ville}`} style={styles.map} />
          <Text style={styles.sectionTitle}>ÉQUIPEMENTS :</Text>
          <View style={styles.Equipementcontainer}>
            {equipments.map((equipment) => (
              <Champ_selection key={equipment.equipmentId} label={equipment.name} isSelected={true} />
            ))}
          </View>
          <Text style={styles.sectionTitle}>COMMENTAIRES :</Text>
          {commentsLoading ? (
            <Text>Chargement des commentaires...</Text>
          ) : (
            <Scroll_horizontal
              items={comments.map((comment) => {
                const user = users?.[comment.userId];
                const userName = user ? `${user.firstName} ${user.lastName}` : "Utilisateur inconnu";
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
        </BoiteVerte>
        <TouchableOpacity >
          <Bouton
            style={styles.deleteButton}
            label="Supprimer ce lieu"
            onClick={() =>
            handleDeleteLocation(locationDetails.locationId, flagId, userId)
            }
            />
        </TouchableOpacity>
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
  deleteButton: {
    backgroundColor: "#FF6D00",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LieuFlaggedAdmin;

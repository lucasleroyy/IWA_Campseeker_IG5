import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommentsByLocationId, deleteComment, fetchCommentById } from "../../redux/actions/commentsActions";
import { fetchLocationById } from "../../redux/actions/locationsActions";
import { fetchUserById } from "../../redux/actions/userActions";
import { updateFlag } from "../../redux/actions/flagsActions";
import BoiteVerte from "../../components/Boite_verte";
import Bouton from "../../components/Bouton";
import Commentaire from "../../components/Commentaire";
import Photo from "../../components/Photo";

const CommentaireFlaggedAdmin = ({ route, navigation }) => {
  const { id, flagId } = route.params; // ID du commentaire signalé
  const dispatch = useDispatch();

  const { currentComment, loading: commentsLoading, error: commentsError } = useSelector((state) => state.comments);
  const { locationDetails, loading: locationsLoading, error: locationError } = useSelector((state) => state.locations);
  const users = useSelector((state) => state.user.userDetails); // Détails des utilisateurs
  const apiUrl = useSelector((state) => state.config.apiUrl);
  const userId = useSelector((state) => state.user.userInfo?.userId);

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentById(id)); // Charge le commentaire spécifique
    }
  }, [id, dispatch]);

  // Charger les détails du lieu lorsque `currentComment` est disponible
  useEffect(() => {
    if (currentComment?.locationId) {
      dispatch(fetchLocationById(currentComment.locationId));
    }
  }, [currentComment, dispatch]);

  // Charger les utilisateurs associés si nécessaire
  useEffect(() => {
    if (currentComment && !users[currentComment.userId]) {
      dispatch(fetchUserById(currentComment.userId));
    }
  }, [currentComment, users, dispatch]);
  const removeComment = (commentId, flagId, userId) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ce commentaire ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: () => {
            dispatch(deleteComment(commentId))
              .unwrap()
              .then(() => {
                // Mettre à jour le flag après suppression du commentaire
                dispatch(
                  updateFlag({
                    flagId,
                    status: "resolved", // Statut de résolution
                    reviewedBy: userId, // ID de l'utilisateur connecté
                  })
                )
                  .unwrap()
                  .then(() => {
                    Alert.alert(
                      "Succès",
                      "Commentaire supprimé et flag mis à jour avec succès."
                    );
                    navigation.navigate("AccueilAdmin");
                  })
                  .catch((error) => {
                    console.error("Erreur lors de la mise à jour du flag :", error);
                    Alert.alert(
                      "Erreur",
                      "Le commentaire a été supprimé, mais la mise à jour du flag a échoué."
                    );
                  });
              })
              .catch((error) => {
                console.error("Erreur lors de la suppression :", error);
                Alert.alert("Erreur", "Impossible de supprimer le commentaire.");
              });
          },
        },
      ]
    );
  };


  if (commentsLoading || locationsLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (commentsError) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Erreur : {commentsError}</Text>
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Erreur : {locationError}</Text>
      </View>
    );
  }

  if (!currentComment) {
    return (
      <View style={styles.container}>
        <Text>Aucun commentaire trouvé.</Text>
      </View>
    );
  }

  // Obtenir les informations utilisateur et photo du lieu
  const user = users?.[currentComment.userId];
  const userName = user ? `${user.firstName} ${user.lastName}` : "Utilisateur inconnu";
  const imageUrl = locationDetails?.photo?.photoId
    ? `${apiUrl}/photos/get/${locationDetails.photo.photoId}`
    : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {imageUrl && (
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() =>
              navigation.navigate("PageInfoLieu", { id: currentComment.locationId }) // Navigue vers la page PageInfoLieu
            }
          >
            <Photo imageUrl={imageUrl} width="100%" height={200} />
          </TouchableOpacity>
        )}
        <BoiteVerte>
          <Commentaire
            pseudo={userName}
            note={currentComment.rating || 0}
            texte={currentComment.commentText || "Pas de texte"}
          />
          <Bouton
            label="Supprimer ce commentaire"
            onClick={() => removeComment(currentComment.commentId, flagId, userId)}
          />
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
  photoContainer: {
    position: "relative",
    width: 300,
    height: 200,
    marginVertical: 10,
  },
  bouton: {
    marginTop: 10,
    marginRight: 20,
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
});

export default CommentaireFlaggedAdmin;

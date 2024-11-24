import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommentsByLocationId, deleteComment } from "../../redux/actions/commentsActions";
import { fetchLocationById } from "../../redux/actions/locationsActions";
import { fetchUserById } from "../../redux/actions/userActions";
import BoiteVerte from "../../components/Boite_verte";
import Bouton from "../../components/Bouton";
import ScrollHorizontal from "../../components/Scroll_horizontal";
import Commentaire from "../../components/Commentaire";
import Photo from "../../components/Photo";

const CommentaireAdmin = ({ route }) => {
  const { id } = route.params; // Récupère l'id de l'emplacement
  const dispatch = useDispatch();

  const { locationDetails, loading: locationsLoading, error: locationError } = useSelector((state) => state.locations);
  const { comments, loading: commentsLoading, error: commentsError } = useSelector((state) => state.comments);
  const users = useSelector((state) => state.user.userDetails); // Récupérer les informations des utilisateurs
  const apiUrl = useSelector((state) => state.config.apiUrl);

  // Charger les données du lieu et des commentaires
  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
      dispatch(fetchCommentsByLocationId(id));
    }
  }, [id, dispatch]);

  // Charger les utilisateurs manquants
  useEffect(() => {
    if (comments.length > 0) {
      const userIds = [...new Set(comments.map((comment) => comment.userId))]; // Obtenir les IDs uniques
      userIds.forEach((userId) => {
        if (!users[userId]) {
          dispatch(fetchUserById(userId)); // Récupérer les utilisateurs manquants
        }
      });
    }
  }, [comments, users, dispatch]);

  // Fonction pour supprimer un commentaire
  const removeComment = (commentId) => {
    const userId = useSelector((state) => state.user.userInfo?.userId);
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
                Alert.alert("Succès", "Commentaire supprimé avec succès.");
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

  // Gestion des états de chargement et des erreurs
  if (locationsLoading || commentsLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Erreur lors du chargement du lieu : {locationError}</Text>
      </View>
    );
  }

  if (commentsError) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Erreur lors du chargement des commentaires : {commentsError}</Text>
      </View>
    );
  }

  // Si les détails de l'emplacement ne sont pas encore disponibles
  if (!locationDetails) {
    return (
      <View style={styles.container}>
        <Text>Lieu introuvable.</Text>
      </View>
    );
  }

  // Extraire les données du lieu
  const { name, adresse, photo } = locationDetails;
  const imageUrl = photo?.photoId ? `${apiUrl}/photos/get/${photo.photoId}` : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>{name}</Text>
        <View style={styles.photoContainer}>
          {imageUrl && <Photo imageUrl={imageUrl} width="100%" height={200} />}
        </View>
        <BoiteVerte>
          {comments.length > 0 ? (
            <ScrollHorizontal
              items={comments.map((comment) => {
                const user = users?.[comment.userId]; // Récupérer l'utilisateur associé
                const userName = user
                  ? `${user.firstName} ${user.lastName}`.trim()
                  : "Utilisateur inconnu";

                return (
                  <View key={comment.commentId}>
                    <Commentaire
                      pseudo={userName}
                      note={comment.rating || 0}
                      texte={comment.commentText || "Pas de texte"}
                    />
                    <View style={styles.bouton}>
                      <Bouton
                        label="Supprimer ce commentaire"
                        onClick={() => removeComment(comment.commentId)}
                      />
                    </View>
                  </View>
                );
              })}
            />
          ) : (
            <Text style={{ textAlign: "center", marginTop: 10 }}>Aucun commentaire disponible.</Text>
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

export default CommentaireAdmin;

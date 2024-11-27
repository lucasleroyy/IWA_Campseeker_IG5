import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFlaggedComments,
  updateFlag,
} from "../../redux/actions/flagsActions";
import { fetchCommentById, deleteComment } from "../../redux/actions/commentsActions";
import { fetchUserById } from "../../redux/actions/userActions";
import Commentaire from "../../components/Commentaire";
import Icon from "react-native-vector-icons/MaterialIcons";

const CommentaireSignales = () => {
  const dispatch = useDispatch();

  // Charger les commentaires signalés et les utilisateurs associés
  const flaggedComments = useSelector((state) => state.flags.commentFlags);
  const users = useSelector((state) => state.user.userDetails);
  const commentsById = useSelector((state) => state.comments.commentsById || {});
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const loading = useSelector((state) => state.flags.loading);
  const error = useSelector((state) => state.flags.error);

  // Charger les commentaires signalés et leurs données associées
  useEffect(() => {
    const loadFlaggedCommentsData = async () => {
      const response = await dispatch(fetchFlaggedComments());
      if (response.payload) {
        response.payload.forEach((flag) => {
          if (flag.commentId && !commentsById[flag.commentId]) {
            dispatch(fetchCommentById(flag.commentId)); // Charger les détails du commentaire
          }
        });
      }
    };
    loadFlaggedCommentsData();
  }, [dispatch, commentsById]);

  // Charger les utilisateurs associés aux commentaires
  useEffect(() => {
    flaggedComments.forEach((flag) => {
      const commentDetails = commentsById[flag.commentId];
      if (commentDetails?.userId && !users[commentDetails.userId]) {
        dispatch(fetchUserById(commentDetails.userId));
      }
    });
  }, [flaggedComments, commentsById, users, dispatch]);

  const removeComment = (commentId, flagId) => {
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
                dispatch(
                  updateFlag({
                    flagId,
                    status: "resolved",
                    reviewedBy: userId,
                  })
                )
                  .unwrap()
                  .then(() => {
                    Alert.alert(
                      "Succès",
                      "Commentaire supprimé et flag mis à jour avec succès."
                    );
                    dispatch(fetchFlaggedComments());
                  })
                  .catch((error) => {
                    console.error(
                      "Erreur lors de la mise à jour du flag :",
                      error
                    );
                    Alert.alert(
                      "Erreur",
                      "Le commentaire a été supprimé, mais la mise à jour du flag a échoué."
                    );
                  });
              })
              .catch((error) => {
                console.error("Erreur lors de la suppression :", error);
                Alert.alert(
                  "Erreur",
                  "Impossible de supprimer le commentaire."
                );
              });
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des commentaires signalés...</Text>
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

  if (!flaggedComments || flaggedComments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.message}>Aucun commentaire signalé.</Text>
      </View>
    );
  }

  const renderItem = ({ item: commentFlag }) => {
    const commentDetails = commentsById[commentFlag.commentId]; // Récupérer les détails du commentaire
    const commentUser = commentDetails?.userId ? users[commentDetails.userId] : null;
    const userName = commentUser
      ? `${commentUser.firstName} ${commentUser.lastName}`
      : "Utilisateur inconnu";

    return (
      <View style={styles.bandeau}>
        <View style={styles.commentRow}>
          <Commentaire
            commentId={commentFlag.commentId}
            pseudo={userName} // Nom de l'utilisateur qui a posté le commentaire
            note={commentDetails?.rating || 0} // Note du commentaire
            texte={commentDetails?.commentText || "Pas de texte"} // Texte du commentaire
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeComment(commentFlag.commentId, commentFlag.flagId)}
          >
            <Icon name="delete" size={24} color="#FF6D00" />
          </TouchableOpacity>
        </View>
        <Text style={styles.reason}>Raison : {commentFlag.reason}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={flaggedComments}
      renderItem={renderItem}
      keyExtractor={(item) => item.flagId?.toString()}
      contentContainerStyle={styles.scrollContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(166, 116, 55, 0.1)",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "rgba(166, 116, 55, 0.1)",
  },
  bandeau: {
    width: "90%",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reason: {
    fontSize: 16,
    color: "red",
    marginVertical: 5,
  },
  deleteButton: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  message: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});

export default CommentaireSignales;

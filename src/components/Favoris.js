import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, checkIfFavorite } from "../redux/actions/favorisActions";

const Favoris = ({ locationId }) => {
  const dispatch = useDispatch();

  // Récupère les états depuis Redux
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const favoris = useSelector((state) => state.favoris.favoris);
  const loading = useSelector((state) => state.favoris.loading);

  // Vérifie si le lieu est favori
  const isFavorite = favoris.some((fav) => fav.locationId === locationId);

  useEffect(() => {
    if (userId && locationId) {
      dispatch(checkIfFavorite({ userId, locationId }));
    }
  }, [userId, locationId, dispatch]);

  // Gère l'ajout/suppression des favoris avec confirmation
  const toggleFavorite = () => {
    if (!userId) {
      Alert.alert("Erreur", "Vous devez être connecté pour modifier vos favoris.");
      return;
    }

    const action = isFavorite ? "retirer" : "ajouter";
    const dispatchAction = isFavorite ? removeFavorite : addFavorite;

    Alert.alert(
      `Confirmer l'action`,
      `Voulez-vous ${action} ce lieu ${isFavorite ? "des favoris" : "aux favoris"} ?`,
      [
        { text: "Annuler", style: "cancel" }, // Ne fait rien si annulé
        {
          text: "Oui",
          onPress: () => {
            // Ajout ou suppression du favori
            dispatch(dispatchAction({ userId, locationId }))
              .then(() => {
                Alert.alert("Succès", `Lieu ${isFavorite ? "retiré des" : "ajouté aux"} favoris.`);
              })
              .catch((error) => {
                console.error(`Erreur lors de l'action sur les favoris :`, error);
                Alert.alert("Erreur", "Impossible de modifier vos favoris.");
              });
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      style={styles.container}
      disabled={loading} // Désactive le bouton si une requête est en cours
    >
      <MaterialIcons
        name={isFavorite ? "favorite" : "favorite-border"}
        size={30}
        color="#FF6D00"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Favoris;

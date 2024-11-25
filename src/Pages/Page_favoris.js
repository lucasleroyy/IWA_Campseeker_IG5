import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Bandeau from "../components/Bandeau";
import Photo from "../components/Photo";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fetchFavoritesByUserId } from "../redux/actions/favorisActions";
import { fetchLocationById } from "../redux/actions/locationsActions";

const Page_favoris = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const apiUrl = useSelector((state) => state.config.apiUrl);

  const [favoriteLocations, setFavoriteLocations] = useState([]);

  // Récupération des favoris de l'utilisateur
  const favoris = useSelector((state) => state.favoris.favoris);

  const loadFavoriteLocations = async () => {
    if (!favoris || favoris.length === 0) {
      setFavoriteLocations([]);
      return;
    }

    const promises = favoris.map(async (favori) => {
      const response = await dispatch(fetchLocationById(favori.locationId));
      return response.payload; // Ajoute les détails du lieu dans un tableau
    });

    const locations = await Promise.all(promises);
    const validLocations = locations.filter(location => location && location.locationId); // Filter out any locations without a valid ID
    setFavoriteLocations(validLocations); // Met à jour l'état local
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoritesByUserId(userId));
    }
  }, [userId, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        dispatch(fetchFavoritesByUserId(userId)).then(() => {
          loadFavoriteLocations();
        });
      }
    }, [userId, dispatch, favoris])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>
          Mes lieux <Text style={{ color: "#F25C05" }}>favoris</Text>
        </Text>
        {favoriteLocations.length > 0 ? (
          favoriteLocations.map((location) => {
            const imageUrl = location.photo?.photoId
              ? `${apiUrl}/photos/get/${location.photo.photoId}`
              : null;

            return (
              <TouchableOpacity
                key={location.locationId}
                style={styles.locationContainer}
                onPress={() =>
                  navigation.navigate("PageInfoLieu", { id: location.locationId })
                }
              >
                <View style={styles.bandeau}>
                  {imageUrl && (
                    <Photo imageUrl={imageUrl} width="100%" height={230} />
                  )}
                  {/* Conteneur pour le nom avec le chevron */}
                  <View style={styles.row}>
                    <View>
                      <Text style={styles.nomLieu}>{location.name}</Text>
                      <Text style={styles.proprietaire}>
                        {location.adresse} | {location.ville}
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#555" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.message}>
            Vous n'avez pas encore de lieux favoris.
          </Text>
        )}
      </ScrollView>
      <Bandeau currentPage="PageFavoris" onNavigate={navigation.navigate} />
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
    paddingVertical: "15%",
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  locationContainer: {
    marginBottom: 20,
    alignItems: "center",
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
  },
  nomLieu: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    paddingTop: 10,
  },
  proprietaire: {
    fontSize: 14,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  message: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Page_favoris;

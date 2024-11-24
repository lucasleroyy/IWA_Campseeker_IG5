import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocationsByUserId } from "../redux/actions/locationsActions"; // Import de l'action
import { useNavigation } from "@react-navigation/native";
import Photo from "../components/Photo";

const Mes_lieux_user = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userInfo?.userId); // Récupère le userId dans le store
  const { userLocations, loading, error } = useSelector((state) => state.locations);
  const apiUrl = useSelector((state) => state.config.apiUrl); // URL de l'API

  useEffect(() => {
    if (userId) {
      dispatch(fetchLocationsByUserId(userId)); // Récupère les lieux de l'utilisateur connecté
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des lieux...</Text>
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>
          Mes <Text style={{ color: "#F25C05" }}>lieux</Text>
        </Text>
        {(!userLocations || userLocations.length === 0) ? (
          <Text style={styles.noLocationsText}>
            Vous n'avez pas encore ajouté de lieux. Postez votre premier lieu dès aujourd'hui !
          </Text>
        ) : (
          userLocations.map((location) => {
            const imageUrl = location.photo?.photoId
              ? `${apiUrl}/photos/get/${location.photo.photoId}`
              : null;

            return (
              <View key={location.locationId} style={styles.photosContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DetailMesLieux", {
                      id: location.locationId,
                    })
                  }
                >
                  <Text style={styles.subtitle}>{location.name}</Text>
                  {imageUrl && (
                    <Photo imageUrl={imageUrl} width={300} height={200} />
                  )}
                </TouchableOpacity>
              </View>
            );
          })
        )}
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
    paddingVertical: "5%",
    alignItems: "center",
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  photosContainer: {
    position: "relative",
    width: 300,
    height: 200,
    marginVertical: 30,
    alignContent: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  noLocationsText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default Mes_lieux_user;

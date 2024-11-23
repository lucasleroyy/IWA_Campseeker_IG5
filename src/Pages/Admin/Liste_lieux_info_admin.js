import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Photo from '../../components/Photo';
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLocations } from "../../redux/actions/locationsActions";
import { fetchUserById } from "../../redux/actions/userActions";
import ChampRedirection from "../../components/Champ_redirection";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListeLieuxAdminInfo = ({ navigation }) => {
    const dispatch = useDispatch();
    const {
        locations,
        loading: locationsLoading,
        error: locationsError,
      } = useSelector((state) => state.locations);
      const { userDetails = {} } = useSelector((state) => state.user || {});
      const apiUrl = useSelector((state) => state.config.apiUrl); // Récupère l'URL de l'API
    
  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch]);

  useEffect(() => {
    if (!locations || !Array.isArray(locations)) return;
    if (!userDetails) return;

    const userIds = [
      ...new Set(locations.map((location) => location.userId).filter(Boolean)),
    ];

    userIds.forEach((userId) => {
      if (!userDetails[userId]) {
        dispatch(fetchUserById(userId));
      }
    });
  }, [locations, userDetails, dispatch]);

  if (locationsLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (locationsError) {
    const errorMessage =
      typeof locationsError === "string"
        ? locationsError
        : locationsError.error || "Une erreur est survenue"; // Fallback si c'est un objet

    return (
      <View style={styles.container}>
        <Text>Erreur : {errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {locations.map((location) => {
          const imageUrl = location.photo?.photoId
            ? `${apiUrl}/photos/get/${location.photo.photoId}` // Construit une URL valide
            : null;

          return (
            <TouchableOpacity
              key={location.locationId}
              style={styles.locationContainer}
              onPress={() =>
                navigation.navigate("LieuAdmin", { id: location.locationId })
              }
            >
              <View style={styles.bandeau}>
                {imageUrl && typeof imageUrl === "string" && (
                  <Photo imageUrl={imageUrl} width="100%" height={230} />
                )}
                {/* Conteneur pour le nom avec le chevron */}
                <View style={styles.row}>
                  <View>
                    <Text style={styles.nomLieu}>{location.name}</Text>
                    <Text style={styles.proprietaire}>
                       {location.adresse} | {location.ville}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={24} color="#555" />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
    paddingVertical: "15%",
  },
  titre: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    marginLeft: "5%",
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
    marginTop: 5, // Ajuste l'espacement entre les éléments
  },
});

export default ListeLieuxAdminInfo;

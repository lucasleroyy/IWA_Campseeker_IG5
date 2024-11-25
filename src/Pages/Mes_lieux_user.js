import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocationsByUserId } from "../redux/actions/locationsActions"; 
import { useFocusEffect } from "@react-navigation/native"; 
import Bandeau from "../components/Bandeau";
import Photo from "../components/Photo";
import Icon from "react-native-vector-icons/MaterialIcons";

const Mes_lieux_user = ({ navigation }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userInfo?.userId); // Récupère le userId dans le store
  const { userLocations, loading, error } = useSelector((state) => state.locations);
  const apiUrl = useSelector((state) => state.config.apiUrl); // URL de l'API

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        dispatch(fetchLocationsByUserId(userId));
      }
    }, [dispatch, userId])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
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
              ? `${apiUrl}/photos/get/${location.photo.photoId}` // Construit une URL valide
              : null;

            return (
              <TouchableOpacity
                key={location.locationId}
                style={styles.locationContainer}
                onPress={() =>
                  navigation.navigate("DetailMesLieux", { id: location.locationId })
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
          })
        )}
      </ScrollView>
      <Bandeau currentPage="MesLieuxUser" onNavigate={navigation.navigate} />
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
    marginTop: 5, // Ajuste l'espacement entre les éléments
  },
  noLocationsText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Mes_lieux_user;

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecentLocations } from "../redux/actions/locationsActions";
import { fetchUserById } from "../redux/actions/userActions";
import Bandeau from "../components/Bandeau";
import ChampRedirection from "../components/Champ_redirection";

const Page_accueil = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    locations,
    loading: locationsLoading,
    error: locationsError,
  } = useSelector((state) => state.locations);
  const { userDetails = {} } = useSelector((state) => state.user || {});

  useEffect(() => {
    dispatch(fetchRecentLocations());
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated userDetails in component:", userDetails);
  }, [userDetails]);

  useEffect(() => {
    console.log("Locations: ", locations);
    console.log("UserDetails: ", userDetails);

    if (!locations || !Array.isArray(locations)) return;
    if (!userDetails) return;

    const userIds = [
      ...new Set(locations.map((location) => location.userId).filter(Boolean)),
    ];
    console.log("UserIds to fetch:", userIds);

    userIds.forEach((userId) => {
      if (!userDetails[userId]) {
        console.log(`Dispatching fetch for userId: ${userId}`);
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
    return (
      <View style={styles.container}>
        <Text>Erreur : {locationsError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ChampRedirection
          label="Rechercher"
          targetScreen="PageRecherche"
          navigation={navigation}
        />
        <Text style={styles.titre}>
          Découvrez les derniers <Text style={{ color: "#F25C05" }}>lieux</Text>{" "}
          postés :
        </Text>
        {locations.map((location) => {
  console.log("Rendering location:", location.name);
  console.log("User details for userId:", location.userId, userDetails[location.userId]);
  return (
    <TouchableOpacity
      key={location.locationId}
      style={styles.locationContainer}
      onPress={() =>
        navigation.navigate("PageInfoLieu", { id: location.locationId })
      }
    >
      <View style={styles.bandeau}>
        <Text style={styles.nomLieu}>{location.name}</Text>
        <Text style={styles.proprietaire}>
          Propriétaire :{" "}
          {userDetails[location.userId]?.firstName
            ? `${userDetails[location.userId].firstName} ${userDetails[location.userId].lastName}`
            : "Chargement..."}
        </Text>
      </View>
    </TouchableOpacity>
  );
})}

      </ScrollView>
      <Bandeau currentPage="PageAccueil" onNavigate={navigation.navigate} />
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
  },
  proprietaire: {
    fontSize: 14,
    color: "#555",
  },
});

export default Page_accueil;

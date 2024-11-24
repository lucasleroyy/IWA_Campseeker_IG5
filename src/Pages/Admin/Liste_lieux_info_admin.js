import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Photo from '../../components/Photo';
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLocations } from "../../redux/actions/locationsActions";
import { fetchFlaggedLocations } from '../../redux/actions/flagsActions';
import { fetchUserById } from "../../redux/actions/userActions";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListeLieux = ({ locations, navigation, apiUrl }) => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    {locations.map((location) => {
      const imageUrl = location.photo?.photoId
        ? `${apiUrl}/photos/get/${location.photo.photoId}`
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
    })}
  </ScrollView>
);
const LieuxSignales = ({ navigation, apiUrl }) => {
  const dispatch = useDispatch();
  const { flaggedLocations, loading, error } = useSelector((state) => state.flags);

  useEffect(() => {
    dispatch(fetchFlaggedLocations());
    console.log("Lieux signalés :", flaggedLocations);
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des lieux signalés...</Text>
      </View>
    );
  }

  if (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error.message || JSON.stringify(error); // Convertir en chaîne de caractères lisible
  
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erreur : {errorMessage}</Text>
      </View>
    );
  }
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {flaggedLocations.map((location) => {
        const imageUrl = location.photo?.photoId
          ? `${apiUrl}/photos/get/${location.photo.photoId}`
          : null;

        return (
          <TouchableOpacity
            key={location.locationId}
            style={styles.locationContainer}
            onPress={() =>{
              navigation.navigate("LieuFlaggedAdmin", { id: location.locationId, flagId: location.flagId });
            }
            }
          >
            <View style={styles.bandeau}>
              {imageUrl && typeof imageUrl === "string" && (
                <Photo imageUrl={imageUrl} width="100%" height={230} />
              )}
              <View style={styles.row}>
                <View>
                  {location.reason && (
                    <Text style={styles.reason}>Raison : {location.reason}</Text>
                    )}
                </View>
                <Icon name="chevron-right" size={24} color="#555" />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
const ListeLieuxAdminInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const { locations, loading: locationsLoading, error: locationsError } = useSelector((state) => state.locations);
  const apiUrl = useSelector((state) => state.config.apiUrl);

  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch]);

  const [index, setIndex] = useState(0); // Onglet actif
  const [routes] = useState([
    { key: 'liste', title: 'Tous les lieux' },
    { key: 'signales', title: 'Lieux signalés' },
  ]);

  const renderScene = SceneMap({
    liste: () => (
      <ListeLieux
        locations={locations}
        navigation={navigation}
        apiUrl={apiUrl}
      />
    ),
    signales: () => (
      <LieuxSignales
        locations={locations}
        navigation={navigation}
        apiUrl={apiUrl}
      />
    ),
  });

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
<TabView
  navigationState={{ index, routes }}
  renderScene={renderScene}
  onIndexChange={setIndex}
  initialLayout={{ width: Dimensions.get('window').width }}
  renderTabBar={(props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#000', height: 2 }} // Ligne sous l'onglet actif
      style={{ backgroundColor: '#FFF' }} // Fond blanc de la barre d'onglets
      labelStyle={{ fontSize: 16, fontWeight: 'bold' }} // Style du texte des onglets
      activeColor="#000" // Texte noir pour l'onglet actif
      inactiveColor="#AAA" // Texte gris pour les onglets inactifs
    />
  )}
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
    paddingVertical: "15%",
    backgroundColor: "rgba(166, 116, 55, 0.1)",
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
  reason: {
    fontSize: 14,
    color: "red", // Couleur rouge pour mettre en évidence la raison du signalement
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ListeLieuxAdminInfo;

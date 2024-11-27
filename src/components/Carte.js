import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Carte = ({ locations = [], ville, style }) => {
  const [region, setRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async (cityName) => {
      try {
        const apiKey = "6cef030b1b574a94a598ea0ddc855327";
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            cityName
          )}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          console.log("Ville non trouvée");
        }
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API OpenCage : ", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission de localisation refusée");
          setIsLoading(false);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération de la localisation : ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (locations.length === 1) {
      // S'il y a une seule localisation, on centre sur celle-ci
      const location = locations[0];
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsLoading(false);
    } else if (ville) {
      // Sinon, si une ville est fournie, géocodage
      fetchCoordinates(ville);
    } else if (locations.length > 1) {
      // Si plusieurs localisations sont fournies, prendre la première comme centre
      const location = locations[0];
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsLoading(false);
    } else {
      // Sinon, localisation actuelle
      fetchLocation();
    }
  }, [locations, ville]);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, style]}>
        <Text style={styles.loadingText}>Chargement...</Text>
        <ActivityIndicator size="large" color="#597962" />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <MapView style={styles.map} region={region}>
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={location.adresse}
          />
        ))}
        {locations.length === 0 && region && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={ville || "Ma Position"}
            description="Localisation unique"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  loadingText: {
    marginBottom: 10,
    fontSize: 18,
    color: "#555",
  },
});

export default Carte;

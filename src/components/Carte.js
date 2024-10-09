import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Carte = ({ initialRegion, ville, style }) => {
  const [region, setRegion] = useState(initialRegion);

  useEffect(() => {
    if (ville) {
      // Appelle l'API OpenCage pour obtenir les coordonnées de la ville
      fetchCoordinates(ville);
    } else if (initialRegion) {
      setRegion(initialRegion);
    }
  }, [ville, initialRegion]);

  const fetchCoordinates = async (cityName) => {
    try {
      const apiKey = '6cef030b1b574a94a598ea0ddc855327';
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${apiKey}`);
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
    }
  };
  

  if (!region) {
    return null; // Si les coordonnées ne sont pas encore définies, ne pas afficher la carte
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        style={styles.map}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title={ville || "Ma Position"}
          description="Description de l'emplacement"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Carte;

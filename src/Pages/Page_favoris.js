import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Bandeau from '../components/Bandeau';
import Carte from '../components/Carte';

const Page_favoris = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text>Page Favoris</Text>
        <Carte initialRegion={{
          latitude: 43.6119,
          longitude: 3.8772,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
          ville={'Montpellier'} style={styles.map}/>
      </ScrollView>
      <Bandeau currentPage="PageFavoris" onNavigate={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
  },
  scrollContainer: {
    flexGrow: 1,  // Permet à ScrollView de s'étendre en fonction du contenu
    paddingVertical: 70,
  },
  map: {
    width: '90%',  // Assure que la carte est large mais laisse un peu d'espace sur les côtés
    height: 400,  // Ajuste la hauteur selon ce qui convient
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Page_favoris;

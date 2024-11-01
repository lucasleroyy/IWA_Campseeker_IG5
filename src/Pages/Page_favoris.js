import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Bandeau from '../components/Bandeau';
import Favoris from '../components/Favoris';
import Photo from '../components/Photo';

const Page_favoris = ({ navigation }) => {
  const [favoritePhotos, setFavoritePhotos] = useState([
    { uri: require('../../assets/bivouac3.png'), id: 1 },
    { uri: require('../../assets/bivouac.png'), id: 2 },
    { uri: require('../../assets/bivouac4.png'), id: 3 }
  ]);

  const removeFromFavorites = (id) => {
    setFavoritePhotos((prevFavorites) => 
      prevFavorites.filter((photo) => photo.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>
          Mes lieux <Text style={{ color: '#F25C05' }}>favoris</Text> :
        </Text>
        {favoritePhotos.map((photo) => (
          <View key={photo.id} style={styles.favorisContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('PageInfoLieu', { id: photo.id })}>
              <Photo imageUrl={photo.uri} width={300} height={200} />
            </TouchableOpacity>
            <View style={styles.favoriteIcon}>
              <Favoris isFavorite={true} onPress={() => removeFromFavorites(photo.id)} />
            </View>
          </View>
        ))}
      </ScrollView>
      <Bandeau currentPage="PageFavoris" onNavigate={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: '15%',
    alignItems: 'center',
  },
  favorisContainer: {
    position: 'relative',
    width: 300,
    height: 200,
    marginVertical: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
});

export default Page_favoris;

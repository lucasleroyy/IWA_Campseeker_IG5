import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Photo from '../components/Photo';

const Mes_lieux_user = () => {
  const navigation = useNavigation();
  
  const [mesLieux, setMesLieux] = useState([
    { uri: require('../../assets/bivouac3.png'), id: 1 },
    { uri: require('../../assets/bivouac.png'), id: 2 },
    { uri: require('../../assets/bivouac4.png'), id: 3 }
  ]);

  const removeLocation = (id) => {
    setMesLieux((prevLieux) => prevLieux.filter((photo) => photo.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>Mes <Text style={{ color: '#F25C05' }}>lieux</Text></Text>
        {mesLieux.map((photo) => (
          <View key={photo.id} style={styles.photosContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailMesLieux', { id: photo.id, removeLocation })}>
              <Text style={styles.subtitle}>Nom du lieu</Text>
              <Photo imageUrl={photo.uri} width={300} height={200} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    paddingVertical: '5%',
    alignItems: 'center',
  },
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  photosContainer: {
    position: 'relative',
    width: 300,
    height: 200,
    marginVertical: 30,
    alignContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  }
});

export default Mes_lieux_user;

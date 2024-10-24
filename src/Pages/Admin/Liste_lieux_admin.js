import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Photo from '../../components/Photo';

const ListeLieuxAdmin = ({ navigation }) => {
    const photos = [
        { imageUrl: require('../../../assets/bivouac3.png'), id: 1 },
        { imageUrl: require('../../../assets/bivouac.png'), id: 2 },
        { imageUrl: require('../../../assets/bivouac4.png'), id: 3 }
      ];

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.titre}>Liste des lieux</Text>
                {photos.map((photo) => (
                    <View key={photo.id} style={styles.photoContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('CommentaireAdmin', { id: photo.id })}>
                            <Photo imageUrl={photo.imageUrl} width={300} height={200}  />
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
    scrollContent: {
        flexGrow: 1,
        paddingVertical: '15%',
        alignItems: 'center',
    },
    titre: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#000',
    },
    photoContainer: {
        position: 'relative',
        width: 300,
        height: 200,
        marginVertical: 10,
    },
});

export default ListeLieuxAdmin;


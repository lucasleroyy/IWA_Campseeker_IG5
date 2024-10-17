import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Bandeau from '../components/Bandeau';
import Photo from '../components/Photo';
import ChampRedirection from '../components/Champ_redirection';
import Scroll_horizontal from '../components/Scroll_horizontal';

const Page_accueil = ({ navigation }) => {
    const photos1 = [
        { id: 1, imageUrl: require('../../assets/bivouac.png') },
        { id: 2, imageUrl: require('../../assets/bivouac3.png') },
    ];
    const photos2 = [
        { id: 3, imageUrl: require('../../assets/bivouac3.png') },
        { id: 4, imageUrl: require('../../assets/bivouac.png') },
    ];

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ChampRedirection label="Rechercher" targetScreen="PageRecherche" navigation={navigation} />
                <Text style={styles.titre}>
                    Découvrez nos <Text style={{ color: '#F25C05' }}>lieux</Text> les mieux notés:
                </Text>
                <Scroll_horizontal items={photos1.map((photo) => (
                    <TouchableOpacity key={photo.id} onPress={() => navigation.navigate('PageInfoLieu', { id: photo.id })}>
                        <Photo imageUrl={photo.imageUrl} width={300} height={200} />
                    </TouchableOpacity>
                ))} />
                <Text style={styles.titre}>
                    Découvrez les derniers <Text style={{ color: '#F25C05' }}>lieux</Text> postés:
                </Text>
                <Scroll_horizontal items={photos2.map((photo) => (
                    <TouchableOpacity key={photo.id} onPress={() => navigation.navigate('PageInfoLieu', { id: photo.id })}>
                        <Photo imageUrl={photo.imageUrl} width={300} height={200} />
                    </TouchableOpacity>
                ))} />
            </ScrollView>
            <Bandeau currentPage="PageAccueil" onNavigate={navigation.navigate} />
        </View>
    )
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'rgba(166, 116, 55, 0.1)',
          paddingBottom: 50,
        },
        scrollContainer: {
          flexGrow: 1,
          paddingVertical: '15%',
        },
        titre: {
          fontSize: 18,
          marginTop: 20,
          fontWeight: 'bold',
          textAlign: 'left',
          marginBottom: 20,
          marginLeft: '5%',
          color: '#000',
        },
    });

export default Page_accueil;
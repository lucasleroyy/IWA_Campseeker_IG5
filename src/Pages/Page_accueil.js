import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Bandeau from '../components/Bandeau';
import Photo from '../components/Photo';
import ChampRedirection from '../components/Champ_redirection';

const Page_accueil = ({ navigation }) => {
    const photo = [
        { id: 1, imageUrl: require('../../assets/bivouac3.png') },
        { id: 2, imageUrl: require('../../assets/bivouac.png') },
        { id: 3, imageUrl: require('../../assets/bivouac4.png') },
    ];
    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ChampRedirection label="Rechercher" targetScreen="PageRecherche" navigation={navigation} />
                <Text style={styles.titre}>
                    Découvrez nos <Text style={{ color: '#F25C05' }}>lieux</Text> :
                </Text>
                <View style={styles.favorisContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('PageInfoLieu', { id: photo.id })}>
                        <Photo imageUrl={require('../../assets/bivouac3.png')} width={300} height={200} />
                    </TouchableOpacity>
                </View>
                <View style={styles.favorisContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('PageInfoLieu', { id: photo.id })}>
                        <Photo imageUrl={require('../../assets/bivouac.png')} width={300} height={200} />
                    </TouchableOpacity>
                </View>
                <View style={styles.favorisContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('PageInfoLieu', { id: photo.id })}>
                        <Photo imageUrl={require('../../assets/bivouac4.png')} width={300} height={200} />
                    </TouchableOpacity>
                </View>
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
          alignItems: 'center',
          paddingVertical: '15%',
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

export default Page_accueil;
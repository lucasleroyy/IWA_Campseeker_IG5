import React, { useState } from 'react';
import { View,Text, StyleSheet, ScrollView } from 'react-native';
import Bandeau from '../components/Bandeau';
import Carte from '../components/Carte';
import Recherche from '../components/Recherche';
import Champ_selection from '../components/Champ_selection';

const PageRecherche = () => {
    const [currentPage, setCurrentPage] = useState('Search');
    const [selectedTags, setSelectedTags] = useState([]);
    
    const onNavigate = (page) => {
        setCurrentPage(page);
    }; 
    
    const handleTagPress = (label) => {
        setSelectedTags((prevSelectedTags) => {
          if (prevSelectedTags.includes(label)) {
            // Si le tag est déjà sélectionné, on le retire de la liste
            return prevSelectedTags.filter((tag) => tag !== label);
          } else {
            // Sinon, on l'ajoute à la liste
            return [...prevSelectedTags, label];
          }
        });
    };

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Recherche placeholder="Rechercher un lieu" editable={true} />
                <View style={styles.Equipementcontainer}>
                    <Champ_selection 
                        label="Abrité" 
                        isSelected={selectedTags.includes('Abrité')} 
                        onPress={() => handleTagPress('Abrité')} />
                    <Champ_selection 
                        label="Sanitaire"
                        isSelected={selectedTags.includes('Sanitaire')}
                        onPress={() => handleTagPress('Sanitaire')} />
                    <Champ_selection 
                        label="Wifi" 
                        isSelected={selectedTags.includes('Wifi')}
                        onPress={() => handleTagPress('Wifi')} />
                    <Champ_selection
                        label="Parking"
                        isSelected={selectedTags.includes('Parking')}
                        onPress={() => handleTagPress('Parking')} />
                    <Champ_selection 
                        label="Électricité"
                        isSelected={selectedTags.includes('Électricité')}
                        onPress={() => handleTagPress('Électricité')} />
                </View>
                <Text>Tags sélectionnés: {selectedTags.join(', ')}</Text>
                <Carte
                    style={styles.map}
                    initialRegion={{
                        latitude: 48.8584, // Latitude pour Paris
                        longitude: 2.2945, // Longitude pour Paris
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </ScrollView>
            <Bandeau currentPage={currentPage} onNavigate={onNavigate}/>
        </View>
    )

};
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'rgba(166, 116, 55, 0.1)',
      marginTop: 50,
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
    Equipementcontainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      padding: 10,
    },
});


export default PageRecherche;
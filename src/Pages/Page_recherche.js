import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Bandeau from '../components/Bandeau';
import Carte from '../components/Carte';
import Recherche from '../components/Recherche';
import Champ_selection from '../components/Champ_selection';

const Page_recherche = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState('PageRecherche');
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [region, setRegion] = useState(null);
    
    const onNavigate = (page) => {
        setCurrentPage(page);
    }; 
    
    const handleTagPress = (label) => {
        setSelectedTags((prevSelectedTags) => {
          if (prevSelectedTags.includes(label)) {
            return prevSelectedTags.filter((tag) => tag !== label);
          } else {
            return [...prevSelectedTags, label];
          }
        });
    };

    const handleSearchChange = (text) => {
        setSearchCity(text);
    };

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Recherche 
                    placeholder="Rechercher un lieu" 
                    editable={true}
                    onCitySelect={handleSearchChange}
                />
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

                {/* Affiche la carte en fonction de la ville recherchée */}
                <Carte ville={searchCity} style={styles.map} />
            </ScrollView>
            <Bandeau currentPage={currentPage} onNavigate={navigation.navigate}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'rgba(166, 116, 55, 0.1)'
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

export default Page_recherche;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEquipments } from '../redux/actions/equipmentActions';
import Bandeau from '../components/Bandeau';
import Carte from '../components/Carte';
import Recherche from '../components/Recherche';
import Champ_selection from '../components/Champ_selection';

const Page_recherche = ({ navigation }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const dispatch = useDispatch();
    const { equipments, loading, error } = useSelector(state => state.equipments);

    useEffect(() => {
        dispatch(fetchEquipments());
    }, [dispatch]);

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
                {loading ? <Text>Chargement des équipements...</Text> : error ? <Text>Erreur : {error}</Text> : (
                    <View style={styles.Equipementcontainer}>
                        {equipments.map((equipment) => (
                            <Champ_selection 
                                key={equipment.equipmentId}
                                label={equipment.name}
                                isSelected={selectedTags.includes(equipment.name)}
                                onPress={() => handleTagPress(equipment.name)}
                            />
                        ))}
                    </View>
                )}
                <Carte ville={searchCity} style={styles.map} />
            </ScrollView>
            <Bandeau currentPage='PageRecherche' onNavigate={navigation.navigate}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'rgba(166, 116, 55, 0.1)',
      paddingBottom: 50,
    },

    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      paddingVertical: '15%',
    },
    map: {
      width: '90%',
      height: 150,
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

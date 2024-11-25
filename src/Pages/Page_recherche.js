import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEquipments } from '../redux/actions/equipmentActions';
import { fetchAllLocations, fetchLocationsByEquipments, fetchLocationsByCity  } from '../redux/actions/locationsActions'; 
import Carte from '../components/Carte';
import Recherche from '../components/Recherche';
import Champ_selection from '../components/Champ_selection';
import Icon from "react-native-vector-icons/MaterialIcons";
import { debounce } from 'lodash';

const Page_recherche = ({ navigation }) => {
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const dispatch = useDispatch();

  const { equipments, loading, error } = useSelector(state => state.equipments);
  const { locations, loading: locationsLoading, error: locationsError } = useSelector(state => state.locations);

  useEffect(() => {
    dispatch(fetchEquipments());
    dispatch(fetchAllLocations());
  }, [dispatch]);

  useEffect(() => {
    if (searchCity) {
      dispatch(fetchLocationsByCity(searchCity));
    }
  }, [searchCity, dispatch]);

  const handleTagPress = (equipmentId) => {
    setSelectedEquipmentIds(prev => {
      const newSelectedIds = prev.includes(equipmentId) ? prev.filter(id => id !== equipmentId) : [...prev, equipmentId];
      if (newSelectedIds.length === 0) {
        dispatch(fetchAllLocations());
      } else {
        dispatch(fetchLocationsByEquipments(newSelectedIds));
      }
      return newSelectedIds;
    });
  };

  const handleSearchChange = debounce((city) => {
    setSearchCity(city);  // Set city and trigger effect to fetch city-specific locations
  }, 300);  // Adding debounce to reduce calls

// Dans le composant Page_recherche

const filteredLocations = locations.filter(location => location.ville.toLowerCase() === searchCity.toLowerCase());

return (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Recherche placeholder="Rechercher un lieu" editable={true} onCitySelect={handleSearchChange} />
      {loading ? <Text>Chargement des équipements...</Text> : error ? <Text>Erreur : {error}</Text> : (
        <View style={styles.Equipementcontainer}>
          {equipments.map((equipment) => (
            <Champ_selection 
                key={equipment.equipmentId}
                label={equipment.name}
                isSelected={selectedEquipmentIds.includes(equipment.equipmentId)}
                onPress={() => handleTagPress(equipment.equipmentId)}
            />
          ))}
        </View>
      )}
      <Carte ville={searchCity} locations={filteredLocations} style={styles.map} />
      {locationsLoading ? (
        <Text>Chargement des lieux...</Text>
      ) : locationsError ? (
        <Text>Erreur lors du chargement des lieux : {locationsError}</Text>
      ) : (
        filteredLocations.map((location, index) => (
          <TouchableOpacity key={location.id || index} style={styles.locationContainer} onPress={() => navigation.navigate('PageInfoLieu', { id: location.locationId })}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Icon name="chevron-right" size={24} color="#555" />
            </View>
            <Text style={styles.locationInfo}>{location.description || "Pas de description"}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
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
      paddingBottom: '15%',
    },
    map: {
      width: '90%',
      marginBottom: 20,
      alignSelf: 'center',
    },
    Equipementcontainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      padding: 10,
    },
    locationContainer: {
      padding: 10,
      marginTop: 5,
      backgroundColor: '#FFF',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      width: '90%',
      marginBottom: 10,
    },
    locationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    locationName: {
      fontWeight: 'bold',
      flex: 1,  // This ensures the text takes up as much space as possible, pushing the icon to the edge.
    },
    locationInfo: {
      color: '#666',
      width: '100%',  // Ensure the description uses full width available
    },
});

export default Page_recherche;

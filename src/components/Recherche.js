import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Recherche = ({ placeholder, editable = true, onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async (text) => {
    const apiKey = '7c76aff2c1msh7800ce06c29bec6p19122ajsnbf656c97c7b7'; // Remplace par ta clé API GeoDB Cities
    try {
      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=FR&namePrefix=${encodeURIComponent(text)}&languageCode=FR`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      });
      
      // Vérifie si la réponse est réussie
      if (!response.ok) {
        console.error(`Erreur: ${response.status} ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      console.log(data); // Affiche la réponse pour vérifier la structure
      if (data && data.data) {
        // Filtre pour garder uniquement les noms principaux de villes
        const citySuggestions = data.data
          .map(place => place.name)
          .filter(name => !name.toLowerCase().includes('arrondissement')) // Exclut les arrondissements
          .map(name => {
            // Enlève les détails après des virgules, etc.
            return name.split(',')[0].split(' of ')[0].trim();
          });
  
        // Élimine les doublons
        setSuggestions([...new Set(citySuggestions)]);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Erreur lors de l'obtention des suggestions : ", error);
    }
  };
  

  const handleSelectCity = (city) => {
    setQuery(city);
    setSuggestions([]);  // Vide les suggestions après la sélection
    onCitySelect(city);  // Notifie le composant parent
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#000"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectCity(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  suggestionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 5,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Recherche;

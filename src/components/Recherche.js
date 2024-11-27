import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Recherche = ({ placeholder, editable = true, onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Fonction pour rechercher les suggestions de ville
  const searchSuggestions = async (text) => {
    setQuery(text);
    if (text.length > 2) { // Recherche après 3 caractères
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${text}&format=json&addressdetails=1&limit=5&countrycodes=fr`
        );

        // Filtrer et supprimer les doublons après formatage
        const filteredResults = response.data.filter((item) => {
          const city = item.address.city || item.address.town || item.address.village || '';
          return city.toLowerCase().startsWith(text.toLowerCase());
        });

        const uniqueSuggestions = Array.from(new Set(
          filteredResults.map((item) => formatSuggestion(item))
        )).map((uniqueCity) => {
          return filteredResults.find((item) => formatSuggestion(item) === uniqueCity);
        });

        setSuggestions(uniqueSuggestions);
      } catch (error) {
        console.error('Erreur lors de la recherche de suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Formate les suggestions pour afficher "Ville, Région"
  const formatSuggestion = (item) => {
    const city = item.address.city || item.address.town || item.address.village || '';
    const state = item.address.state || '';
    if (city === '' || state === '' || city === null || state === null) {
      return null;
    }
    return `${city}, ${state}`;
  };

  // Gère la sélection d'une ville
  const handleSelectCity = (city) => {
    setQuery(city); // Met à jour la recherche avec la ville sélectionnée
    setSuggestions([]); // Vide les suggestions
    onCitySelect(city); // Notifie le parent
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
          onChangeText={searchSuggestions} // Appelle la fonction de recherche
          editable={editable}
        />
      </View>
      {suggestions.length > 0 && (
        <FlatList
    data={suggestions}
    keyExtractor={(item, index) => `${item?.place_id || index}`} // Utilisez place_id ou un index unique
    renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelectCity(formatSuggestion(item))}>
            <Text style={styles.suggestion}>{formatSuggestion(item)}</Text>
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

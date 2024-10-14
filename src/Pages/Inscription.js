import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Champ from '../components/Champ';
import Bouton from '../components/Bouton';
import { useNavigation } from '@react-navigation/native';

const PageInscription = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />

      <Text style={styles.title}>Bienvenue chez CampSeeker</Text>
      <Text style={styles.subtitle}>Trouvez l'endroit <Text style={styles.highlight}>parfait</Text> pour bivouaquer</Text>

      <BoiteVerte>
        <Champ placeholder="Nom" />
        <Champ placeholder="Prénom" />
        <Champ placeholder="Pseudo" />
        <Champ placeholder="Adresse" />
        <Champ placeholder="Email" />
        <Champ placeholder="Confirmation email" />
        <Champ placeholder="Mot de passe" secureTextEntry={true} />
        <Champ placeholder="Confirmation mot de passe" secureTextEntry={true} />

        {/* Checkbox pour accepter les conditions */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
            <View style={[styles.checkboxSquare, isChecked && styles.checkboxChecked]} />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            Accepter les <Text 
              style={styles.underlineText}
              onPress={() => navigation.navigate('PageConditions')}
            >
              conditions d'utilisation
            </Text>
          </Text>
        </View>

        {/* Bouton d'inscription */}
        <Bouton 
          label="Inscription" 
          onClick={() => {
            if (isChecked) {
              alert('Inscription réussie !');
            } else {
              alert('Veuillez accepter les conditions d\'utilisation pour continuer.');
            }
          }} 
        />

        <Text style={styles.link} onPress={() => navigation.navigate('PageConnexion')}>
          J'ai déjà un compte
        </Text>
      </BoiteVerte>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  highlight: {
    color: '#FF6D00',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSquare: {
    width: 12,
    height: 12,
  },
  checkboxChecked: {
    backgroundColor: '#FFF',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#FFF',
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: '#FFF',
  },
  link: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default PageInscription;

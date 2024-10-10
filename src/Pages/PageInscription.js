import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Champ from '../components/Champ';
import Bouton from '../components/Bouton';

const PageInscription = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Affichage du logo */}
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />

      {/* Texte de bienvenue */}
      <Text style={styles.title}>Bienvenue chez CampSeeker</Text>
      <Text style={styles.subtitle}>Trouvez l'endroit <Text style={styles.highlight}>parfait</Text> pour bivouaquer</Text>

      {/* Formulaire d'inscription */}
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
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            onPress={() => setIsChecked(!isChecked)}
          />
          <Text style={styles.checkboxLabel}>Accepter les conditions d'utilisation</Text>
        </View>

        {/* Bouton d'inscription */}
        <Bouton label="Inscription" onClick={() => alert('Inscription réussie !')} />

        {/* Lien pour ceux qui ont déjà un compte */}
        <Text style={styles.link} onPress={() => alert('Redirection vers la connexion')}>
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
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FF6D00',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#FF6D00',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  link: {
    color: '#FF6D00',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default PageInscription;

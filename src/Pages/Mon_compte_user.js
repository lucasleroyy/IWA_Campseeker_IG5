import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Bouton from '../components/Bouton';
import { useNavigation } from '@react-navigation/native';

const MonCompteUser = () => {
  const navigation = useNavigation();

  // États pour les données utilisateur pré-remplies
  const [name, setName] = useState("Leroy");
  const [firstName, setFirstName] = useState("Lucas");
  const [address, setAddress] = useState("123 Camping Street");
  const [email, setEmail] = useState("lucas.leroy@example.com");
  const [password, setPassword] = useState("");

  // Fonction pour gérer la sauvegarde du profil
  const handleSaveProfile = () => {
    console.log("Profil modifié :", { name, firstName, address, email, password });
    alert("Profil modifié !");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Salut <Text style={styles.username}>Lucas Leroy</Text> !
        </Text>
        <Text style={styles.memberSince}>Membre depuis XX/XX/XXXX</Text>
      </View>

      <BoiteVerte style={styles.box}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Entrez votre nom"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Prénom</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Entrez votre prénom"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Adresse</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Entrez votre adresse"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Entrez votre email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Modifier le mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre nouveau mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </BoiteVerte>

      <TouchableOpacity
        onPress={handleSaveProfile}
        style={styles.button}>
        <Text style={styles.buttonText}>Modifier le profil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2EDE5',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  username: {
    color: '#D2691E',
  },

  spacing: {
    height: 145,
  },

  memberSince: {
    fontSize: 16,
    color: '#4F4F4F',
    textAlign: 'center',
    marginTop: 10, // Ajout d'un espace entre les deux textes
    marginBottom: 25, 
  },
  box: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#3E6D61',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
    paddingLeft: 10, // Décalage du label vers la droite
  },
  input: {
    width: '91%', // Réduction de la largeur pour décaler le champ légèrement à droite
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#3E6D61',
    marginLeft: 15, // Ajustement du décalage pour un meilleur alignement
  },
  button: {
    marginTop: 30,
    backgroundColor: '#F25C05',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    width: '60%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MonCompteUser;

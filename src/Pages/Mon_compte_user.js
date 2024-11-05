import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Bouton from '../components/Bouton';
import Champ from '../components/Champ';

const MonCompteUser = () => {
  // États pour les données utilisateur pré-remplies
  const [name, setName] = useState('Leroy');
  const [firstName, setFirstName] = useState('Lucas');
  const [address, setAddress] = useState('123 Camping Street');
  const [email, setEmail] = useState('lucas.leroy@example.com');
  const [password, setPassword] = useState('');

  // Fonction pour gérer la sauvegarde du profil
  const handleSaveProfile = () => {
    console.log('Profil modifié :', { name, firstName, address, email, password });
    alert('Profil modifié !');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Salut <Text style={styles.username}>{firstName} {name}</Text> !
        </Text>
        <Text style={styles.memberSince}>Membre depuis XX/XX/XXXX</Text>
      </View>

      <BoiteVerte>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nom</Text>
          <Champ
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Entrez votre nom"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Prénom</Text>
          <Champ
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Entrez votre prénom"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Adresse</Text>
          <Champ
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Entrez votre adresse"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <Champ
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Entrez votre email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Modifier le mot de passe</Text>
          <Champ
            style={styles.input}
            placeholder="Entrez votre nouveau mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </BoiteVerte>

      <Bouton
        onClick={handleSaveProfile}
        label="Modifier le profil"
      />
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
  memberSince: {
    fontSize: 16,
    color: '#4F4F4F',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
    paddingLeft: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#3E6D61',
    alignSelf: 'center',
  },
});

export default MonCompteUser;

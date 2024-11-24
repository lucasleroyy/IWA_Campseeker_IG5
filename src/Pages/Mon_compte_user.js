import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/actions/userActions'; // Importer l'action
import BoiteVerte from '../components/Boite_verte';
import Bouton from '../components/Bouton';
import Champ from '../components/Champ';

const MonCompteUser = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo?.userId); // Récupère le userId du store
  const { userDetails, loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userDetails && userDetails[userId]) {
      const user = userDetails[userId];
      setName(user.lastName || '');
      setFirstName(user.firstName || '');
      setEmail(user.email || '');
      setAddress(''); // Ajoutez l'adresse si elle est disponible
    }
  }, [userDetails, userId]);

  const handleSaveProfile = () => {
    Alert.alert('Profil modifié', 'Vos modifications ont été enregistrées avec succès.');
    console.log('Profil modifié :', { name, firstName, address, email, password });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des données utilisateur...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Erreur : {error}</Text>
      </View>
    );
  }

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

      <Bouton onClick={handleSaveProfile} label="Modifier le profil" />
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
    marginBottom: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    color: '#F25C05',
  },
  memberSince: {
    fontSize: 16,
    color: '#4F4F4F',
    textAlign: 'center',
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

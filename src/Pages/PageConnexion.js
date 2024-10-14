import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Champ from '../components/Champ';
import Bouton from '../components/Bouton';
import { useNavigation } from '@react-navigation/native';

const PageConnexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Ravi de vous revoir chez CampSeeker</Text>
      <Text style={styles.subtitle}>Trouvez l'endroit <Text style={styles.highlight}>parfait</Text> pour bivouaquer</Text>

      <BoiteVerte>
        <Champ placeholder="Email" value={email} onChangeText={setEmail} />
        <Champ placeholder="Mot de passe" secureTextEntry={true} value={password} onChangeText={setPassword} />

        <Bouton label="Connexion" onClick={() => alert('Connexion réussie !')} />

        {/* Lien vers la page d'inscription */}
        <Text style={styles.link} onPress={() => navigation.navigate('PageInscription')}>
          Je n'ai pas de compte
        </Text>

        <Text style={styles.link} onPress={() => alert('Redirection vers la récupération du mot de passe')}>
          Mot de passe oublié
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
  link: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default PageConnexion;

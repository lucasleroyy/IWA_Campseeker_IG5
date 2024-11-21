import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Champ from '../components/Champ';
import Bouton from '../components/Bouton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';

const PageInscription = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleRegister = () => {
    if (!isChecked) {
      alert("Veuillez accepter les conditions d'utilisation pour continuer.");
      return;
    }

    if (email !== confirmEmail) {
      alert("Les emails ne correspondent pas.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!/^\+\d+$/.test(phoneNumber)) {
      alert("Le numéro de téléphone doit être au format international, ex: +123456789.");
      return;
    }

    console.log("Données envoyées :", {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role: 'user', // Ajout d'un rôle par défaut
    });

    dispatch(
      registerUser({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role: 'user', // Rôle par défaut
      })
    )
      .unwrap()
      .then(() => {
        alert('Inscription réussie !');
        navigation.navigate('Connexion');
      })
      .catch((error) => {
        console.error("Erreur d'inscription :", error);
        const errorMessage = error?.message || 'Une erreur est survenue lors de l\'inscription.';
        alert(`Erreur lors de l'inscription : ${errorMessage}`);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenue chez CampSeeker</Text>
      <Text style={styles.subtitle}>
        Trouvez l'endroit <Text style={styles.highlight}>parfait</Text> pour bivouaquer
      </Text>

      <BoiteVerte>
        <Champ placeholder="Nom" value={lastName} onChangeText={setLastName} />
        <Champ placeholder="Prénom" value={firstName} onChangeText={setFirstName} />
        <Champ placeholder="Email" value={email} onChangeText={setEmail} />
        <Champ placeholder="Confirmation email" value={confirmEmail} onChangeText={setConfirmEmail} />
        <Champ placeholder="Mot de passe" secureTextEntry={true} value={password} onChangeText={setPassword} />
        <Champ placeholder="Confirmation mot de passe" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
        <Champ placeholder="Numéro de téléphone" value={phoneNumber} onChangeText={setPhoneNumber} />
      </BoiteVerte>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
          <View style={[styles.checkboxSquare, isChecked && styles.checkboxChecked]} />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          Accepter les{' '}
          <Text style={styles.underlineText} onPress={() => navigation.navigate('PageConditions')}>
            conditions d'utilisation
          </Text>
        </Text>
      </View>

      <Bouton label="Inscription" onClick={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('Connexion')}>
        J'ai déjà un compte
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
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

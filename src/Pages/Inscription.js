import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import BoiteVerte from '../components/Boite_verte';
import Champ from '../components/Champ';
import Bouton from '../components/Bouton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';
import { Ionicons } from '@expo/vector-icons';

const PageInscription = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  
    // Validation mise à jour : vérifier si le numéro contient uniquement des chiffres (minimum 10 chiffres)
    if (!/^\d{10,}$/.test(phoneNumber)) {
      alert("Le numéro de téléphone doit contenir uniquement des chiffres (minimum 10 caractères).");
      return;
    }
  
    console.log("Données envoyées :", {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role: 'user',
    });
  
    dispatch(
      registerUser({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role: 'user',
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <View style={styles.passwordContainer}>
              <Champ
                placeholder="Mot de passe"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
              <Champ
                placeholder="Confirmation mot de passe"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.icon}>
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <Champ placeholder="Numéro de téléphone" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" // Clavier optimisé pour les numéros de téléphone 
            />

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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 40,
    paddingBottom: 50,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    padding: 10,
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
    borderColor: '#000',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSquare: {
    width: 12,
    height: 12,
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000',
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: '#000',
  },
  link: {
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default PageInscription;

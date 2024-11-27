import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BoiteVerte from '../components/Boite_verte';
import Bouton from '../components/Bouton';
import { fetchUserById, updateUserProfile } from '../redux/actions/userActions';
import Champ from "../components/Champ";
import { useTranslation } from "react-i18next";

const MonCompteUser = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo?.userId); // Récupère le userId du store
  const { userDetails, loading, error } = useSelector((state) => state.user);


  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Ajout du champ téléphone
  const { t } = useTranslation(); 

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
      setEmail(user.email || ''); //
      setPhoneNumber(user.phoneNumber || ''); 
    }
  }, [userDetails, userId]);

  const handleSaveProfile = () => {
    if (!phoneNumber) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone.');
      return;
    }

    const updatedUserData = {
      userId,
      firstName: firstName.trim(),
      lastName: name.trim(),
      phoneNumber: phoneNumber.trim(), // Ajout du champ téléphone
    };

    dispatch(updateUserProfile(updatedUserData))
      .unwrap()
      .then(() => {
        Alert.alert('Profil modifié', 'Vos modifications ont été enregistrées avec succès.');
        console.log('Profil modifié :', updatedUserData);
      })
      .catch((error) => {
        Alert.alert('Erreur', `Une erreur est survenue lors de la mise à jour du profil : ${error}`);
        console.error('Erreur lors de la mise à jour du profil :', error);
      });
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
        {t("user.greeting")}, <Text style={styles.username}>{firstName} {name}</Text> !
        </Text>
      </View>

      <BoiteVerte>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{t("user.labels.lastName")}</Text>
          <Champ
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={t("user.placeholders.lastName")}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{t("user.labels.firstName")}</Text>
          <Champ
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder={t("user.placeholders.firstName")}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{t("user.labels.email")}</Text>
          <Champ
            style={[styles.input, styles.disabledInput]} // Champ non modifiable
            value={email}
            placeholder={t("user.placeholders.email")}
            keyboardType="email-address"
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
  <Text style={styles.label}>{t("user.labels.phone")}</Text>
  <Champ
    style={styles.input}
    value={phoneNumber} // Affiche directement le numéro récupéré
    onChangeText={setPhoneNumber}
    keyboardType="phone-pad"
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
  disabledInput: {
    backgroundColor: '#E0E0E0',
    color: '#A0A0A0',
  },
});

export default MonCompteUser;

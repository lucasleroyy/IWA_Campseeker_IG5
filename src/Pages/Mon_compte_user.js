import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BoiteVerte from "../components/Boite_verte";
import { fetchUserById, updateUserProfile } from "../redux/actions/userActions";
import Champ from "../components/Champ";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";

const MonCompteUser = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo?.userId); // Récupère le userId du store
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

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
      setName(user.lastName || "");
      setFirstName(user.firstName || "");
      setEmail(user.email || ""); //
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [userDetails, userId]);

  const submitEdit = () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un numéro de téléphone.");
      return;
    }

    const updatedUserData = {
      userId,
      firstName: firstName.trim(),
      lastName: name.trim(),
      phoneNumber: phoneNumber.trim(),
    };

    dispatch(updateUserProfile(updatedUserData))
      .unwrap()
      .then(() => {
        Alert.alert(
          "Profil modifié",
          "Vos modifications ont été enregistrées avec succès."
        );
        setEditModalVisible(false);
      })
      .catch((error) => {
        Alert.alert(
          "Erreur",
          `Une erreur est survenue lors de la mise à jour du profil : ${error}`
        );
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
        <Text style={{ color: "red" }}>Erreur : {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Image
            source={require("../../assets/Logo.png")}
            style={styles.logo}
      />
      <Text style={styles.titre}>
          Salut{" "}
          <Text style={{ color: "#F25C05" }}>
            {firstName} {name}
          </Text>{" "}
          !
        </Text>

      <BoiteVerte>
        <View style={styles.headerContainer}>
        <TouchableOpacity
              onPress={() => setEditModalVisible(true)}
              style={styles.icons}
            >
              <MaterialIcons name="edit" size={30} color="#F25C05" />
            </TouchableOpacity>
            </View>
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
</ScrollView>

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier le Profil</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Nom"
            />
            <TextInput
              style={styles.textInput}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Prénom"
            />
            <TextInput
              style={[styles.textInput, styles.disabledInput]}
              value={email}
              placeholder="Email"
              editable={false}
            />
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Téléphone"
              keyboardType="phone-pad"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={submitEdit}
              >
                <Text style={styles.submitButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 5,
    paddingLeft: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "90%",
    alignSelf: "center",
    marginTop: -15,
  },
  icons: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,  
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F25C05",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  disabledInput: {
    backgroundColor: "#E0E0E0",
    color: "#A0A0A0",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#F25C05",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default MonCompteUser;
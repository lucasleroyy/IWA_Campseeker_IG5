import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { reportFlag } from "../redux/actions/flagsActions";

const Commentaire = ({ commentId, pseudo, note, texte }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo?.userId);

  const submitFlag = () => {
    if (!reason.trim()) {
      Alert.alert(
        "Erreur",
        "Veuillez saisir une raison pour signaler ce commentaire."
      );
      return;
    }

    dispatch(
      reportFlag({
        userId,
        commentId, // Utilisation de commentId
        reason,
      })
    )
      .then(() => {
        Alert.alert("Succès", "Commentaire signalé avec succès.");
        setModalVisible(false);
        setReason(""); // Réinitialise la raison
      })
      .catch((error) => {
        console.error("Erreur lors du signalement :", error);
        Alert.alert("Erreur", "Impossible de signaler le commentaire.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pseudo}>{pseudo || "Utilisateur inconnu"}</Text>
        <View style={styles.actions}>
          <View style={styles.note}>
            {[...Array(note || 0)].map((_, index) => (
              <MaterialIcons
                key={index}
                name="star"
                size={15}
                color="#FF6D00"
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!userId) {
                Alert.alert(
                  "Erreur",
                  "Vous devez être connecté pour signaler un commentaire."
                );
                return;
              }
              setModalVisible(true);
            }}
          >
            <MaterialIcons name="report" size={25} color="#F25C05" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator} />
      <Text style={styles.texte}>{texte || "Texte non disponible"}</Text>

      {/* Modal pour signaler un commentaire */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Signaler ce commentaire</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Raison du signalement"
              value={reason}
              onChangeText={setReason}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setReason("");
                }}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={submitFlag}
              >
                <Text style={styles.submitButtonText}>Envoyer</Text>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pseudo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#FF6D00",
    marginVertical: 5,
  },
  texte: {
    fontSize: 15,
    color: "#000",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#F25C05",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Commentaire;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnsweredQuestions, createQuestion } from "../redux/actions/supportActions";
import BoiteBlanche from "../components/Boite_blanche";
import { AntDesign } from "@expo/vector-icons";
import Bouton from "../components/Bouton";

const FAQUser = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const dispatch = useDispatch();
  const { answeredQuestions, loading, error } = useSelector((state) => state.support);
  const userId = useSelector((state) => state.user.userInfo?.userId); // Assuming user info is available

  useEffect(() => {
    // Fetch answered questions on load
    dispatch(fetchAnsweredQuestions());
  }, [dispatch]);

  const toggleQuestion = (questionId) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) {
      Alert.alert("Erreur", "Veuillez saisir une question.");
      return;
    }

    dispatch(
      createQuestion({
        userId, 
        question: newQuestion,
      })
    )
      .unwrap()
      .then(() => {
        Alert.alert("Succès", "Votre question a été ajoutée.");
        setNewQuestion("");
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la question :", error);
        Alert.alert("Erreur", "Impossible d'ajouter la question.");
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des questions...</Text>
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>F.A.Q</Text>
      {answeredQuestions.map((question) => (
        <BoiteBlanche key={question.questionId}>
          <TouchableOpacity
            style={styles.questionContainer}
            onPress={() => toggleQuestion(question.questionId)}
          >
            <Text style={styles.questionText}>{question.question}</Text>
            <AntDesign
              name={activeQuestion === question.questionId ? "up" : "down"}
              size={20}
              color="#4F4F4F"
            />
          </TouchableOpacity>
          {activeQuestion === question.questionId && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{question.reponse}</Text>
            </View>
          )}
        </BoiteBlanche>
      ))}

      <Bouton label="Poser une question" onClick={() => setModalVisible(true)} />

      {/* Modal for adding a new question */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter une question</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Votre question..."
              value={newQuestion}
              onChangeText={setNewQuestion}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNewQuestion("");
                }}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSubmitQuestion}
              >
                <Text style={styles.submitButtonText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F2EDE5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#F25C05",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
  },
  questionText: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  answerContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
  },
  answerText: {
    fontSize: 14,
    color: "#4F4F4F",
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
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: "top",
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

export default FAQUser;

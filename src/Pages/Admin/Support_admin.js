import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Animated,
  Keyboard,
  Alert,
} from "react-native";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOpenQuestions,
  answerQuestion,
  deleteQuestion,
} from "../../redux/actions/supportActions";
import { MaterialIcons } from "@expo/vector-icons";
import Boite from "../../components/Boite_blanche";
import Bouton from "../../components/Bouton";

const SupportAdmin = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [response, setResponse] = useState("");
  
    const dispatch = useDispatch();
    const { openQuestions, loading, error } = useSelector((state) => state.support);
  
    useEffect(() => {
      dispatch(fetchOpenQuestions());
    }, [dispatch]);
  
    const handleOpenModal = (question) => {
      setSelectedQuestion(question);
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
      setResponse("");
      Keyboard.dismiss();
    };
  
    const handleSubmitResponse = () => {
      if (!selectedQuestion || !response) return;
  
      dispatch(
        answerQuestion({
          questionId: selectedQuestion.questionId,
          reponse: response,
        })
      )
        .unwrap()
        .then(() => {
          setResponse("");
          handleCloseModal();
          dispatch(fetchOpenQuestions());
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi de la réponse :", error);
          Alert.alert("Erreur", "Impossible d'envoyer la réponse.");
        });
    };
  
    const handleDeleteQuestion = (questionId) => {
      Alert.alert(
        "Confirmation",
        "Voulez-vous vraiment supprimer cette question ?",
        [
          {
            text: "Annuler",
            style: "cancel",
          },
          {
            text: "Supprimer",
            onPress: () => {
              dispatch(deleteQuestion(questionId))
                .unwrap()
                .then(() => {
                  Alert.alert("Succès", "Question supprimée avec succès.");
                  dispatch(fetchOpenQuestions());
                })
                .catch((error) => {
                  console.error("Erreur lors de la suppression :", error);
                  Alert.alert("Erreur", "Impossible de supprimer la question.");
                });
            },
          },
        ]
      );
    };
  
    const renderRightActions = (progress, dragX, questionId) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });
  
      return (
        <TouchableOpacity
          onPress={() => handleDeleteQuestion(questionId)}
          style={styles.deleteButton}
        >
          <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
            X
          </Animated.Text>
        </TouchableOpacity>
      );
    };
  
    if (loading) {
      return <Text>Chargement des questions...</Text>;
    }
  
    if (error) {
      return <Text style={styles.errorText}>Erreur : {error}</Text>;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Questions en attente</Text>
        <Boite style={styles.boite}>
          {openQuestions.map((question) => (
            <Swipeable
              key={question.questionId}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, question.questionId)
              }
            >
              <View style={styles.questionContainer}>
                <Text style={styles.question}>{question.question}</Text>
                <TouchableOpacity
                  style={styles.repondreButton}
                  onPress={() => handleOpenModal(question)}
                >
                  <Text style={styles.repondreText}>Répondre</Text>
                </TouchableOpacity>
              </View>
            </Swipeable>
          ))}
        </Boite>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <MaterialIcons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
  
                <Text style={styles.modalTitle}>Répondre à la question</Text>
                <Text style={styles.modalQuestion}>{selectedQuestion?.question}</Text>
  
                <TextInput
                  style={styles.textInput}
                  placeholder="Votre réponse..."
                  value={response}
                  onChangeText={setResponse}
                  multiline
                />
  
                <View style={styles.buttonContainer}>
                  <Bouton label="Envoyer" onClick={handleSubmitResponse} color="#F25C05" />
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F25C05",
    marginBottom: 20,
  },
  boite: {
    width: "90%",
    borderColor: "#F25C05",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFF",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    backgroundColor: "#FFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  question: {
    flex: 1,
    flexWrap: "wrap",
    color: "#000",
    marginRight: 10,
  },
  repondreButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F25C05",
    borderRadius: 5,
    alignItems: "center",
  },
  repondreText: {
    color: "#FFF",
    fontSize: 16,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    backgroundColor: "#ff3b30",
    borderRadius: 10,
    height: 40,
    marginTop: 10,
    marginLeft: 30,
  },
  deleteText: {
    color: "#FFF",
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#F25C05",
    borderRadius: 20,
    padding: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#F25C05",
  },
  modalQuestion: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 80,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
  },
});

export default SupportAdmin;

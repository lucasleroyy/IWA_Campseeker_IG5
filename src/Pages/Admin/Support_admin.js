import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';  // Import du Swipeable
import { MaterialIcons } from '@expo/vector-icons';
import Boite from '../../components/Boite_blanche';
import Bouton from '../../components/Bouton';

const SupportAdmin = ({ route }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [questions, setQuestions] = useState([
        { id: 1, text: "Comment modifier son profil ?" },
        { id: 2, text: "Comment donner une note ?" },
        { id: 3, text: "Comment filtrer ma recherche ?" },
        { id: 4, text: "Comment consulter mes favoris ?" },
        { id: 5, text: "Comment changer la langue ?" },
    ]);

    const handleOpenModal = (question) => {
        setSelectedQuestion(question);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setResponse('');
    };

    const handleSubmitResponse = () => {
        console.log(`Réponse à la question "${selectedQuestion.text}": ${response}`);
        handleCloseModal();
    };

    const handleDeleteQuestion = (id) => {
        setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    };

    // Composant à afficher lorsqu'on glisse vers la gauche (le bouton supprimer)
    const renderRightActions = (progress, dragX, questionId) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity onPress={() => handleDeleteQuestion(questionId)} style={styles.deleteButton}>
                <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>X</Animated.Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Questions en attente</Text>
            <Boite style={styles.boite}>
                {questions.map((question) => (
                    <Swipeable
                        key={question.id}
                        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, question.id)}
                    >
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>{question.text}</Text>
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
            <View style={styles.buttonQuestionContainer}>
                <Bouton label="Voir les questions" />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <MaterialIcons name="close" size={24} color="#FFF" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Répondre à la question</Text>
                        <Text style={styles.modalQuestion}>{selectedQuestion.text}</Text>

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
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(166, 116, 55, 0.1)',
        alignItems: 'center',
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F25C05',
        marginBottom: 20,
    },
    boite: {
        width: '90%',
        borderColor: '#F25C05',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FFF',
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        backgroundColor: '#FFF',
    },
    question: {
        flex: 1,
        flexWrap: 'wrap',
        color: '#000',
        marginRight: 10,
    },
    repondreButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F25C05',
        borderRadius: 5,
        alignItems: 'center',
    },
    repondreText: {
        color: '#FFF',
        fontSize: 16,
    },
    // Styles pour le swipe
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        backgroundColor: '#ff3b30',
        borderRadius: 10,
        height: 40, 
        marginTop: 10,
        marginLeft: 30,
    },
    deleteText: {
        color: '#FFF',
        fontSize: 30,
    },
    // Styles pour le modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#F25C05',
        borderRadius: 20,
        padding: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#F25C05',
    },
    modalQuestion: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        height: 80,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
    },
    buttonQuestionContainer: {
        width: '90%',
        marginVertical: 30,
    },
});

export default SupportAdmin;

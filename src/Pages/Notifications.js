import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";
import BoiteBlanche from "../components/Boite_blanche";
import Photo from "../components/Photo";
import Bouton from "../components/Bouton";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const PageNotifications = () => {
  const [activeNotification, setActiveNotification] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [response, setResponse] = useState("");

  const notifications = [
    {
      id: 1,
      placeName: "Lac des Sapins",
      photo: require("../../assets/bivouac.png"),
      username: "@User1",
      comment: "Est-ce qu'il y a des randonnées à proximité?",
    },
    {
      id: 2,
      placeName: "Montagne Verte",
      photo: require("../../assets/bivouac3.png"),
      username: "@User2",
      comment: "Super endroit pour camper, merci !",
    },
  ];

  const favorisNotifications = [
    { id: 1, username: "@User1", placeName: "Lac Bleu" },
    { id: 2, username: "@User2", placeName: "Forêt de Chênes" },
  ];

  const toggleNotification = (id) => {
    setActiveNotification(activeNotification === id ? null : id);
  };

  const handleOpenModal = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setResponse("");
    Keyboard.dismiss();
  };

  const handleSubmitResponse = () => {
    console.log(`Réponse au commentaire "${selectedNotification.comment}": ${response}`);
    handleCloseModal();
  };

  const renderFavorisItem = ({ item }) => (
    <View style={styles.favorisRow}>
      <Text style={styles.favorisText}>
        {item.username} a ajouté votre lieu {item.placeName} à ses favoris
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titre}>
          Mes <Text style={{ color: "#F25C05" }}>notifications</Text>
        </Text>

        <Text style={styles.sectionTitle}>COMMENTAIRES</Text>
        {notifications.map((notif) => (
          <BoiteBlanche key={notif.id}>
            <TouchableOpacity
              style={styles.notifContainer}
              onPress={() => toggleNotification(notif.id)}
            >
              <View style={styles.photoAndNameContainer}>
                <Photo imageUrl={notif.photo} width={150} height={100} />
                <Text style={styles.placeName}>{notif.placeName}</Text>
              </View>
              <AntDesign
                name={activeNotification === notif.id ? "up" : "down"}
                size={20}
                color="#4F4F4F"
              />
            </TouchableOpacity>

            {activeNotification === notif.id && (
              <View style={styles.commentContainer}>
                <Text style={styles.username}>{notif.username}</Text>
                <Text style={styles.comment}>{notif.comment}</Text>
                <Bouton label="Répondre" onClick={() => handleOpenModal(notif)} />
              </View>
            )}
          </BoiteBlanche>
        ))}

        <Text style={styles.sectionTitle}>FAVORIS</Text>
        <BoiteBlanche>
          <FlatList
            data={favorisNotifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderFavorisItem}
          />
        </BoiteBlanche>
      </ScrollView>

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

            <Text style={styles.modalTitle}>Répondre au commentaire</Text>
            {selectedNotification && (
              <Text style={styles.modalQuestion}>{selectedNotification.comment}</Text>
            )}

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
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: "5%",
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  notifContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  photoAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  commentContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderTopColor: "#E0E0E0",
    borderTopWidth: 1,
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F25C05",
  },
  comment: {
    fontSize: 14,
    color: "#4F4F4F",
    marginVertical: 5,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: "5%",
    marginTop: 40,
  },
  favorisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  favorisText: {
    fontSize: 16,
    color: "#333",
  },
});

export default PageNotifications;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TextInput, Modal } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import BoiteBlanche from "../../components/Boite_blanche";
import Bouton from "../../components/Bouton";
import { fetchEquipments, addEquipment, removeEquipment } from '../../redux/actions/equipmentActions';
import { Alert } from "react-native";

const GestionEquipement = () => {
  const { equipments, loading, error } = useSelector(state => state.equipments);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEquipement, setNewEquipement] = useState("");
  const dispatch = useDispatch();

  // Récupération des équipements à l'initialisation
  useEffect(() => {
    dispatch(fetchEquipments());
  }, [dispatch]);

  const handleDeleteEquipement = (item) => {
    dispatch(removeEquipment(item.equipmentId))
      .unwrap()
      .then(() => {
        console.log("Equipment deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting equipment:", error);
      });
  };

  const handleDeleteConfirmation = (item) => {
    Alert.alert(
      "Supprimer cet équipement",
      `Êtes-vous sûr de vouloir supprimer "${item.name}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Oui",
          onPress: () => handleDeleteEquipement(item), // Appelle la fonction réelle de suppression
        },
      ]
    );
  };

  
  

  // Gestion de l'ajout d'un équipement
  const handleAddEquipement = () => {
    if (newEquipement.trim()) {
      dispatch(addEquipment({ name: newEquipement })); // Utilise Redux pour ajouter
      setNewEquipement("");
      setModalVisible(false);
    }
  };

  // Affichage des équipements
  const renderEquipement = ({ item }) => (
    <TouchableWithoutFeedback onLongPress={() => handleDeleteEquipement(item)}>
      <View style={styles.equipementRow}>
        <Text style={styles.equipementText}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDeleteConfirmation(item)}>
          <Text style={styles.deleteText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>
        Gérer les <Text style={{ color: "#F25C05" }}>équipements</Text>
      </Text>

      {/* Affichage des équipements avec gestion des erreurs et du chargement */}
      {loading ? (
        <Text style={styles.loadingText}>Chargement des équipements...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Erreur : {error}</Text>
      ) : (
        <BoiteBlanche>
          <FlatList
            data={equipments} // Correctement récupéré depuis Redux
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())} // Gère les clés uniques
            renderItem={renderEquipement}
          />
        </BoiteBlanche>
      )}

      <Bouton
        label="Ajouter un équipement"
        onClick={() => setModalVisible(true)}
      />

      {/* Modal pour l'ajout d'équipement */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter un équipement</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de l'équipement"
              value={newEquipement}
              onChangeText={setNewEquipement}
            />
            <Bouton label="Confirmer" onClick={handleAddEquipement} />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
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
    paddingVertical: 50,
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  equipementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  equipementText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  deleteText: {
    color: "#FF6D00",
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#F25C05",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cancelText: {
    color: "#FF6D00",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default GestionEquipement;

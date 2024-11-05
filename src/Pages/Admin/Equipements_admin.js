import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BoiteBlanche from '../../components/Boite_blanche';
import Bouton from '../../components/Bouton';

const GestionEquipement = () => {
    const [equipements, setEquipements] = useState(['Électricité', 'Sanitaires', 'Wifi', 'Abrité', 'Parking']);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEquipement, setNewEquipement] = useState('');

  const handleDeleteEquipement = (item) => {
    setEquipements((prevEquipements) => prevEquipements.filter((equip) => equip !== item));
  };

  const handleAddEquipement = () => {
    if (newEquipement.trim()) {
      setEquipements((prevEquipements) => [...prevEquipements, newEquipement]);
      setNewEquipement('');
      setModalVisible(false);
    }
  };

  const renderEquipement = ({ item }) => (
    <TouchableWithoutFeedback onLongPress={() => handleDeleteEquipement(item)}>
      <View style={styles.equipementRow}>
        <Text style={styles.equipementText}>{item}</Text>
        <TouchableOpacity onPress={() => handleDeleteEquipement(item)}>
          <Text style={styles.deleteText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
    return (
        <View style={styles.container}>
            <Text style={styles.titre}>
            Gérer les <Text style={{ color: '#F25C05' }}>équipements</Text>
            </Text>
       
            <BoiteBlanche>
        <FlatList
          data={equipements}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderEquipement}
        />
      </BoiteBlanche>

      <Bouton label="Ajouter un équipement" onClick={() => setModalVisible(true)} />

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
        backgroundColor: 'rgba(166, 116, 55, 0.1)',
        paddingVertical: 50,
      },
    titre: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000',
      },
      subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
      },
      equipementRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
      },
      equipementText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      deleteText: {
        color: '#FF6D00',
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#F25C05',
      },
      input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      cancelText: {
        color: '#FF6D00',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
      },
    });

export default GestionEquipement;
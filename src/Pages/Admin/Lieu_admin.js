import React, { useEffect } from "react";
import {View,ScrollView,StyleSheet,Dimensions,Text,Alert,TouchableOpacity,} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { fetchLocationById } from "../../redux/actions/locationsActions";
import BoiteVerte from '../../components/Boite_verte';
import Champ from '../../components/Champ';
import Bouton from '../../components/Bouton';
import ScrollHorizontal from '../../components/Scroll_horizontal';
import Commentaire from '../../components/Commentaire';
import Photo from '../../components/Photo';
import Champ_selection from '../../components/Champ_selection';
import Carte from '../../components/Carte';

const { width } = Dimensions.get('window');

const LieuAdmin = ({ route }) => {
    const { id, removeLocation } = route.params;  // Récupère l'id du lieu et la fonction removeLocation
    const dispatch = useDispatch();

    const { locationDetails, loading, error } = useSelector(
      (state) => state.locations
    );
    const apiUrl = useSelector((state) => state.config.apiUrl); 

    useEffect(() => {
      if (id) {
        dispatch(fetchLocationById(id));
      }
    }, [id, dispatch]);

  
    const handleDelete = () => {
      if (removeLocation) {
        removeLocation(id); // Supprime l'élément de la liste
        navigation.goBack(); // Retourne à la page précédente
      }
    };

    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Chargement des détails...</Text>
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={styles.container}>
          <Text>Erreur : {error}</Text>
        </View>
      );
    }
  
    if (!locationDetails) {
      return (
        <View style={styles.container}>
          <Text>Lieu introuvable.</Text>
        </View>
      );
    }

      // Données récupérées
  const { name, adresse, photo, equipments } = locationDetails;

  // Construction de l'URL de la photo
  const imageUrl = photo?.photoId
    ? `${apiUrl}/photos/get/${photo.photoId}` // Construit une URL valide
    : null;
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.titre}>{name}</Text>
          <BoiteVerte>

          <View style={styles.photoContainer}>
            {imageUrl && (
              <Photo imageUrl={imageUrl} width="100%" height={200} />
            )}
          </View>
          <Champ
            placeholder={`${adresse}, ${locationDetails.ville} ${locationDetails.codePostal}`}
            editable={false}
          />

          <Carte
            ville={`${adresse}, ${locationDetails.ville}`}
            style={styles.map}
          />
          <Text style={styles.sectionTitle}>ÉQUIPEMENTS :</Text>
          <View style={styles.Equipementcontainer}>
            {equipments.map((equipment) => (
              <Champ_selection
                key={equipment.equipmentId}
                label={equipment.name}
                isSelected={true}
              />
            ))}
          </View>

            <Text style={styles.sectionTitle}>COMMENTAIRES :</Text>
            <Bouton label="Supprimer le lieu" onClick={handleDelete} />
          </BoiteVerte>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(166, 116, 55, 0.1)',
      paddingBottom: 50,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: '5%',
    },
    titre: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#F25C05',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginLeft: '5%',
      marginVertical: 10,
    },
    Equipementcontainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      padding: 10,
    },
    map: {
      width: '90%',  // Assure que la carte est large mais laisse un peu d'espace sur les côtés
      height: 200,  // Ajuste la hauteur selon ce qui convient
      marginBottom: 20,
      alignSelf: 'center',
    },
  });
export default LieuAdmin;
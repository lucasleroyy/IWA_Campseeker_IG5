import React from 'react';
import { ScrollView, View,Image, Text, StyleSheet } from 'react-native';
import ChampRedirection from '../../components/Champ_redirection';
import { useDispatch } from 'react-redux';
import { resetStore } from '../../redux/actions/configAction';
import { persistor } from '../../redux/store';

const AccueilAdmin = ({ navigation }) => {
  const dispatch = useDispatch();
  

  const handleLogout = () => {
    dispatch(resetStore());
    persistor.purge(); // Réinitialise complètement redux-persist
    navigation.navigate('Connexion');
  };
  


    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={require('../../../assets/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>Bienvenue cher <Text style={{ color: '#F25C05' }}>Admin</Text> !</Text>
                <ChampRedirection label="Gérer les commentaire" targetScreen="ListeLieuxCommentaireAdmin" navigation={navigation} />
                <ChampRedirection label="Gérer les lieux" targetScreen="ListeLieuxInfoAdmin" navigation={navigation} />
                <ChampRedirection label="Gérer les équipement" targetScreen="GestionEquipement" navigation={navigation} />
                <ChampRedirection label="Gérer le support" targetScreen="SupportAdmin" navigation={navigation} />
                <ChampRedirection label="Déconnexion" onPress={handleLogout} style={styles.deconnexion} />
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
    scrollContent: {
      flexGrow: 1,
      paddingVertical: '15%',
      alignItems: 'center',
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    section: {
      width: '90%',
      marginVertical: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    deconnexion: {
      color: '#F2994A',
    },
});

export default AccueilAdmin;
import React from 'react';
import { ScrollView, View,Image, Text, StyleSheet } from 'react-native';
import ChampRedirection from '../../components/Champ_redirection';

const AccueilAdmin = ({ navigation }) => {

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={require('../../../assets/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>Bienvenue cher <Text style={{ color: '#F25C05' }}>Admin</Text> !</Text>
                <ChampRedirection label="Gérer les commentaire" targetScreen="ListeLieuxCommentaireAdmin" navigation={navigation} />
                <ChampRedirection label="Gérer les lieux" targetScreen="ListeLieuxInfoAdmin" navigation={navigation} />
                <ChampRedirection label="Gérer les équipement" targetScreen="GestionEquipement" navigation={navigation} />
                <ChampRedirection label="Gérer le support" targetScreen="SupportAdmin" navigation={navigation} />
            </ScrollView>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6F6F6',
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
});

export default AccueilAdmin;
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import ChampRedirection from '../components/Champ_redirection';
import Bandeau from '../components/Bandeau';

const PageProfil = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Profil</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GÉNÉRAL</Text>
          <ChampRedirection label="Admin" targetScreen="AccueilAdmin" navigation={navigation} />
          <ChampRedirection label="Mon compte" targetScreen="MonCompte" navigation={navigation} />
          <ChampRedirection label="Mes lieux" targetScreen="MesLieux" navigation={navigation} />
          <ChampRedirection label="Paramètres" targetScreen="Parametres" navigation={navigation} />
          <ChampRedirection label="Notifications" targetScreen="Notifications" navigation={navigation} icon="bell" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AIDE</Text>
          <ChampRedirection label="F.A.Q" targetScreen="faq_user" navigation={navigation} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LÉGAL</Text>
          <ChampRedirection label="Condition de services" targetScreen="ConditionsService" navigation={navigation} />
          <ChampRedirection label="Politique de confidentialité" targetScreen="PolitiqueConfidentialite" navigation={navigation} />
        </View>

        <View style={styles.section}>
          <ChampRedirection label="Déconnexion" targetScreen="Deconnexion" navigation={navigation} style={styles.deconnexion} />
        </View>
      </ScrollView>

      <Bandeau currentPage="ProfilUser" onNavigate={navigation.navigate} />
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F25C05',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: '5%',
    marginBottom: 10,
  },
  deconnexion: {
    color: '#F2994A',
  },
});

export default PageProfil;

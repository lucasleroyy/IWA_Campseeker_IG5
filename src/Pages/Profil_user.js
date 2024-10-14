import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import ChampRedirection from '../components/Champ_redirection';
import Bandeau from '../components/Bandeau';

const PageProfil = ({ navigation }) => {
  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
       
        <Text style={styles.title}>Profil</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GÉNÉRAL</Text>
          <ChampRedirection label="Mon compte" targetScreen="MonCompte" />
          <ChampRedirection label="Mes lieux" targetScreen="MesLieux" />
          <ChampRedirection label="Paramètres" targetScreen="Parametres" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AIDE</Text>
          <ChampRedirection label="F.A.Q" targetScreen="FAQ" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LÉGAL</Text>
          <ChampRedirection label="Condition de services" targetScreen="ConditionServices" />
          <ChampRedirection label="Politique de confidentialité" targetScreen="PolitiqueConfidentialite" />
        </View>

        <View style={styles.section}>
          <ChampRedirection label="Déconnexion" targetScreen="Deconnexion" style={styles.deconnexion} />
        </View>
      </ScrollView>

      <Bandeau currentPage="Profile" onNavigate={handleNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: 30, 
  },
  scrollContent: {
    paddingBottom: 80, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2994A',
    textAlign: 'center',
    marginVertical: 10, 
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


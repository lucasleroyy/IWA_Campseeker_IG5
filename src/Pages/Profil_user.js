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
          <ChampRedirection label="Mon compte" targetScreen="MonCompte" navigation={navigation} />
          <ChampRedirection label="Mes lieux" targetScreen="MesLieux" navigation={navigation} />
          <ChampRedirection label="Paramètres" targetScreen="Parametres" navigation={navigation} />
          {/* Ajouter une nouvelle option Notifications avec une icône */}
          <ChampRedirection 
            label="Notifications" 
            targetScreen="Notifications" 
            navigation={navigation} 
            icon="bell"  // Icône de cloche
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AIDE</Text>
          <ChampRedirection label="F.A.Q" targetScreen="FAQ" navigation={navigation} />
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
    paddingTop: 50, 
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

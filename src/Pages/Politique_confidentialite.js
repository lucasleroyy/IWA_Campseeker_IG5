import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BoiteBlanche from '../components/Boite_blanche'; 
import { useTheme } from "../ThemeContext";
import createGlobalStyles from "../styles/globalStyles";


const PolitiqueConfidentialite = () => {
  const { isDarkMode } = useTheme();

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? "#333333" : "rgba(166, 116, 55, 0.1)" },
    ]}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
       
      <Text style={styles.title}>Politique de Confidentialité</Text>

      <BoiteBlanche>
      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.text}>
        Bienvenue sur CampSeeker, une plateforme dédiée à la mise en relation de randonneurs et de propriétaires de logements. Cette politique de confidentialité décrit comment nous collectons, utilisons, partageons et protégeons vos informations personnelles lorsque vous utilisez notre service.
      </Text>

      <Text style={styles.sectionTitle}>2. Données Collectées</Text>
      <Text style={styles.text}>
        Lorsque vous utilisez CampSeeker, nous collectons plusieurs types de données personnelles :
        {"\n"}- Données d’inscription : telles que votre nom, adresse e-mail, et mot de passe.
        {"\n"}- Données de profil : comme votre photo de profil, vos préférences de rando ou de logement.
        {"\n"}- Données de transaction : informations liées à vos réservations ou paiements effectués sur la plateforme.
        {"\n"}- Données d’utilisation : incluant les logs de connexion, l’utilisation des services, et les interactions avec les autres utilisateurs.
      </Text>

      <Text style={styles.sectionTitle}>3. Finalités de la Collecte des Données</Text>
      <Text style={styles.text}>
        Nous utilisons vos données pour les finalités suivantes :
        {"\n"}- Prestation du service : pour vous permettre d’utiliser notre plateforme, effectuer des réservations, et entrer en contact avec les propriétaires de logements.
        {"\n"}- Amélioration de l’expérience utilisateur : pour personnaliser les recommandations et les fonctionnalités en fonction de vos préférences.
        {"\n"}- Sécurité : pour protéger vos données contre tout accès non autorisé et assurer la sécurité de la plateforme.
        {"\n"}- Marketing : pour vous envoyer des offres spéciales ou des mises à jour, si vous y avez consenti.
      </Text>

      <Text style={styles.sectionTitle}>4. Partage des Données</Text>
      <Text style={styles.text}>
        Vos données peuvent être partagées avec des tiers dans les cas suivants :
        {"\n"}- Propriétaires de logements : lorsque vous effectuez une réservation, certaines informations personnelles sont partagées avec les hôtes pour organiser votre séjour.
        {"\n"}- Prestataires de service : nous faisons appel à des prestataires pour traiter les paiements, envoyer des e-mails ou analyser l’utilisation de la plateforme.
        {"\n"}- Obligations légales : en cas de demande judiciaire ou pour respecter une obligation légale.
      </Text>

      <Text style={styles.sectionTitle}>5. Vos Droits en Matière de Protection des Données</Text>
      <Text style={styles.text}>
        En tant qu'utilisateur situé dans l'Union européenne, vous bénéficiez des droits suivants en vertu du Règlement Général sur la Protection des Données (RGPD) :
        {"\n"}- Accès : vous pouvez demander à accéder aux informations que nous détenons sur vous.
        {"\n"}- Rectification : vous avez le droit de corriger toute information inexacte ou incomplète.
        {"\n"}- Suppression : vous pouvez demander la suppression de vos données personnelles.
        {"\n"}- Limitation : vous avez le droit de limiter le traitement de vos données dans certaines circonstances.
        {"\n"}- Portabilité : vous pouvez demander à recevoir vos données dans un format structuré, couramment utilisé, et lisible par machine.
        {"\n"}- Opposition : vous avez le droit de vous opposer à l’utilisation de vos données personnelles, notamment à des fins de marketing direct.
      </Text>

      <Text style={styles.sectionTitle}>6. Conservation des Données</Text>
      <Text style={styles.text}>
        Nous conservons vos données aussi longtemps que nécessaire pour vous fournir nos services et pour des raisons légales ou commerciales. Vos données seront supprimées ou anonymisées une fois leur utilisation justifiée par les finalités initiales terminée.
      </Text>

      <Text style={styles.sectionTitle}>7. Sécurité des Données</Text>
      <Text style={styles.text}>
        Nous prenons la sécurité de vos données très au sérieux. Nous avons mis en place des mesures de sécurité techniques et organisationnelles pour protéger vos informations contre la perte, l'accès non autorisé, l'altération ou la divulgation.
      </Text>

      <Text style={styles.sectionTitle}>8. Transfert International des Données</Text>
      <Text style={styles.text}>
        Vos informations peuvent être transférées vers des pays en dehors de l’Union européenne, où les lois sur la protection des données peuvent différer de celles en vigueur dans votre pays. Dans ces cas, nous nous assurons que vos données bénéficient d’un niveau de protection équivalent, notamment par le biais de clauses contractuelles types approuvées par la Commission européenne.
      </Text>

      <Text style={styles.sectionTitle}>9. Modifications de la Politique de Confidentialité</Text>
      <Text style={styles.text}>
        Nous pouvons mettre à jour cette politique de confidentialité à tout moment. Les modifications prendront effet dès leur publication sur cette page. Nous vous encourageons à consulter cette page régulièrement pour rester informé de la manière dont nous protégeons vos données.
      </Text>

      <Text style={styles.sectionTitle}>10. Contact</Text>
      <Text style={styles.text}>
        Si vous avez des questions concernant cette politique de confidentialité ou si vous souhaitez exercer vos droits en matière de protection des données, veuillez nous contacter à l’adresse suivante : **support@campseeker.com**.
      </Text>
      </BoiteBlanche>
     
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50, 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: '5%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F25C05',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default PolitiqueConfidentialite;

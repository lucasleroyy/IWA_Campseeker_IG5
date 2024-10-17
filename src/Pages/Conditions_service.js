import React from 'react';
import { ScrollView,View, Text, StyleSheet } from 'react-native';
import BoiteBlanche from '../components/Boite_blanche';  // Assurez-vous que le chemin est correct

const Conditions_service = () => {
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Conditions Générales d'Utilisation</Text>

      <BoiteBlanche>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          Bienvenue sur l'application CampSeeker. En accédant ou en utilisant notre application, vous acceptez de vous conformer aux présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, nous vous invitons à ne pas utiliser l'application.
        </Text>
    
        <Text style={styles.sectionTitle}>2. Modification des Conditions</Text>
        <Text style={styles.text}>
          CampSeeker se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page. Nous vous recommandons de consulter régulièrement cette page pour être informé des changements.
        </Text>
      
        <Text style={styles.sectionTitle}>3. Utilisation Acceptable de l'Application</Text>
        <Text style={styles.text}>
          Vous acceptez d'utiliser l'application CampSeeker dans le respect des lois et règlements en vigueur. Vous ne devez pas utiliser l'application pour : {"\n"}
          - Diffuser du contenu illégal, diffamatoire, ou haineux.{"\n"}
          - Perturber les opérations de l'application ou compromettre sa sécurité.
        </Text>
     
        <Text style={styles.sectionTitle}>4. Propriété Intellectuelle</Text>
        <Text style={styles.text}>
          Tous les contenus présents sur l'application CampSeeker, y compris les textes, images, logos, et éléments graphiques, sont protégés par les lois sur la propriété intellectuelle. Toute reproduction ou utilisation non autorisée de ces contenus est strictement interdite.
        </Text>
      
        <Text style={styles.sectionTitle}>5. Collecte et Utilisation des Données</Text>
        <Text style={styles.text}>
          En utilisant l'application, vous acceptez que nous collections et utilisions vos données personnelles conformément à notre politique de confidentialité. Nous nous engageons à protéger vos informations et à ne les divulguer qu'avec votre consentement ou lorsque la loi l'exige.
        </Text>
      
        <Text style={styles.sectionTitle}>6. Limitation de Responsabilité</Text>
        <Text style={styles.text}>
          CampSeeker décline toute responsabilité quant aux dommages pouvant résulter de l'utilisation de l'application, y compris les pertes de données, les interruptions de service, ou tout autre préjudice indirect.
        </Text>
    
        <Text style={styles.sectionTitle}>7. Résiliation</Text>
        <Text style={styles.text}>
          Nous nous réservons le droit de suspendre ou de résilier votre accès à l'application à tout moment et sans préavis, notamment en cas de violation des présentes conditions d'utilisation.
        </Text>
 
        <Text style={styles.sectionTitle}>8. Juridiction et Droit Applicable</Text>
        <Text style={styles.text}>
          Les présentes conditions sont régies par les lois du pays où CampSeeker est basé. En cas de litige, les tribunaux de ce pays auront compétence exclusive pour statuer.
        </Text>
 
        <Text style={styles.sectionTitle}>9. Contact</Text>
        <Text style={styles.text}>
          Pour toute question relative à ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : support@campseeker.com.
        </Text>
      </BoiteBlanche>
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F6F6',
    paddingBottom: 50,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: '15%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F2994A', // Couleur orange pour le titre
    textAlign: 'center',
    marginBottom: 20,
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

export default Conditions_service;

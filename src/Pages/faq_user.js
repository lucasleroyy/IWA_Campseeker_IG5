import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BoiteBlanche from '../components/Boite_blanche'; // Assurez-vous que le chemin est correct
import { AntDesign } from '@expo/vector-icons';

const FAQUser = ({ navigation }) => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (question) => {
    setActiveQuestion(activeQuestion === question ? null : question);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>F.A.Q</Text>

      <BoiteBlanche>
        <TouchableOpacity style={styles.questionContainer} onPress={() => toggleQuestion(1)}>
          <Text style={styles.questionText}>Puis-je modifier un lieu que j’ai posté ?</Text>
          <AntDesign name={activeQuestion === 1 ? 'up' : 'down'} size={20} color="#4F4F4F" />
        </TouchableOpacity>
        {activeQuestion === 1 && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Malheureusement non, il faudra le supprimer et en créer un nouveau.
            </Text>
          </View>
        )}
      </BoiteBlanche>

      <BoiteBlanche>
        <TouchableOpacity style={styles.questionContainer} onPress={() => toggleQuestion(2)}>
          <Text style={styles.questionText}>Comment puis-je créer un compte ?</Text>
          <AntDesign name={activeQuestion === 2 ? 'up' : 'down'} size={20} color="#4F4F4F" />
        </TouchableOpacity>
        {activeQuestion === 2 && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Pour créer un compte, cliquez sur le bouton "S'inscrire" et suivez les instructions.
            </Text>
          </View>
        )}
      </BoiteBlanche>

      <BoiteBlanche>
        <TouchableOpacity style={styles.questionContainer} onPress={() => toggleQuestion(3)}>
          <Text style={styles.questionText}>Comment puis-je ajouter un lieu à mes favoris ?</Text>
          <AntDesign name={activeQuestion === 3 ? 'up' : 'down'} size={20} color="#4F4F4F" />
        </TouchableOpacity>
        {activeQuestion === 3 && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Cliquez sur l'icône en forme de cœur sur la page du lieu pour l'ajouter à vos favoris.
            </Text>
          </View>
        )}
      </BoiteBlanche>

      <BoiteBlanche>
        <TouchableOpacity style={styles.questionContainer} onPress={() => toggleQuestion(4)}>
          <Text style={styles.questionText}>Comment proposer un nouveau lieu de bivouac ?</Text>
          <AntDesign name={activeQuestion === 4 ? 'up' : 'down'} size={20} color="#4F4F4F" />
        </TouchableOpacity>
        {activeQuestion === 4 && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Allez dans la section "Proposer un lieu", remplissez les informations nécessaires et cliquez sur "Ajouter".
            </Text>
          </View>
        )}
      </BoiteBlanche>

      <BoiteBlanche>
        <TouchableOpacity style={styles.questionContainer} onPress={() => toggleQuestion(5)}>
          <Text style={styles.questionText}>Comment puis-je consulter mes lieux enregistrés ?</Text>
          <AntDesign name={activeQuestion === 5 ? 'up' : 'down'} size={20} color="#4F4F4F" />
        </TouchableOpacity>
        {activeQuestion === 5 && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Accédez à la section "Mes lieux" dans votre profil pour voir les lieux que vous avez enregistrés.
            </Text>
          </View>
        )}
      </BoiteBlanche>

      <BoiteBlanche>
        <TouchableOpacity style={styles.questionContainer} onPress={() => toggleQuestion(6)}>
          <Text style={styles.questionText}>Puis-je ajouter des équipements à mon lieu ?</Text>
          <AntDesign name={activeQuestion === 6 ? 'up' : 'down'} size={20} color="#4F4F4F" />
        </TouchableOpacity>
        {activeQuestion === 6 && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Oui, lors de l'ajout d'un lieu, vous pouvez sélectionner les équipements disponibles comme "Wifi", "Parking", etc.
            </Text>
          </View>
        )}
      </BoiteBlanche>

      <BoiteBlanche>
        <TouchableOpacity style={styles.questionContainer} onPress={() => toggleQuestion(7)}>
          <Text style={styles.questionText}>Comment signaler un problème avec un lieu ?</Text>
          <AntDesign name={activeQuestion === 7 ? 'up' : 'down'} size={20} color="#4F4F4F" />
        </TouchableOpacity>
        {activeQuestion === 7 && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Allez dans la page du lieu et cliquez sur "Signaler un problème" pour nous envoyer vos commentaires.
            </Text>
          </View>
        )}
      </BoiteBlanche>

      <BoiteBlanche>
        <TouchableOpacity style={styles.questionContainer} onPress={() => toggleQuestion(8)}>
          <Text style={styles.questionText}>Comment puis-je contacter le support client ?</Text>
          <AntDesign name={activeQuestion === 8 ? 'up' : 'down'} size={20} color="#4F4F4F" />
        </TouchableOpacity>
        {activeQuestion === 8 && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Vous pouvez nous contacter via la section "Support" ou en envoyant un email à support@campseeker.com.
            </Text>
          </View>
        )}
      </BoiteBlanche>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F2EDE5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F25C05',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  questionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  answerContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  answerText: {
    fontSize: 14,
    color: '#4F4F4F',
  },
});

export default FAQUser;

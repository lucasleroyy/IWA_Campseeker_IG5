import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Bandeau from '../components/Bandeau';

const Page_favoris = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text>Page Favoris</Text>
      </ScrollView>
      <Bandeau currentPage="PageFavoris" onNavigate={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(166, 116, 55, 0.1)',
  },
  scrollContainer: {
    flexGrow: 1,  // Permet à ScrollView de s'étendre en fonction du contenu
    paddingVertical: 70,
  },
});

export default Page_favoris;

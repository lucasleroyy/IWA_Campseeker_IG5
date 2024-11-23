import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../redux/actions/userActions";

const Commentaire = ({ pseudo, note, texte }) => {
  console.log("Props Commentaire :", { pseudo, note, texte });
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.pseudo}>{pseudo || "Utilisateur inconnu"}</Text>
        <View style={styles.actions}>
          <View style={styles.note}>
            {[...Array(note || 0)].map((_, index) => (
              <MaterialIcons
                key={index}
                name="star"
                size={15}
                color="#FF6D00"
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Signaler ce commentaire",
                "Êtes-vous sûr de vouloir signaler ce commentaire ?",
                [
                  { text: "Annuler", style: "cancel" },
                  {
                    text: "Oui",
                    onPress: () => console.log("Commentaire signalé"),
                  },
                ]
              )
            }
          >
            <MaterialIcons name="report" size={25} color="#F25C05" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator} />
      <Text style={styles.texte}>{texte || "Texte non disponible"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pseudo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#FF6D00",
    marginVertical: 5,
  },
  texte: {
    fontSize: 15,
    color: "#000",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Commentaire;

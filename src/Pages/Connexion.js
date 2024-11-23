import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import BoiteVerte from "../components/Boite_verte";
import Champ from "../components/Champ";
import Bouton from "../components/Bouton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/actions/authActions";
import { fetchUserById } from "../redux/actions/userActions";

const PageConnexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    if (isLoggedIn && userId) {
      console.log("Utilisateur connecté, ID :", userId);
      dispatch(fetchUserById(userId))
        .unwrap()
        .then((userData) => {
          console.log("Données utilisateur :", userData);
          if (userData.role === "admin") {
            navigation.navigate("AccueilAdmin");
          } else {
            navigation.navigate("PageAccueil");
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération du rôle :", error)
        );
    }
  }, [isLoggedIn, userId, dispatch]);

  const handleLogin = () => {
    console.log("Email:", email, "Password", password);
    if (!email || !password) {
      alert("Veuillez entrer un email et un mot de passe.");
      return;
    }
    dispatch(authenticateUser({ email, password }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <>
          <Image
            source={require("../../assets/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Ravi de vous revoir chez CampSeeker</Text>
          <Text style={styles.subtitle}>
            Trouvez l'endroit <Text style={styles.highlight}>parfait</Text> pour
            bivouaquer
          </Text>

          <BoiteVerte>
            <Champ placeholder="Email" value={email} onChangeText={setEmail} />
            <Champ
              placeholder="Mot de passe"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <Bouton label="Connexion" onClick={handleLogin} />

            {/* Lien vers la page d'inscription */}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Inscription")}
            >
              Je n'ai pas de compte
            </Text>

            <Text
              style={styles.link}
              onPress={() =>
                alert("Redirection vers la récupération du mot de passe")
              }
            >
              Mot de passe oublié
            </Text>
          </BoiteVerte>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Permet au conteneur de prendre tout l'espace disponible
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    alignItems: "center",
    justifyContent: "center", // Centrage vertical
    paddingHorizontal: 20, // Ajout d'un espace autour du contenu
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  highlight: {
    color: "#FF6D00",
    fontWeight: "bold",
  },
  link: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default PageConnexion;

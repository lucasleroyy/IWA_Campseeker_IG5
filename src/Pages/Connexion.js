import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import BoiteVerte from "../components/Boite_verte";
import Champ from "../components/Champ";
import Bouton from "../components/Bouton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
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
    const unsubscribe = navigation.addListener("focus", () => {
      setEmail("");
      setPassword("");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (isLoggedIn && userId) {
      dispatch(fetchUserById(userId))
        .unwrap()
        .then((userData) => {
          if (userData.role === "admin") {
            navigation.navigate("AccueilAdmin");
          } else {
            navigation.navigate("PageAccueil");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du rôle :", error);
        });
    }
  }, [isLoggedIn, userId, dispatch]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(
        "Erreur de connexion",
        "Veuillez entrer un email et un mot de passe."
      );
      return;
    }
    dispatch(authenticateUser({ email, password }))
      .unwrap()
      .then(() => {
        console.log("Connexion réussie !");
      })
      .catch(() => {
        Alert.alert(
          "Erreur de connexion",
          "Email ou mot de passe incorrect. Veuillez réessayer."
        );
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    flex: 1,
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
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

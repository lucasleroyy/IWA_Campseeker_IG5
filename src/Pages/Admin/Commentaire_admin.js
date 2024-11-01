import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import BoiteVerte from '../../components/Boite_verte';
import Bouton from '../../components/Bouton';
import ScrollHorizontal from '../../components/Scroll_horizontal';
import Commentaire from '../../components/Commentaire';
import Photo from '../../components/Photo';

const CommentaireAdmin = ({ route }) => {
    const { id } = route.params; //recup l'id de la photo cliquer
    const photo = { imageUrl: require('../../../assets/bivouac3.png'), id: 1 };

    // Stocker les commentaires comme des objets JavaScript
    const [commentaires, setCommentaires] = useState([
        { id: 1, pseudo: "Utilisateur1", note: 5, texte: "Commentaire 1 wazzaaaa" },
        { id: 2, pseudo: "Utilisateur2", note: 3, texte: "Commentaire 2 wazzaaaa" },
        { id: 3, pseudo: "Utilisateur3", note: 4, texte: "Commentaire 3 wazzaaaa" },
    ]);

    // Fonction pour supprimer un commentaire
    const removeComment = (commentId) => {
        setCommentaires((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.titre}>Nom du lieu </Text>
                <View style={styles.photoContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('CommentaireAdmin', { id: photo.id })}>
                  <Photo imageUrl={photo.imageUrl} width={300} height={200}  />
                </TouchableOpacity>
                </View>
                <BoiteVerte>
                    <ScrollHorizontal
                        items={commentaires.map((comment) => (
                            <View key={comment.id}>
                                <Commentaire
                                    pseudo={comment.pseudo}
                                    note={comment.note}
                                    texte={comment.texte}
                                />
                                <View style={styles.bouton}>
                                <Bouton
                                    label="Supprimer ce commentaire"
                                    onClick={() => removeComment(comment.id)}
                                />
                                </View>
                            </View>
                        ))}
                    />
                </BoiteVerte>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(166, 116, 55, 0.1)',
        paddingBottom: 50,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: '15%',
    },
    photoContainer: {
        position: 'relative',
        width: 300,
        height: 200,
        marginVertical: 10,
    },
    bouton: {
        marginTop: 10,
        marginRight: 20,
    },
    titre: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000',
    },
});

export default CommentaireAdmin;

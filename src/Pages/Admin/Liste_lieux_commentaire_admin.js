import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Photo from "../../components/Photo";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLocations } from "../../redux/actions/locationsActions";
import { fetchFlaggedComments } from "../../redux/actions/flagsActions";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListeLieux = ({ locations, navigation, apiUrl }) => {
  if (!locations || locations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun lieu disponible.</Text>
      </View>
    );
  }

  const renderItem = ({ item: location }) => {
    const imageUrl = location.photo?.photoId
      ? `${apiUrl}/photos/get/${location.photo.photoId}`
      : null;

    return (
      <TouchableOpacity
        key={location.locationId}
        style={styles.locationContainer}
        onPress={() =>
          navigation.navigate("CommentaireAdmin", { id: location.locationId })
        }
      >
        <View style={styles.bandeau}>
          {imageUrl && (
            <Photo
              imageUrl={imageUrl}
              width="100%"
              height={230}
              accessibilityLabel={`Photo de ${location.name}`}
            />
          )}
          <View style={styles.row}>
            <View>
              <Text style={styles.nomLieu}>{location.name}</Text>
              <Text style={styles.proprietaire}>
                {location.adresse} | {location.ville}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#555" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={locations}
      renderItem={renderItem}
      keyExtractor={(item) => item.locationId.toString()}
      contentContainerStyle={styles.scrollContainer}
    />
  );
};

const CommentaireSignales = ({ navigation }) => {
    const dispatch = useDispatch();
    const { commentFlags: flaggedComments, loading, error } = useSelector((state) => state.flags);
  
    useEffect(() => {
      dispatch(fetchFlaggedComments());
    }, [dispatch]);
  
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Chargement des commentaires signalés...</Text>
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Erreur : {error}</Text>
        </View>
      );
    }
  
    if (!flaggedComments || flaggedComments.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Aucun commentaire signalé.</Text>
        </View>
      );
    }
  
    const renderItem = ({ item: comment }) => (
      <TouchableOpacity
        key={comment.flagId}
        style={styles.locationContainer}
        onPress={() => navigation.navigate("CommentaireFlaggedAdmin", { id: comment.commentId, flagId: comment.flagId })}
      >
        <View style={styles.bandeau}>
          <Text style={styles.nomLieu}>Commentaire ID : {comment.commentId}</Text>
          <Text style={styles.reason}>Raison : {comment.reason}</Text>
          <Text style={styles.status}>Statut : {comment.status}</Text>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <FlatList
        data={flaggedComments}
        renderItem={renderItem}
        keyExtractor={(item) => item.flagId.toString()}
        contentContainerStyle={styles.scrollContainer}
      />
    );
  };
  

const ListeLieuxAdminCommentaire = ({ navigation }) => {
  const dispatch = useDispatch();
  const { locations, loading: locationsLoading, error: locationsError } =
    useSelector((state) => state.locations);
  const apiUrl = useSelector((state) => state.config.apiUrl);

  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "liste", title: "Tous les lieux" },
    { key: "signales", title: "Commentaires signalés" },
  ]);

  const renderScene = SceneMap({
    liste: () => (
      <ListeLieux
        locations={locations}
        navigation={navigation}
        apiUrl={apiUrl}
      />
    ),
    signales: () => <CommentaireSignales navigation={navigation} />,
  });

  if (locationsLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (locationsError) {
    return (
      <View style={styles.container}>
        <Text>Erreur : {locationsError}</Text>
      </View>
    );
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#000", height: 2 }}
          style={{ backgroundColor: "#FFF" }}
          labelStyle={{ fontSize: 16, fontWeight: "bold" }}
          activeColor="#000"
          inactiveColor="#AAA"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(166, 116, 55, 0.1)",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: "15%",
    backgroundColor: "rgba(166, 116, 55, 0.1)",
  },
  locationContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  bandeau: {
    width: "90%",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nomLieu: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    paddingTop: 10,
  },
  proprietaire: {
    fontSize: 14,
    color: "#555",
  },
  reason: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default ListeLieuxAdminCommentaire;

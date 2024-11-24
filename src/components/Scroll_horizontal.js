import React, { useState, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

const Scroll_horizontal = ({ items, parentWidth }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const itemWidth = parentWidth * 0.8; // 80% de la largeur du conteneur parent
  const sideMargin = (parentWidth - itemWidth) / 2; // Marges pour centrer les éléments

  const handleMomentumScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / itemWidth); // Calcul de l'index actif
    setActiveIndex(newIndex); // Met à jour l'index actif
  };

  return (
    <View style={[styles.container, { width: parentWidth }]}>
      {/* ScrollView avec snap-to-page */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        snapToInterval={itemWidth} // Assure le défilement page par page
        decelerationRate="fast" // Ralentissement rapide pour un effet fluide
        showsHorizontalScrollIndicator={false} // Masque l'indicateur de scroll horizontal
        onMomentumScrollEnd={handleMomentumScrollEnd} // Capture la fin du scroll
      >
        {/* Espace pour centrer le premier élément */}
        <View style={{ width: sideMargin }} />

        {items.map((item, index) => (
          <View
            key={index}
            style={[styles.itemContainer, { width: itemWidth }]} // Chaque élément occupe 80% de la largeur
          >
            {item}
          </View>
        ))}

        {/* Espace pour centrer le dernier élément */}
        <View style={{ width: sideMargin }} />
      </ScrollView>

      {/* Indicateurs de pagination */}
      <View style={styles.indicatorContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === activeIndex ? "#FF6D00" : "#CCC" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150, // Ajustez cette valeur selon vos besoins
    borderRadius: 10, // Coins arrondis pour un style visuel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Ombre pour Android
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#CCC",
  },
});

export default Scroll_horizontal;

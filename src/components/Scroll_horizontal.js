import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

const Scroll_horizontal = ({ items }) => {
  const { width: windowWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Définir itemWidth en fonction de la largeur disponible
  const itemWidth = windowWidth * 0.85; // Largeur de chaque élément (85% de la largeur de l'écran)
  const sideMargin = (windowWidth - itemWidth) / 2;  // Marge pour centrer les éléments

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / itemWidth);
    setActiveIndex(index);
  };

  const handleMomentumScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / itemWidth);
    scrollToIndex(index);
  };

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      const offset = index * itemWidth;
      scrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      {/* ScrollView Horizontal */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        snapToInterval={itemWidth}  // Se fixe à chaque élément
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: sideMargin, paddingVertical: 10}}
        onMomentumScrollEnd={handleMomentumScrollEnd}  // Capture la fin du scroll
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {items.map((item, index) => (
          <View key={index} style={[styles.itemContainer, { width: itemWidth }]}>
            {item}
          </View>
        ))}
      </ScrollView>

      {/* Barre de points de défilement */}
      <View style={styles.indicatorContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === activeIndex ? '#FF6D00' : '#FFF' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',  // Utiliser toute la largeur de son conteneur
    alignSelf: 'center',  // Centre le composant dans le conteneur parent
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
  },
});

export default Scroll_horizontal;

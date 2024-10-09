import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = width * 0.85;  // Réduit à 85% de la largeur de l'écran pour voir une partie des éléments adjacents
const sideMargin = (width - itemWidth) / 2;  // Marge pour centrer les éléments

const Scroll_horizontal = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / itemWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* ScrollView Horizontal */}
      <ScrollView 
        horizontal 
        pagingEnabled 
        snapToInterval={itemWidth}  // Permet de s'arrêter au centre de chaque élément
        decelerationRate="fast" 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: sideMargin }}
        onScroll={handleScroll} 
        scrollEventThrottle={16}
      >
        {items.map((item, index) => (
          <View key={index} style={[styles.itemContainer, { marginHorizontal: 1 }]}>
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
    alignItems: 'center',
  },
  itemContainer: {
    width: itemWidth, 
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

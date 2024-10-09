import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Photo = ({ imageUrl, width, height}) => {
    return (
      <View style={[styles.container, { width, height }]}>
        <Image 
          source={imageUrl} 
          style={[{ width, height }]} 
          resizeMode="contain"
          
        />
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 20,
    }
  });
  

export default Photo;

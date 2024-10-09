import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bandeau from './src/components/Bandeau';

const Test = () => {
    const [currentPage, setCurrentPage] = useState('Search');
    
    const onNavigate = (page) => {
        setCurrentPage(page);
    };
    
    return (
        <View style={styles.container}>
            <Carte style={styles.map}
                initialRegion={{
                    latitude: 48.8584, // Latitude pour Paris
                    longitude: 2.2945, // Longitude pour Paris
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <Bandeau currentPage={currentPage} onNavigate={onNavigate} />
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(166, 116, 55, 0.1)',
    },
    map: {
      width: '30%',
      height: '30%',
      position: 'absolute',
      
    },
});

export default Test;
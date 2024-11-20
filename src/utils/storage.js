// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data', error);
    return null;
  }
};

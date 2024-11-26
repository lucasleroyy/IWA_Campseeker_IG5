import { StyleSheet } from 'react-native';

const createGlobalStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#333333' : 'rgba(166, 116, 55, 0.1)',
    },
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: '5%',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: isDarkMode ? '#FFFFFF' : '#F25C05',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
    },
    notificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#444444' : '#FFFFFF',
      borderRadius: 20,
      height: 50,
      width: '90%',
      alignSelf: 'center',
      paddingHorizontal: 15,
      marginVertical: 10,
      justifyContent: 'space-between',
      shadowColor: isDarkMode ? '#000000' : '#333333',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
  });

export default createGlobalStyles;

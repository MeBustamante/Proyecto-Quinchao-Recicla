import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const Configuracion = () => {
  const { darkMode, setDarkMode, language, setLanguage } = useContext(AppContext);

  const translations = {
    es: {
      title: 'Configuraciones',
      darkMode: 'Tema oscuro',
      language: 'Idioma',
    },
    en: {
      title: 'Settings',
      darkMode: 'Dark Mode',
      language: 'Language',
    },
  };

  const currentLanguage = translations[language];

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#F5F5F5' }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: darkMode ? '#FFF' : '#388E3C' }]}>
          {currentLanguage.title}
        </Text>

        {/* Tema oscuro */}
        <View style={styles.option}>
          <Text style={[styles.optionText, { color: darkMode ? '#FFF' : '#333' }]}>
            {currentLanguage.darkMode}
          </Text>
          <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
        </View>

        {/* Idioma */}
        <View style={styles.option}>
          <Text style={[styles.optionText, { color: darkMode ? '#FFF' : '#333' }]}>
            {currentLanguage.language}
          </Text>
          <View style={styles.languageOptions}>
            <TouchableOpacity
              style={[styles.languageButton, language === 'es' && styles.selectedButton]}
              onPress={() => setLanguage('es')}
            >
              <Text style={[styles.languageText, { color: language === 'es' ? '#FFF' : '#4CAF50' }]}>
                Español
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.languageButton, language === 'en' && styles.selectedButton]}
              onPress={() => setLanguage('en')}
            >
              <Text style={[styles.languageText, { color: language === 'en' ? '#FFF' : '#4CAF50' }]}>
                English
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  optionText: {
    fontSize: 18,
  },
  languageOptions: {
    flexDirection: 'row',
  },
  languageButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  languageText: {
    fontSize: 14,
  },
});

export default Configuracion;

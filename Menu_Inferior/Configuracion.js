import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Configuracion = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('mediano');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('es');

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  const checkForUpdates = () => {
    alert('No hay actualizaciones disponibles.'); // Simula la comprobación de actualizaciones
  };

  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>

      {/* Tema */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Tema oscuro</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Tamaño de texto */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Tamaño del texto</Text>
        <View style={styles.textSizeOptions}>
          <TouchableOpacity
            style={[styles.textSizeButton, textSize === 'pequeño' && styles.selectedButton]}
            onPress={() => setTextSize('pequeño')}
          >
            <Text style={styles.textSizeText}>Pequeño</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.textSizeButton, textSize === 'mediano' && styles.selectedButton]}
            onPress={() => setTextSize('mediano')}
          >
            <Text style={styles.textSizeText}>Mediano</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.textSizeButton, textSize === 'grande' && styles.selectedButton]}
            onPress={() => setTextSize('grande')}
          >
            <Text style={styles.textSizeText}>Grande</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Idioma */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Idioma</Text>
        <View style={styles.languageOptions}>
          <TouchableOpacity
            style={[styles.languageButton, language === 'es' && styles.selectedButton]}
            onPress={() => changeLanguage('es')}
          >
            <Text style={styles.languageText}>Español</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.languageButton, language === 'en' && styles.selectedButton]}
            onPress={() => changeLanguage('en')}
          >
            <Text style={styles.languageText}>Inglés</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notificaciones */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Notificaciones</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Comprobar actualizaciones */}
      <TouchableOpacity style={styles.updateButton} onPress={checkForUpdates}>
        <Ionicons name="cloud-download-outline" size={24} color="white" />
        <Text style={styles.updateButtonText}>Comprobar actualizaciones</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#388E3C',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  textSizeOptions: {
    flexDirection: 'row',
  },
  textSizeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  textSizeText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
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
  languageText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  updateButtonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default Configuracion;

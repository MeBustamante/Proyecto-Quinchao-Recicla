import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const Configuracion = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('mediano');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('es');
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  const checkForUpdates = () => {
    setIsCheckingUpdate(true); // Muestra la animación
    setTimeout(() => {
      setIsCheckingUpdate(false); // Oculta la animación
      setModalVisible(true); // Muestra el modal personalizado
    }, 2000); // Simula el proceso de comprobación de actualizaciones durante 2 segundos
  };

  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <View style={{ flex: 1 }}>
      {/* Animación global fuera del botón */}
      {isCheckingUpdate && (
        <View style={styles.animationOverlay}>
          <LottieView
            source={require('../assets/Animaciones/actualizacion.json')} // Ruta del archivo .json
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      )}

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

        {/* Modal personalizado para la alerta */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Estas al día con tu aplicación</Text>
              <Text style={styles.modalSubtitle}>Versión: Beta 01</Text>
              <Text style={styles.modalSubtitle}>Noviembre 2024</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
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
  animationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  animation: {
    width: 150,
    height: 150, // Tamaño mayor de la animación
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Configuracion;

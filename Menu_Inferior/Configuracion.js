import React, { useState, useContext } from 'react';
import {View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Notifications from 'expo-notifications';
import { AppContext } from '../ConfigGlobal/AppContext'; // Ajusta la ruta según tu proyecto

const Configuracion = () => {
  const {
    language,
    setLanguage,
    notificationsEnabled,
    setNotificationsEnabled,
    timeFormat,
    setTimeFormat,
    locationAccess,
    collectionSchedule,
  } = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const translations = {
    es: {
      title: 'Configuraciones',
      notifications: 'Notificaciones',
      timeFormat: 'Formato de Hora',
      locationAccess: 'Acceso a la Ubicación',
      language: 'Idioma',
      permissionsGranted: 'Otorgado',
      permissionsDenied: 'Otorgado',
      twelveHours: '12 horas',
      twentyFourHours: '24 horas',
      checkUpdate: 'Comprobar Actualización',
      updated: '¡Actualización Exitosa!',
      upToDate: 'Estás actualizado a la versión más reciente',
      version: 'Tu versión es: Beta 1.0.0.2',
      date: 'Noviembre 2024',
      close: 'Cerrar',
      notificationSuccess: 'Notificaciones programadas correctamente.',
      notificationCancelled: 'Se han cancelado todas las notificaciones.',
      notificationPermissionDenied: 'Permiso de notificaciones denegado.',
    },
    en: {
      title: 'Settings',
      notifications: 'Notifications',
      timeFormat: 'Time Format',
      locationAccess: 'Location Access',
      language: 'Language',
      permissionsGranted: 'Granted',
      permissionsDenied: 'Granted',
      twelveHours: '12 hours',
      twentyFourHours: '24 hours',
      checkUpdate: 'Check for Updates',
      updated: 'Update Successful!',
      upToDate: 'You are up-to-date with the latest version',
      version: 'Your version is: Beta 1.0.0.2',
      date: 'November 2024',
      close: 'Close',
      notificationSuccess: 'Notifications scheduled successfully.',
      notificationCancelled: 'All notifications have been cancelled.',
      notificationPermissionDenied: 'Notification permission denied.',
    },
  };

  const currentLanguage = translations[language];

  // Solicitar permisos de notificaciones
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === 'granted') {
      return true; // Si ya está otorgado, no solicita nuevamente
    }
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === 'granted';
  };
  

  // Función para programar notificaciones
  const scheduleNotifications = async () => {
    if (!collectionSchedule || collectionSchedule.length === 0) {
      Alert.alert(currentLanguage.notifications, 'Las notificaciones fueron activadas.');
      return;
    }
  
    await cancelNotifications(); // Cancelar notificaciones anteriores
  
    for (const schedule of collectionSchedule) {
      const [year, month, day] = schedule.date.split('-');
      const notificationDate = new Date(year, month - 1, day, 9, 0);
  
      if (notificationDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: currentLanguage.notifications,
            body: `Hoy habrá recolección en ${schedule.address} de ${schedule.hours}.`,
          },
          trigger: notificationDate,
        });
      }
    }
  
    Alert.alert(currentLanguage.notifications, currentLanguage.notificationSuccess);
  };
  

  // Función para cancelar todas las notificaciones programadas
  const cancelNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert(currentLanguage.notifications, currentLanguage.notificationCancelled);
  };
  

  // Manejar el cambio del switch
  const handleNotificationSwitch = async (value) => {
    if (value) {
      const permissionGranted = await requestNotificationPermission();
      if (permissionGranted) {
        setNotificationsEnabled(true); // Actualizar el estado del switch
        scheduleNotifications(); // Programar notificaciones
      } else {
        setNotificationsEnabled(false); // Si no se otorgan permisos, no activa el switch
      }
    } else {
      setNotificationsEnabled(false); // Actualizar el estado del switch
      cancelNotifications(); // Cancelar notificaciones
    }
  };
  

  const handleCheckUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setModalVisible(true);
    }, 2000); // Simula un tiempo de carga para la animación
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{currentLanguage.title}</Text>

        {/* Cambio de Idioma */}
        <View style={styles.option}>
          <Text style={styles.optionLabel}>{currentLanguage.language}</Text>
          <View style={styles.languageOptions}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                language === 'es' && styles.selectedButton,
              ]}
              onPress={() => setLanguage('es')}
            >
              <Text
                style={[
                  styles.languageText,
                  { color: language === 'es' ? '#FFF' : '#4CAF50' },
                ]}
              >
                Español
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageButton,
                language === 'en' && styles.selectedButton,
              ]}
              onPress={() => setLanguage('en')}
            >
              <Text
                style={[
                  styles.languageText,
                  { color: language === 'en' ? '#FFF' : '#4CAF50' },
                ]}
              >
                English
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notificaciones */}
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>{currentLanguage.notifications}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationSwitch}
            style={styles.switch}
          />
        </View>

        {/* Formato de Hora */}
        <View style={styles.option}>
          <Text style={styles.optionLabel}>{currentLanguage.timeFormat}</Text>
          <View style={styles.timeFormatOptions}>
            <TouchableOpacity
              style={[
                styles.timeFormatButton,
                timeFormat === '12h' && styles.selectedButton,
              ]}
              onPress={() => setTimeFormat('12h')}
            >
              <Text
                style={[
                  styles.timeFormatText,
                  { color: timeFormat === '12h' ? '#FFF' : '#4CAF50' },
                ]}
              >
                {currentLanguage.twelveHours}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeFormatButton,
                timeFormat === '24h' && styles.selectedButton,
              ]}
              onPress={() => setTimeFormat('24h')}
            >
              <Text
                style={[
                  styles.timeFormatText,
                  { color: timeFormat === '24h' ? '#FFF' : '#4CAF50' },
                ]}
              >
                {currentLanguage.twentyFourHours}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Configuración de Privacidad */}
        <View style={styles.option}>
          <Text style={styles.optionLabel}>{currentLanguage.locationAccess}</Text>
          <Text style={styles.privacyStatus}>
            {locationAccess
              ? currentLanguage.permissionsGranted
              : currentLanguage.permissionsDenied}
          </Text>
        </View>

        {/* Botón Comprobar Actualización */}
        <TouchableOpacity style={styles.updateButton} onPress={handleCheckUpdate}>
          <Text style={styles.updateButtonText}>
            {currentLanguage.checkUpdate}
          </Text>
        </TouchableOpacity>

        {/* Animación de Actualización */}
        {isUpdating && (
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/Animaciones/actualizacion.json')} // Ajusta la ruta según tu proyecto
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
        )}

        {/* Modal de Actualización */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{currentLanguage.updated}</Text>
              <Text style={styles.modalMessage}>
                {currentLanguage.upToDate}
              </Text>
              <Text style={styles.modalVersion}>{currentLanguage.version}</Text>
              <Text style={styles.modalDate}>{currentLanguage.date}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>
                  {currentLanguage.close}
                </Text>
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
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#388E3C',
  },
  option: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  languageOptions: {
    flexDirection: 'row',
  },
  languageButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  languageText: {
    fontSize: 14,
  },
  timeFormatOptions: {
    flexDirection: 'row',
  },
  timeFormatButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    marginRight: 10,
  },
  timeFormatText: {
    fontSize: 14,
  },
  privacyStatus: {
    fontSize: 16,
    color: '#777',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#388E3C',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  modalVersion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#777777',
    marginBottom: 5,
  },
  modalDate: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Configuracion;

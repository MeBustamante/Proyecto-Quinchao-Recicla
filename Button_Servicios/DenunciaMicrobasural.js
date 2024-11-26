import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importar el contexto global

const DenunciaMicrobasural = () => {
  const navigation = useNavigation();
  const { language, addNotification } = useContext(AppContext); // Usar el contexto global para añadir notificaciones

  const texts = {
    es: {
      description: 'Por favor, rellena los datos y adjunta imagen del microbasural que encontraste.',
      fullName: 'Nombre y Apellidos',
      enterFullName: 'Ingrese su nombre y apellidos',
      email: 'Correo Electrónico',
      enterEmail: 'Ingrese su correo electrónico',
      phone: 'Teléfono',
      enterPhone: 'Ingrese su teléfono',
      address: 'Dirección del Microbasural',
      enterAddress: 'Ingrese la dirección del microbasural',
      uploadImage: 'Subir Imagen',
      takePhoto: 'Tomar Foto',
      selectImage: 'Subir Imagen',
      send: 'Enviar',
      success: 'Denuncia enviada correctamente.',
      close: 'Cerrar',
    },
    en: {
      description: 'Please fill out the information and attach an image of the illegal dump you found.',
      fullName: 'Full Name',
      enterFullName: 'Enter your full name',
      email: 'Email',
      enterEmail: 'Enter your email',
      phone: 'Phone',
      enterPhone: 'Enter your phone number',
      address: 'Direction of Microtrash',
      enterAddress: 'Enter the address of the illegal dump',
      uploadImage: 'Upload Image',
      takePhoto: 'Take Photo',
      selectImage: 'Select Image',
      send: 'Send',
      success: 'Complaint sent successfully.',
      close: 'Close',
    },
  };

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showCustomAlert(texts[language].galleryPermission);
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const permission = await requestPermission();
    if (!permission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setArchivo(result.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      showCustomAlert(texts[language].cameraPermission);
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setArchivo(result.uri);
    }
  };

  const handleSubmit = () => {
    if (!nombre.trim()) {
      showCustomAlert(texts[language].enterFullName);
      return;
    }
    if (!email.trim()) {
      showCustomAlert(texts[language].enterEmail);
      return;
    }
    if (!telefono.trim()) {
      showCustomAlert(texts[language].enterPhone);
      return;
    }
    if (!direccion.trim()) {
      showCustomAlert(texts[language].enterAddress);
      return;
    }

    // Obtener la fecha y hora actual
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    // Simulación de envío exitoso
    setAlertVisible(false);
    alert(texts[language].success);

    // Añadir notificación al contexto global con fecha y hora
    addNotification(`Nueva denuncia en: ${direccion}`);

    // Limpiar campos después de enviar la denuncia
    setNombre('');
    setEmail('');
    setTelefono('');
    setDireccion('');
    setArchivo(null);
  };

  return (
    <LinearGradient
      colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../assets/denuncia.png')} style={styles.banner} />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.description}>{texts[language].description}</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>{texts[language].fullName}</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterFullName}
              value={nombre}
              onChangeText={setNombre}
            />
            <Text style={styles.label}>{texts[language].email}</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterEmail}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>{texts[language].phone}</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterPhone}
              value={telefono}
              onChangeText={setTelefono}
            />
            <Text style={styles.label}>{texts[language].address}</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterAddress}
              value={direccion}
              onChangeText={setDireccion}
            />
            <Text style={styles.label}>{texts[language].uploadImage}</Text>
            <View style={styles.imageRow}>
              <TouchableOpacity
                style={[styles.uploadButton, styles.leftButton]}
                onPress={takePhoto}
              >
                <Ionicons name="camera-outline" size={20} color="black" />
                <Text style={styles.uploadButtonText}>{texts[language].takePhoto}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.uploadButton, styles.rightButton]}
                onPress={pickImage}
              >
                <Ionicons name="image-outline" size={20} color="black" />
                <Text style={styles.uploadButtonText}>{texts[language].selectImage}</Text>
              </TouchableOpacity>
            </View>
            {archivo && <Image source={{ uri: archivo }} style={styles.imagePreview} />}

            {/* Mensaje de uso de datos */}
            <View style={styles.dataUsageContainer}>
            <Text style={styles.dataUsageText}>
               Al enviar este formulario, usted acepta que los datos proporcionados serán conocidos y utilizados exclusivamente por la Municipalidad de Quinchao para la gestión y resolución de su solicitud.
            </Text>
        </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{texts[language].send}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <MenuInferior navigation={navigation} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <LottieView
              source={require('../assets/Animaciones/fail.json')}
              autoPlay
              loop={true}
              speed={0.5}
              style={styles.animation}
            />
            <Text style={styles.alertText}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.alertButtonText}>{texts[language].close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  banner: { width: '100%', height: 110, resizeMode: 'cover' },
  container: { flex: 1, paddingHorizontal: 20 },
  scrollContent: { paddingBottom: 80 },
  description: { fontSize: 16, textAlign: 'justify', color: 'black', marginHorizontal: 10, marginBottom: 5 },
  formContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 20, elevation: 8 },
  label: { fontSize: 14, marginBottom: 3, color: '#333', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 5, borderRadius: 5, marginBottom: 10, backgroundColor: '#fff' },
  uploadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#faeeac', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 8, marginBottom: 8 },
  uploadButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold', marginLeft: 5 },
  imagePreview: { width: 200, height: 200, resizeMode: 'cover', borderRadius: 8, marginTop: 10 },
  modalTitle: { fontSize: 16, textAlign: 'center', marginBottom: 10, color: 'green', fontWeight: 'bold' },
  imageRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  submitButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8, alignItems: 'center', elevation: 8 },
  submitButtonText: { color: 'white', fontSize: 16, fontWeight: '800' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center', width: '85%' },
  animation: { width: 150, height: 150, marginBottom: 20 },
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 10, color: '#333' },
  closeButton: { marginTop: 15, backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  closeButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  alertOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  alertContainer: { width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center', elevation: 5 },
  alertText: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#333' },
  alertButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  alertButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },


   /* diseño de mensaje de uso de datos */
  dataUsageContainer: {
    backgroundColor: '#F9F9F9', // Fondo gris claro
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20, // Espacio entre el mensaje y el botón de envío
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Borde sutil
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dataUsageText: {
    fontSize: 13,
    textAlign: 'justify',
    color: '#555', // Texto gris oscuro
    fontStyle: 'italic',
  },
  
});


export default DenunciaMicrobasural;
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { AppContext } from '../ConfigGlobal/AppContext';

const DenunciaMicrobasural = () => {
  const navigation = useNavigation();
  const { language, addNotification } = useContext(AppContext);

  const texts = {
    es: {
      description: 'Por favor, rellena los datos y adjunta imagen del microbasural que encontraste.',
      fullName: 'Nombre y Apellidos',
      enterFullName: 'Nombre y Apellidos',  
      email: 'Correo Electrónico',
      enterEmail: 'ejemplo@gmail.com',
      phone: 'Teléfono',
      enterPhone: '+569 12345678',
      address: 'Dirección del Microbasural',
      enterAddress: 'Dirección #01',
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
      enterFullName: 'Full Name',  
      email: 'Email',
      enterEmail: 'example@gmail.com',
      phone: 'Phone',
      enterPhone: '+569 12345678',
      address: 'Direction of Microtrash',
      enterAddress: 'Direction #01',
      uploadImage: 'Upload Image',
      takePhoto: 'Take Photo',
      selectImage: 'Select Image',
      send: 'Submit',
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
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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
    if (!nombre.trim() || !email.trim() || !telefono.trim() || !direccion.trim()) {
      showCustomAlert(texts[language].enterFullName);
      setShowErrorModal(true);
      return;
    }

    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    setAlertVisible(false);
    setSendModalVisible(true);

    // Cambiar notificación según el idioma
    addNotification(language === 'es' ? `Nueva denuncia en: ${direccion}` : `New complaint at: ${direccion}`);

    setNombre('');
    setEmail('');
    setTelefono('');
    setDireccion('');
    setArchivo(null);
  };

  return (
    <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../assets/basural.png')} style={styles.banner} />
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.description}>{texts[language].description}</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>{texts[language].fullName}<Text style={styles.requiredAsterisk}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterFullName}
              value={nombre}
              onChangeText={setNombre}
            />
            <Text style={styles.label}>{texts[language].email}<Text style={styles.requiredAsterisk}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterEmail}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>{texts[language].phone}<Text style={styles.requiredAsterisk}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterPhone}
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>{texts[language].address}<Text style={styles.requiredAsterisk}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterAddress}
              value={direccion}
              onChangeText={setDireccion}
            />
            <Text style={styles.label}>{texts[language].uploadImage}<Text style={styles.requiredAsterisk}>*</Text></Text>
            <View style={styles.imageRow}>
              <TouchableOpacity style={[styles.uploadButton, styles.leftButton]} onPress={takePhoto}>
                <Ionicons name="camera-outline" size={20} color="black" />
                <Text style={styles.uploadButtonText}>{texts[language].takePhoto}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.uploadButton, styles.rightButton]} onPress={pickImage}>
                <Ionicons name="image-outline" size={20} color="black" />
                <Text style={styles.uploadButtonText}>{texts[language].selectImage}</Text>
              </TouchableOpacity>
            </View>
            {archivo && <Image source={{ uri: archivo }} style={styles.imagePreview} />}

            <View style={styles.dataUsageContainer}>
              <Text style={styles.dataUsageText}>
                {language === 'es'
                  ? 'Al enviar este formulario, usted acepta que los datos proporcionados serán conocidos y utilizados exclusivamente por la Municipalidad de Quinchao para la gestión y resolución de su solicitud.'
                  : 'By submitting this form, you agree that the data provided will be known and used exclusively by the Municipality of Quinchao for the management and resolution of your request.'}
              </Text>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{texts[language].send}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <MenuInferior navigation={navigation} />

      {/* Modal para alertas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sendModalVisible}
        onRequestClose={() => setSendModalVisible(false)}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <LottieView source={require('../assets/Animaciones/enviar.json')} autoPlay loop={true} style={styles.animation} />
            <Text style={styles.modalSuccessTitle}>{texts[language].success}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => {
              setSendModalVisible(false);
              navigation.navigate('Home');
            }}>
              <Text style={styles.alertButtonText}>{texts[language].close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de error para campos faltantes */}
      <Modal animationType="fade" transparent={true} visible={showErrorModal} onRequestClose={() => setShowErrorModal(false)}>
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <LottieView source={require('../assets/Animaciones/fail.json')} autoPlay loop={true} style={styles.animation} speed={0.5} />
            <Text style={styles.errorModalText}>{texts[language].enterFullName}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => setShowErrorModal(false)}>
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
  banner: { width: '100%', height: 110, resizeMode: 'cover', marginBottom: 5 },
  container: { flex: 1, paddingHorizontal: 20 },
  scrollContent: { paddingBottom: 100 },
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
  dataUsageContainer: { backgroundColor: '#F9F9F9',  paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20,  borderRadius: 10, borderWidth: 1,  borderColor: '#E0E0E0',  shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2, },
  dataUsageText: { fontSize: 13, textAlign: 'justify', color: '#555',  fontStyle: 'italic', },
  modalSuccessTitle: { fontSize: 18, color: 'green', fontWeight: 'bold', textAlign: 'center', marginBottom: 10, },
  modalSuccessText: { fontSize: 16, color: '#333', textAlign: 'center', fontWeight: 'bold', marginBottom: 20, },
  errorModalText: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20, },
  requiredAsterisk: { color: 'red', fontSize: 16,  marginLeft: 4, }, 
});

export default DenunciaMicrobasural;

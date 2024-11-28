import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../ConfigGlobal/AppContext';
import * as FileSystem from 'expo-file-system';

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
  const [telefonoError, setTelefonoError] = useState('');
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

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setArchivo(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setArchivo(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setArchivo(null);
  };

  const handlePhoneChange = (text) => {
    const sanitized = text.replace(/[^0-9+]/g, '').substring(0, 12);
    setTelefono(sanitized);

    if (sanitized.length > 0 && (!sanitized.startsWith('+56') || sanitized.length !== 12)) {
      setTelefonoError(language === 'es' ? 'Número inválido. Use el formato +56 seguido de 9 dígitos.' : 'Invalid number. Use format +56 followed by 9 digits.');
    } else {
      setTelefonoError('');
    }
  };

  const handleSubmit = () => {
    let missingFields = [];

    if (!nombre.trim()) missingFields.push(language === 'es' ? 'Nombre y Apellidos' : 'Full Name');
    if (!telefono.trim()) missingFields.push(language === 'es' ? 'Teléfono' : 'Phone');
    if (!email.trim()) missingFields.push(language === 'es' ? 'Correo Electrónico' : 'Email');
    if (!direccion.trim()) missingFields.push(language === 'es' ? 'Dirección del Microbasural' : 'Address');
    if (!archivo) missingFields.push(language === 'es' ? 'Imagen' : 'Image');

    if (missingFields.length > 0 || telefonoError) {
      setShowErrorModal(true);
      return;
    }

    addNotification(language === 'es' ? `Nueva denuncia en: ${direccion}` : `New complaint at: ${direccion}`);
    setSendModalVisible(true);

    setNombre('');
    setTelefono('');
    setEmail('');
    setDireccion('');
    setArchivo(null);
  };

  return (
    <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../assets/basural.png')} style={styles.banner} />
        <View style={styles.container}>
          <Text style={styles.description}>{texts[language].description}</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>{texts[language].fullName} *</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterFullName}
              value={nombre}
              onChangeText={(text) => setNombre(text.substring(0, 40))}
            />

            <Text style={styles.label}>{texts[language].phone} *</Text>
            <TextInput
              style={[styles.input, telefonoError ? styles.inputError : null]}
              placeholder={texts[language].enterPhone}
              value={telefono}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
            />
            {telefonoError ? <Text style={styles.errorText}>{telefonoError}</Text> : null}

            <Text style={styles.label}>{texts[language].email} *</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterEmail}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>{texts[language].address} *</Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterAddress}
              value={direccion}
              onChangeText={setDireccion}
            />

            <Text style={styles.label}>{texts[language].uploadImage} *</Text>
            <View style={styles.imageRow}>
              <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                <Ionicons name="camera-outline" size={20} color="black" />
                <Text style={styles.uploadButtonText}>{texts[language].takePhoto}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Ionicons name="image-outline" size={20} color="black" />
                <Text style={styles.uploadButtonText}>{texts[language].selectImage}</Text>
              </TouchableOpacity>
            </View>
            {archivo && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: archivo }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.closeButton} onPress={removeImage}>
                  <Ionicons name="close-circle" size={30} color="red" />
                </TouchableOpacity>
              </View>
            )}

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
        </View>
      </ScrollView>

      {/* Modal de éxito */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sendModalVisible}
        onRequestClose={() => setSendModalVisible(false)}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <LottieView
              source={require('../assets/Animaciones/enviar.json')}
              autoPlay
              loop={false}
              style={styles.animation}
            />
            <Text style={styles.modalSuccessTitle}>{texts[language].success}</Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => {
                setSendModalVisible(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.alertButtonText}>{texts[language].close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <MenuInferior navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  banner: { width: '100%', height: 110, resizeMode: 'cover', marginBottom: 5 },
  scrollContent: { paddingBottom: 100 },
  container: { flex: 1, paddingHorizontal: 20 },
  description: { fontSize: 16, textAlign: 'justify', marginBottom: 10 },
  formContainer: { padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  label: { marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', marginBottom: 10 },
  uploadButton: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#faeeac', borderRadius: 5, marginBottom: 10 },
  uploadButtonText: { marginLeft: 5 },
  imageRow: { flexDirection: 'row', justifyContent: 'space-between' },
  imageContainer: { marginTop: 10, alignItems: 'center' },
  imagePreview: { width: 200, height: 200, borderRadius: 10 },
  closeButton: { position: 'absolute', top: 0, right: 0, backgroundColor: '#fff', borderRadius: 15 },
  dataUsageContainer: { marginVertical: 20 },
  dataUsageText: { fontSize: 12, color: '#555', textAlign: 'justify' },
  submitButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16 },
  alertOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  alertContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  animation: { width: 150, height: 150, marginBottom: 20 },
  modalSuccessTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  alertButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 20 },
  alertButtonText: { color: '#fff', fontSize: 16 },
});

export default DenunciaMicrobasural;

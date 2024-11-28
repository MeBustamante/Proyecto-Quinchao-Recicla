import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
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

  // Función para guardar la imagen en una carpeta local persistente
  const saveImageToFolder = async (uri) => {
    if (!uri) {
      console.error("No se proporcionó URI de la imagen");
      return;
    }

    const destinationUri = FileSystem.documentDirectory + 'Image_denuncias/';
    
    // Asegurarse de que la carpeta exista
    const folderInfo = await FileSystem.getInfoAsync(destinationUri);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(destinationUri, { intermediates: true });
    }
    
    // Obtener el nombre del archivo solo si la URI es válida
    const fileName = uri.split('/').pop();
    const newUri = destinationUri + fileName;

    // Mover la imagen a la carpeta persistente
    await FileSystem.moveAsync({
      from: uri,
      to: newUri
    });

    return newUri;  // Regresar la URI de la imagen movida a la carpeta persistente
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

    console.log("Result from image picker:", result); // Verificar el resultado de la imagen seleccionada

    if (!result.canceled && result.assets && result.assets[0] && result.assets[0].uri) {
      const newUri = await saveImageToFolder(result.assets[0].uri); // Usar result.assets[0].uri
      setArchivo(newUri); // Guardar la URI persistente para usarla más tarde
    } else {
      console.error("No image selected or error with picking image");
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

    console.log("Result from camera:", result); // Verificar el resultado de la foto tomada

    // Asegurarnos de que el resultado tenga la URI correctamente
    if (!result.cancelled && result.assets && result.assets[0] && result.assets[0].uri) {
      const newUri = await saveImageToFolder(result.assets[0].uri); // Usar result.assets[0].uri
      setArchivo(newUri); // Guardar la URI persistente para usarla más tarde
    } else {
      console.error("No photo taken or error with camera");
    }
  };

  const handleSubmit = () => {
    let missingFields = [];
  
    if (!nombre.trim()) missingFields.push(language === 'es' ? 'Nombre y Apellidos' : 'Full Name');
    if (!email.trim()) missingFields.push(language === 'es' ? 'Correo Electrónico' : 'Email');
    if (!telefono.trim()) missingFields.push(language === 'es' ? 'Teléfono' : 'Phone');
    if (!direccion.trim()) missingFields.push(language === 'es' ? 'Dirección del Microbasural' : 'Address');
    if (!archivo) missingFields.push(language === 'es' ? 'Imagen' : 'Image');
  
    if (missingFields.length > 0) {
      const errorMessage = missingFields
        .map((field) => `- ${field}`) // Agrega un guion antes de cada campo
        .join('\n'); // Une los elementos con saltos de línea
      setAlertMessage(errorMessage); // Configura el mensaje en el modal
      setShowErrorModal(true); // Muestra el modal de error
      return;
    }
    
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const [telefonoError, setTelefonoError] = useState(''); // Estado para manejar el error
  
    setAlertVisible(false);
    setSendModalVisible(true);
  
    addNotification(language === 'es' ? `Nueva denuncia en: ${direccion}` : `New complaint at: ${direccion}`);
  
    // Reinicia los campos del formulario
    setNombre('');
    setEmail('');
    setTelefono('');
    setDireccion('');
    setArchivo(null);
  };

  // Función para eliminar la imagen
  const removeImage = () => {
    setArchivo(null); // Elimina la imagen
  };

  return (
    <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']} style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}
      >
        <Image source={require('../assets/basural.png')} style={styles.banner} />
        <View style={styles.container}>
          <Text style={styles.description}>{texts[language].description}</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>{texts[language].fullName}<Text style={styles.requiredAsterisk}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder={texts[language].enterFullName}
              value={nombre}
              onChangeText={(text) => {
                // Solo permitir letras y espacios, y limitar a 40 caracteres
                const sanitized = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').substring(0, 40);
                setNombre(sanitized);
              }}
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
  onChangeText={(text) => {
    // Permitir solo números y el prefijo '+', máximo 12 caracteres
    const sanitized = text.replace(/[^0-9+]/g, '').substring(0, 12);
    setTelefono(sanitized);
  }}
  onBlur={() => {
    // Validar que el formato sea '+569XXXXXXXX' al perder el foco
    if (telefono && (!telefono.startsWith('+56') || telefono.length !== 12)) {
      showCustomAlert(
        language === 'es'
          ? 'El número debe ser un número chileno válido (+56 seguido de 9 dígitos).'
          : 'The number must be a valid Chilean number (+56 followed by 9 digits).'
      );
      setTelefono(''); // Borra el valor si es inválido
    }
  }}
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

      {/* Modal de error para campos faltantes */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <LottieView
              source={require('../assets/Animaciones/fail.json')}
              autoPlay
              loop={true}
              style={styles.animation}
              speed={0.5}
            />
            <Text style={styles.modalErrorTitle}>
              {language === 'es' ? 'Faltan completar los siguientes campos:' : 'The following fields are missing:'}
            </Text>
            <Text style={styles.errorModalText}>{alertMessage}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => setShowErrorModal(false)}>
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
  scrollView: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20 },
  scrollContent: { paddingBottom: 100 },
  description: { fontSize: 16, textAlign: 'justify', color: 'black', marginHorizontal: 10, marginBottom: 5 },
  formContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 20, elevation: 8 },
  label: { fontSize: 14, marginBottom: 3, color: '#333', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 5, borderRadius: 5, marginBottom: 10, backgroundColor: '#fff' },
  uploadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#faeeac', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 8, marginBottom: 8 },
  uploadButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold', marginLeft: 5 },
  imagePreview: { width: 200, height: 200, resizeMode: 'cover', borderRadius: 8, marginTop: 10, alignSelf: 'center' },
  imageContainer: { position: 'relative', alignSelf: 'center' },
  closeButton: { position: 'absolute', top: 5, right: -5, backgroundColor: 'white', borderRadius: 15, padding: 5 },  // Ajusté el valor de "right" a 10
  imageRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  submitButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8, alignItems: 'center', elevation: 8 },
  submitButtonText: { color: 'white', fontSize: 16, fontWeight: '800' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  animation: { width: 100, height: 100, marginBottom: 10 },
  modalSuccessTitle: { fontSize: 18, color: 'green', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  modalSuccessText: { fontSize: 16, color: '#333', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
  errorModalText: { fontSize: 16, color: '#333', textAlign: 'left', marginBottom: 20, marginLeft: -75 },
  requiredAsterisk: { color: 'red', fontSize: 16, marginLeft: 4 },
  modalErrorTitle: { fontSize: 16, color: 'black', fontWeight: 'bold', paddingHorizontal: 8 },
  alertOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  alertContainer: {
    width: '80%',
    maxHeight: 300, // Aumentamos la altura máxima del modal de error
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center', // Asegura que todo el contenido esté centrado
  },
  alertText: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#333' },
  alertButton: {
    backgroundColor: '#FF6347', // Color rojo más visible para errores
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  alertButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  dataUsageContainer: { backgroundColor: '#F9F9F9', paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20, borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  dataUsageText: { fontSize: 13, textAlign: 'justify', color: '#555', fontStyle: 'italic' },
});

export default DenunciaMicrobasural;

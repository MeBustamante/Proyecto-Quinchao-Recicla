import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importación del contexto global

const DenunciaMicrobasural = () => {
  const navigation = useNavigation();
  const { language } = useContext(AppContext); // Obtén el idioma del contexto

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
      thankYou: '¡Gracias por tu compromiso!',
      cleanEnvironment: 'Juntos trabajamos por un Quinchao más limpio y sostenible.',
      close: 'Cerrar',
      galleryPermission: 'Se necesitan permisos para acceder a la galería',
      cameraPermission: 'Se necesitan permisos para usar la cámara',
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
      thankYou: 'Thank you for your commitment!',
      cleanEnvironment: 'Together we work for a cleaner and more sustainable Quinchao.',
      close: 'Close',
      galleryPermission: 'Gallery access permissions are required',
      cameraPermission: 'Camera access permissions are required',
    },
  };

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert(texts[language].galleryPermission);
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
      alert(texts[language].cameraPermission);
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
    setModalVisible(true);
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
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              source={require('../assets/Animaciones/enviar.json')}
              autoPlay
              loop={true}
              style={styles.animation}
            />
            <Text style={styles.modalTitle}>{texts[language].thankYou}</Text>
            <Text style={styles.modalText}>{texts[language].cleanEnvironment}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.closeButtonText}>{texts[language].close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faeeac',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  uploadButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: 'green', // Texto verde
    fontWeight: 'bold', // Texto en negrita
  },  
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '85%',
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
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

export default DenunciaMicrobasural;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker'; // Importamos ImagePicker
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useNavigation } from '@react-navigation/native';

const DenunciaMicrobasural = () => {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [archivo, setArchivo] = useState(null); // Variable para el archivo

  // Solicitar permisos para la cámara y la galería
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la galería');
      return false;
    }
    return true;
  };

  // Función para seleccionar imagen desde la galería
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
      setArchivo(result.uri); // Guardamos la URI de la imagen seleccionada
    }
  };

  // Función para tomar una foto con la cámara
  const takePhoto = async () => {
    const permission = await requestPermission();
    if (!permission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setArchivo(result.uri); // Guardamos la URI de la imagen tomada
    }
  };

  const handleSubmit = () => {
    alert('Formulario enviado');
  };

  return (
    <LinearGradient colors={['#81C784', '#388E3C']} style={styles.background}>
      {/* Logos en la parte superior */}
      <View style={styles.logoContainerLeft}>
        <Image source={require('../assets/LOGO ORIGINAL TRANSPARENCIA.png')} style={styles.logo} />
      </View>
      <View style={styles.logoContainerRight}>
        <Image source={require('../assets/LOG_AMBIENTE.jpg')} style={styles.logo} />
      </View>

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Título y subtítulo */}
        <Text style={styles.title}>Denuncia {"\n"}Microbasural</Text>
        <Text style={styles.description}>Por favor, rellena los datos y adjunta imagen del microbasural que encontraste</Text>

        {/* Formulario enmarcado */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre y Apellidos</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre y apellidos"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />

          <Text style={styles.label}>Dirección del Microbasural</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese la dirección del microbasural"
            value={direccion}
            onChangeText={setDireccion}
          />

          {/* Campo para subir archivo */}
          <Text style={styles.label}>Subir Imagen</Text>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadButtonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>

            {/* Mostrar la imagen seleccionada o tomada */}
            {archivo && <Image source={{ uri: archivo }} style={styles.imagePreview} />}
          </View>

          {/* Botón de Enviar */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Agregar el menú inferior aquí */}
      <MenuInferior navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 20,
    maxHeight: '90%', // Limita la altura del contenedor
    flexShrink: 1,  // Permite que el contenedor se reduzca si es necesario
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  logoContainerLeft: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  logoContainerRight: {
    position: 'absolute',
    top: 30,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
    marginHorizontal: 12,
    marginBottom: 5,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    elevation: 4, // Para sombra en Android
    shadowColor: '#000', // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    flexShrink: 1, // Permite que el formulario se ajuste al espacio disponible
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    height: 40,
  },
  uploadButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 15,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DenunciaMicrobasural;

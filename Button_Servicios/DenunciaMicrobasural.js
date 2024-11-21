import React, { useState } from 'react';
import { View,Text,TextInput,StyleSheet,TouchableOpacity,Image,Alert,KeyboardAvoidingView, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker'; // Importamos ImagePicker
import { Ionicons } from '@expo/vector-icons'; // Iconos de Expo
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';


const DenunciaMicrobasural = () => {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [archivo, setArchivo] = useState(null);

  // Solicitar permisos
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
      setArchivo(result.uri);
    }
  };

  // Función para tomar una foto
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para usar la cámara');
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

  // Mostrar Alert y redirigir a "Home"
  const handleSubmit = () => {
    Alert.alert(
      'Formulario enviado',
      'Tu denuncia ha sido registrada exitosamente.',
      [
        {
          text: 'Cerrar',
          onPress: () => navigation.navigate('Home'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.background}>
      {/* Banner */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

      <Image source={require('../assets/denuncia.png')} style={styles.banner} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <Text style={styles.description}>
            Por favor, rellena los datos y adjunta imagen del microbasural que encontraste.
          </Text>

          {/* Formulario */}
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

            {/* Botones para subir o tomar imagen */}
            <Text style={styles.label}>Subir Imagen</Text>
            <View style={styles.imageRow}>
            <TouchableOpacity style={[styles.uploadButton, styles.leftButton]} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={20} color="black" />
              <Text style={styles.uploadButtonText}>Tomar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.uploadButton, styles.rightButton]} onPress={pickImage}>
              <Ionicons name="image-outline" size={20} color="black" />
              <Text style={styles.uploadButtonText}>Subir Imagen</Text>
            </TouchableOpacity>
            </View>


            {/* Mostrar la imagen seleccionada */}
            {archivo && <Image source={{ uri: archivo }} style={styles.imagePreview} />}

            {/* Botón de Enviar */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
      </ScrollView>

      {/* Menú inferior */}
      <MenuInferior navigation={navigation} />
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
    paddingHorizontal: 15,
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
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  leftButton: {
    flex: 1,
    marginRight: 10, // Espacio entre el botón izquierdo y derecho
  },
  rightButton: {
    flex: 1,
    marginLeft: 10, // Espacio entre el botón derecho y el izquierdo
  },  
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 8, // Sombra en Android
    shadowColor: 'black', // Color de la sombra en iOS
    shadowOffset: { width: 2, height: 4 }, // Desplazamiento de la sombra en iOS
    shadowOpacity: 0.3, // Opacidad de la sombra en iOS
    shadowRadius: 4, // Radio de la sombra en iOS
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default DenunciaMicrobasural;
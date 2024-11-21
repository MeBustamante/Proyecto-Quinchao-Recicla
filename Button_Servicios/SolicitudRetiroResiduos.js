// SolicitudRetiroResiduos.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const SolicitudRetiroResiduos = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [residuo, setResiduo] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    alert('Formulario enviado');
  };

  return (
    <LinearGradient
      colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']}
      style={styles.background}
    >
      {/* Banner con título encima */}
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/retiro.png')} style={styles.banner} />
        <View style={styles.titleOverlay}>
          <Text style={styles.title}>Solicitud de Retiro de Residuos</Text>
        </View>
      </View>

      {/* Contenido del formulario con ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.description}>
            Por favor, rellena los datos solicitados en el siguiente formulario para ir por los residuos.
          </Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre y Apellidos</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su nombre y apellidos"
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su número de teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su dirección"
              value={direccion}
              onChangeText={setDireccion}
            />

            <Text style={styles.label}>Tipo de Residuos</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Latas, plásticos, vidrios, metales, etc."
              value={residuo}
              onChangeText={setResiduo}
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Menú inferior */}
      <MenuInferior navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },bannerContainer: {
    width: '100%',
    height: screenHeight * 0.18, // 18% de la pantalla
    overflow: 'hidden', // Asegúrate de que el contenedor recorte la imagen
    marginBottom: 5,
  },
  banner: {
    width: '100%',
    height: screenHeight * 0.36, // Aumenta la altura de la imagen para recortar desde arriba
    resizeMode: 'cover',
    position: 'absolute',
    top: -screenHeight * 0.128, // Desplaza la imagen hacia arriba
  },
  titleOverlay: {
    position: 'absolute',
    top: '50%',
    left: '63%',
    transform: [{ translateX: -screenWidth * 0.5 }, { translateY: -10 }],
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  scrollContainer: {
    paddingBottom: 80, // Espacio para evitar que el contenido se superponga con el menú inferior
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 80,
    marginBottom: 15,
    backgroundColor: '#ffffff',
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

export default SolicitudRetiroResiduos;
// SolicitudRetiroResiduos.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MenuInferior from './MenuInferior';

const SolicitudRetiroResiduos = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [residuo, setResiduo] = useState('');

  // Agregar useNavigation aquí
  const navigation = useNavigation();

  const handleSubmit = () => {
    alert('Formulario enviado');
  };

  return (
    <LinearGradient colors={['#81C784', '#388E3C']} style={styles.background}>
      {/* Logos en la parte superior */}
      <View style={styles.logoContainerLeft}>
        <Image source={require('./assets/LOGO ORIGINAL TRANSPARENCIA.png')} style={styles.logo} />
      </View>
      <View style={styles.logoContainerRight}>
        <Image source={require('./assets/LOG_AMBIENTE.jpg')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        {/* Título y descripción */}
        <Text style={styles.title}>Solicitud de {"\n"}Retiro de Residuos</Text>
        <Text style={styles.description}>
          Aquí puedes solicitar el retiro de residuos de acuerdo a tus necesidades. Por favor, llena los detalles en el formulario.
        </Text>

        {/* Formulario enmarcado */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre</Text>
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

          {/* Botón de Enviar */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    paddingTop: 58,
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
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    elevation: 4, // Para sombra en Android
    shadowColor: '#000', // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
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
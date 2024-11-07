import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from './firebaseConfig'; // Importa tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

export default function SolicitudRetiro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [residuo, setResiduo] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'solicitudes'), {
        nombre,
        email,
        direccion,
        residuo
      });
      alert('Solicitud enviada con éxito');
    } catch (e) {
      console.error("Error al enviar la solicitud: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SOLICITUD PARA RETIRO DE RESIDUOS</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre y apellidos"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su dirección"
          value={direccion}
          onChangeText={setDireccion}
        />
        <TextInput
          style={styles.textArea}
          placeholder="¿Qué clase de residuo desea que retiremos?"
          value={residuo}
          onChangeText={setResiduo}
          multiline={true}
          numberOfLines={4}
        />

        <Button title="Enviar" onPress={handleSubmit} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaPrincipal')}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaPrincipal')}>
          <FontAwesome name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AcercaDe')}>
          <FontAwesome name="info-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 80,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
});
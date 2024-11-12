// SolicitudRetiroResiduos.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SolicitudRetiroResiduos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitud de Retiro de Residuos</Text>
      <Text style={styles.description}>
        Aquí puedes solicitar el retiro de residuos de acuerdo a tus necesidades. Por favor, llena los detalles en el formulario.
      </Text>
      {/* Aquí podrías añadir formularios, botones u otros componentes que se requieran */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default SolicitudRetiroResiduos;
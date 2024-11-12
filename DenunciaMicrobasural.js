import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DenunciaMicrobasural = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Denuncia de Microbasural</Text>
      <Text style={styles.description}>
        En esta sección puedes realizar la denuncia de un microbasural. Por favor, proporciona la ubicación y una descripción del lugar afectado.
      </Text>
      {/* Aquí puedes añadir formularios, botones u otros componentes según sea necesario */}
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

export default DenunciaMicrobasural;
// Servicios.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServiciosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios</Text>
      <Text>Detalles sobre los servicios disponibles...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ServiciosScreen;

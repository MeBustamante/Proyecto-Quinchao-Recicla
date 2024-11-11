import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para los íconos de Ionicons

const MenuInferior = ({ navigation }) => {
  return (
    <View style={styles.menuContainer}>
      {/* Botón de Configuración (izquierda) */}
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="settings-outline" size={24} color="white" />
        <Text style={styles.menuText}>Configuración</Text>
      </TouchableOpacity>
      
      {/* Botón de Inicio (centro) */}
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="home-outline" size={24} color="white" />
        <Text style={styles.menuText}>Inicio</Text>
      </TouchableOpacity>
      
      {/* Botón de Ayuda (derecha) */}
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="help-circle-outline" size={24} color="white" />
        <Text style={styles.menuText}>Ayuda</Text>
      </TouchableOpacity>

      {/* Botón de Acerca de (nuevo) */}
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => navigation.navigate('Acerca')}  // Navega a App.js
      >
        <Ionicons name="information-circle-outline" size={24} color="white" />
        <Text style={styles.menuText}>Acerca de</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row', // Alinear los botones en una fila
    justifyContent: 'space-evenly', // Distribuir los botones de manera uniforme
    padding: 10,
    backgroundColor: '#4CAF50', // Fondo verde, puedes cambiarlo
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2, // Agregar el contorno
    borderColor: 'white', // Establecer el color del contorno como blanco
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default MenuInferior; // El export default permanece intacto

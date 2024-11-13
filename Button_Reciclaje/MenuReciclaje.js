import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importamos LinearGradient
import MenuInferior from '../Menu_Inferior/MenuInferior'; // Importa el archivo del menú inferior

const MenuReciclaje = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
        
        {/* Logo en la esquina superior izquierda */}
        <View style={styles.logoContainerLeft}>
          <Image 
            source={require('../assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
            style={styles.logo} 
          />
        </View>

        {/* Logo en la esquina superior derecha */}
        <View style={styles.logoContainerRight}>
          <Image 
            source={require('../assets/LOG_AMBIENTE.jpg')} 
            style={styles.logo} 
          />
        </View>

        {/* Título de la pantalla */}
        <Text style={styles.header}>Menu de Reciclaje</Text>

        {/* Botones de selección */}
        <View style={styles.buttonsContainer}>
          {/* Primer botón - Programas de Compostaje */}
          <TouchableOpacity
            style={styles.programBox}
            onPress={() => navigation.navigate('Programas1')}  // Navegar a Programas1
          >
            <Text style={styles.buttonText}>Programas de Compostaje</Text>
          </TouchableOpacity>

          {/* Segundo botón - Campañas de Reciclaje */}
          <TouchableOpacity
            style={styles.programBox}
            onPress={() => navigation.navigate('Campañas1')}  // Navegar a Programas1
          >
            <Text style={styles.buttonText}>Campañas de Reciclaje</Text>
          </TouchableOpacity>

          {/* Tercer botón - Gestión Residuos */}
          <TouchableOpacity
            style={styles.programBox}
            onPress={() => navigation.navigate('Gestion')}  // Navegar a Gestión Residuos
          >
            <Text style={styles.buttonText}>Gestión de Residuos</Text>
          </TouchableOpacity>

          
        </View>
      </LinearGradient>

      {/* Menú Inferior */}
      <MenuInferior />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  gradientBackground: { flex: 1, width: '100%', alignItems: 'center', paddingVertical: 20 },
  logoContainerLeft: { position: 'absolute', top: 30, left: 10, zIndex: 1 },
  logoContainerRight: { position: 'absolute', top: 30, right: 10, zIndex: 1 },
  logo: { width: 80, height: 80, resizeMode: 'contain' },
  header: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop: 140, marginBottom: 20 },
  buttonsContainer: { width: '80%', marginTop: 40 },
  programBox: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 15, // Espacio entre los botones
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Hace que los botones tengan el mismo ancho
  },
  buttonText: { fontSize: 18, color: '#000', fontWeight: 'bold' },
});

export default MenuReciclaje;

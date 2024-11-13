// MenuReciclaje.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const MenuReciclaje = ({ navigation }) => {
  const [showCompostajeOptions, setShowCompostajeOptions] = useState(false);
  const [showCampanasOptions, setShowCampanasOptions] = useState(false);
  const compostajeOpacity = useState(new Animated.Value(0))[0];
  const campanasOpacity = useState(new Animated.Value(0))[0];

  const toggleCompostajeOptions = () => {
    setShowCompostajeOptions(!showCompostajeOptions);
    Animated.timing(compostajeOpacity, {
      toValue: showCompostajeOptions ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const toggleCampanasOptions = () => {
    setShowCampanasOptions(!showCampanasOptions);
    Animated.timing(campanasOpacity, {
      toValue: showCampanasOptions ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
        
        <Image source={require('../assets/reciclaje_encabezado.png')} style={styles.headerImage} />

        <Text style={styles.header}>Menu de Reciclaje</Text>

        <View style={styles.buttonsContainer}>
          {/* Botón para Programas de Compostaje */}
          <TouchableOpacity
            style={[styles.programBox, styles.compostajeBorder]}
            onPress={toggleCompostajeOptions}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonGradient}>
              <Ionicons name="leaf-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Programas de Compostaje</Text>
            </LinearGradient>
          </TouchableOpacity>

          {showCompostajeOptions && (
            <Animated.View style={{ opacity: compostajeOpacity, alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.subOptionBox}
                onPress={() => navigation.navigate('CompostajeCasa')}
              >
                <LinearGradient colors={['#FF8C00', '#FFA500']} style={styles.innerButtonGradient}>
                  <Ionicons name="home-outline" size={20} color="white" />
                  <Text style={styles.subButtonText}>Compostaje en Casa</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.subOptionBox}
                onPress={() => navigation.navigate('CompostajeComunidad')}
              >
                <LinearGradient colors={['#FF8C00', '#FFA500']} style={styles.innerButtonGradient}>
                  <Ionicons name="people-outline" size={20} color="white" />
                  <Text style={styles.subButtonText}>Compostaje en Comunidad</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Botón para Campañas de Reciclaje */}
          <TouchableOpacity
            style={[styles.programBox, styles.campanasBorder]}
            onPress={toggleCampanasOptions}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonGradient}>
              <Ionicons name="megaphone-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Campañas de Reciclaje</Text>
            </LinearGradient>
          </TouchableOpacity>

          {showCampanasOptions && (
            <Animated.View style={{ opacity: campanasOpacity, alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.subOptionBox}
                onPress={() => navigation.navigate('HuertosUrbanos')}
              >
                <LinearGradient colors={['#FF8C00', '#FFA500']} style={styles.innerButtonGradient}>
                  <Ionicons name="flower-outline" size={20} color="white" />
                  <Text style={styles.subButtonText}>Huertos Urbanos</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.subOptionBox}
                onPress={() => navigation.navigate('ReforestacionUrbana')}
              >
                <LinearGradient colors={['#FF8C00', '#FFA500']} style={styles.innerButtonGradient}>
                  <Ionicons name="leaf-outline" size={20} color="white" />
                  <Text style={styles.subButtonText}>Reforestación Urbana</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Tercer botón - Gestión Residuos */}
          <TouchableOpacity
            style={[styles.programBox, styles.gestionBorder]}
            onPress={() => navigation.navigate('Gestion')}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonGradient}>
              <Ionicons name="trash-bin-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Gestión de Residuos</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <MenuInferior />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  gradientBackground: { flex: 1, width: '100%', alignItems: 'center', paddingVertical: 20 },
  headerImage: { 
    width: '100%', 
    height: 150, 
    resizeMode: 'cover', 
    marginBottom: 10,
    position: 'absolute',
    top: 0,
  },
  header: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop: 160, marginBottom: 20 },
  buttonsContainer: { width: '80%', marginTop: 40 },

  programBox: {
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  // Estilos de bordes personalizados
  compostajeBorder: {
    borderWidth: 2,
    borderColor: '#FFEB3B', // Amarillo
  },
  campanasBorder: {
    borderWidth: 2,
    borderColor: '#FF9800', // Naranja
  },
  gestionBorder: {
    borderWidth: 2,
    borderColor: '#4CAF50', // Verde
  },

  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subOptionBox: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  innerButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: { fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 10 },
  subButtonText: { fontSize: 16, color: 'white', fontWeight: 'bold', marginLeft: 10 },
});

export default MenuReciclaje;

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
        
        {/* Encabezado con imagen */}
        <Image source={require('../assets/reciclaje_encabezado.png')} style={styles.headerImage} />

        <Text style={styles.header}>Menu de Reciclaje</Text>

        <View style={styles.buttonsContainer}>
          {/* Botón para Programas de Compostaje */}
          <TouchableOpacity
            style={styles.programBox}
            onPress={toggleCompostajeOptions}
            activeOpacity={0.8}
          >
            <Ionicons name="leaf-outline" size={24} color="green" />
            <Text style={styles.buttonText}>Programas de Compostaje</Text>
          </TouchableOpacity>

          {showCompostajeOptions && (
            <Animated.View style={{ opacity: compostajeOpacity }}>
              <TouchableOpacity
                style={[styles.subOptionBox, { marginLeft: 20 }]}
                onPress={() => navigation.navigate('CompostajeCasa')}
              >
                <LinearGradient colors={['#A5D6A7', '#66BB6A']} style={styles.gradientButton}>
                  <Ionicons name="home-outline" size={20} color="green" />
                  <Text style={styles.buttonText}>Compostaje en Casa</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.subOptionBox, { marginLeft: 20 }]}
                onPress={() => navigation.navigate('CompostajeComunidad')}
              >
                <LinearGradient colors={['#A5D6A7', '#66BB6A']} style={styles.gradientButton}>
                  <Ionicons name="people-outline" size={20} color="green" />
                  <Text style={styles.buttonText}>Compostaje en Comunidad</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Botón para Campañas de Reciclaje */}
          <TouchableOpacity
            style={styles.programBox}
            onPress={toggleCampanasOptions}
            activeOpacity={0.8}
          >
            <Ionicons name="megaphone-outline" size={24} color="green" />
            <Text style={styles.buttonText}>Campañas de Reciclaje</Text>
          </TouchableOpacity>

          {showCampanasOptions && (
            <Animated.View style={{ opacity: campanasOpacity }}>
              <TouchableOpacity
                style={[styles.subOptionBox, { marginLeft: 20 }]}
                onPress={() => navigation.navigate('HuertosUrbanos')}
              >
                <LinearGradient colors={['#A5D6A7', '#66BB6A']} style={styles.gradientButton}>
                  <Ionicons name="flower-outline" size={20} color="green" />
                  <Text style={styles.buttonText}>Huertos Urbanos</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.subOptionBox, { marginLeft: 20 }]}
                onPress={() => navigation.navigate('ReforestacionUrbana')}
              >
                <LinearGradient colors={['#A5D6A7', '#66BB6A']} style={styles.gradientButton}>
                <Ionicons name="leaf-outline" size={20} color="green" />
                  <Text style={styles.buttonText}>Reforestación Urbana</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Tercer botón - Gestión Residuos */}
          <TouchableOpacity
            style={styles.programBox}
            onPress={() => navigation.navigate('Gestion')}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-bin-outline" size={24} color="green" />
            <Text style={styles.buttonText}>Gestión de Residuos</Text>
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
  headerImage: { width: '100%', height: 150, resizeMode: 'cover', marginBottom: 10 },
  logoContainerLeft: { position: 'absolute', top: 30, left: 10, zIndex: 1 },
  logoContainerRight: { position: 'absolute', top: 30, right: 10, zIndex: 1 },
  logo: { width: 80, height: 80, resizeMode: 'contain' },
  header: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop: 20, marginBottom: 20 },
  buttonsContainer: { width: '80%', marginTop: 40 },
  programBox: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  subOptionBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: { fontSize: 18, color: '#000', fontWeight: 'bold', marginLeft: 10 },
});

export default MenuReciclaje;

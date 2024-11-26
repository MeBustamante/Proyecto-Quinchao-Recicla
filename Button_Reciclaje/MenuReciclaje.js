import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto

const MenuReciclaje = ({ navigation }) => {
  const { language } = useContext(AppContext); // Obtener el idioma actual

  const [compostajeHeight] = useState(new Animated.Value(0));
  const [campanasHeight] = useState(new Animated.Value(0));
  const [showCompostajeOptions, setShowCompostajeOptions] = useState(false);
  const [showCampanasOptions, setShowCampanasOptions] = useState(false);

  const texts = {
    es: {
      compostaje: 'Programas de Compostaje',
      compostajeCasa: 'Compostaje en Casa',
      compostajeComunidad: 'Compostaje en Comunidad',
      campanas: 'Campañas de Reciclaje',
      huertos: 'Huertos Urbanos',
      reforestacion: 'Reforestación Urbana',
      gestion: 'Calendario de Recolección',
    },
    en: {
      compostaje: 'Composting Programs',
      compostajeCasa: 'Home Composting',
      compostajeComunidad: 'Community Composting',
      campanas: 'Recycling Campaigns',
      huertos: 'Urban Gardens',
      reforestacion: 'Urban Reforestation',
      gestion: 'Collection Schedule',
    },
  };

  const toggleCompostajeOptions = () => {
    if (!showCompostajeOptions) {
      Animated.timing(campanasHeight, { toValue: 0, duration: 300, easing: Easing.ease, useNativeDriver: false }).start();
      setShowCampanasOptions(false);
    }

    const toValue = showCompostajeOptions ? 0 : 150;
    setShowCompostajeOptions(!showCompostajeOptions);
    Animated.timing(compostajeHeight, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const toggleCampanasOptions = () => {
    if (!showCampanasOptions) {
      Animated.timing(compostajeHeight, { toValue: 0, duration: 300, easing: Easing.ease, useNativeDriver: false }).start();
      setShowCompostajeOptions(false);
    }

    const toValue = showCampanasOptions ? 0 : 150;
    setShowCampanasOptions(!showCampanasOptions);
    Animated.timing(campanasHeight, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
        
        <Image source={require('../assets/reciclaje_encabezado.png')} style={styles.headerImage} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.buttonsContainer}>
            {/* Botón para Programas de Compostaje */}
            <TouchableOpacity
              style={styles.programBox}
              onPress={toggleCompostajeOptions}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonGradient}>
                <Ionicons name="leaf-outline" size={24} color="white" />
                <Text style={styles.buttonText}>{texts[language].compostaje}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Animated.View style={[styles.dropdown, { height: compostajeHeight }]}>
              <TouchableOpacity
                style={styles.subOptionBox}
                onPress={() => navigation.navigate('CompostajeCasa')}
              >
                <Text style={styles.subButtonText}>{texts[language].compostajeCasa}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subOptionBox}
                onPress={() => navigation.navigate('CompostajeComunidad')}
              >
                <Text style={styles.subButtonText}>{texts[language].compostajeComunidad}</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Botón para Campañas de Reciclaje */}
            <TouchableOpacity
              style={styles.programBox}
              onPress={toggleCampanasOptions}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonGradient}>
                <Ionicons name="megaphone-outline" size={24} color="white" />
                <Text style={styles.buttonText}>{texts[language].campanas}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Animated.View style={[styles.dropdown, { height: campanasHeight }]}>
              <TouchableOpacity
                style={styles.subOptionBox}
                onPress={() => navigation.navigate('HuertosUrbanos')}
              >
                <Text style={styles.subButtonText}>{texts[language].huertos}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subOptionBox}
                onPress={() => navigation.navigate('ReforestacionUrbana')}
              >
                <Text style={styles.subButtonText}>{texts[language].reforestacion}</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Tercer botón - Gestión Residuos */}
            <TouchableOpacity
              style={styles.programBox}
              onPress={() => navigation.navigate('Gestion')}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonGradient}>
                <Ionicons name="trash-bin-outline" size={24} color="white" />
                <Text style={styles.buttonText}>{texts[language].gestion}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <MenuInferior />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { flex: 1, width: '100%' },
  headerImage: { 
    width: '100%', 
    height: 130, 
    resizeMode: 'cover', 
    position: 'absolute',
    top: 0,
  },
  scrollContent: { paddingTop: 170, alignItems: 'center' },
  buttonsContainer: { width: '80%', marginBottom: 20 },
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
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dropdown: {
    overflow: 'hidden',
  },
  subOptionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: { fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 10 },
  subButtonText: { fontSize: 16, color: 'white', fontWeight: 'bold' },
});

export default MenuReciclaje;

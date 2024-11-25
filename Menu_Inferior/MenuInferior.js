import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const MenuInferior = () => {
  const { language } = useContext(AppContext); // Obtén el idioma del contexto
  const navigation = useNavigation(); // Se utiliza useNavigation para manejar la navegación

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  // Textos en español e inglés
  const texts = {
    es: {
      config: 'Configuración',
      home: 'Inicio',
      help: 'Ayuda',
      about: 'Acerca de',
    },
    en: {
      config: 'Settings',
      home: 'Home',
      help: 'Help',
      about: 'About Us',
    },
  };

  return (
    <View style={styles.menuContainer}>
      <Image
        source={require('../assets/mascota.png')}
        style={styles.mascotaImage}
      />

      {/* Navegación a Configuración */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('Configuracion')}
      >
        <Ionicons name="settings-outline" size={24} color="white" />
        <Text style={styles.menuText}>{texts[language].config}</Text>
      </TouchableOpacity>

      {/* Navegación a Inicio */}
      <TouchableOpacity style={styles.menuButton} onPress={goToHome}>
        <Ionicons name="home-outline" size={24} color="white" />
        <Text style={styles.menuText}>{texts[language].home}</Text>
      </TouchableOpacity>

      {/* Navegación a Ayuda */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('Ayuda')}
      >
        <Ionicons name="help-circle-outline" size={24} color="white" />
        <Text style={styles.menuText}>{texts[language].help}</Text>
      </TouchableOpacity>

      {/* Navegación a Acerca de */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Acerca')}>
        <Ionicons name="information-circle-outline" size={24} color="white" />
        <Text style={styles.menuText}>{texts[language].about}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
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
  mascotaImage: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    width: 60,
    height: 60,
    zIndex: 1,
  },
});

export default MenuInferior;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const MenuInferior = () => {
  const navigation = useNavigation(); // se cambia a useNavigation para no estar declarando en todas las ventanas

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }], 
    });
  };

  return (
    <View style={styles.menuContainer}>
      <Image 
        source={require('../assets/mascota.png')}
        style={styles.mascotaImage}
      />

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="settings-outline" size={24} color="white" />
        <Text style={styles.menuText}>Configuración</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuButton} onPress={goToHome}>
        <Ionicons name="home-outline" size={24} color="white" />
        <Text style={styles.menuText}>Inicio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="help-circle-outline" size={24} color="white" />
        <Text style={styles.menuText}>Ayuda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Acerca')}>
        <Ionicons name="information-circle-outline" size={24} color="white" />
        <Text style={styles.menuText}>Acerca de</Text>
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

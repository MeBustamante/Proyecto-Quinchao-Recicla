// Acerca de ...
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';  
import { FontAwesome } from '@expo/vector-icons';  
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { Linking } from 'react-native'; // Importar Linking

export default function App() {
  // Funciones para abrir los enlaces
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/muniquinchao/');
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/MuniQuinchao');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/LOGO ORIGINAL TRANSPARENCIA.png')}  
          style={styles.leftImage}
        />
        <Image 
          source={require('../assets/LOG_AMBIENTE.jpg')}  
          style={styles.rightImage}
        />
      </View>

      <Text style={styles.title}>ACERCA DE</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          ¡Bienvenido a la aplicación de Quinchao Recicla!{'\n'}
          Equipo desarrollador esta conformado por Kathya Mansilla, Marcelo Bustamante, Yeremi Aburto, Matias Llaipen y Manuel Sanhueza.{'\n\n'}
          ¡Gracias por elegir nuestra aplicación sobre reciclaje, esperemos que la disfrutes!
        </Text>
      </View>

      <View style={styles.footerContainer}>
        {/* Enlace a Instagram */}
        <TouchableOpacity onPress={openInstagram} style={styles.instagramContainer}>
          <Ionicons name="logo-instagram" size={24} color="#833AB4" style={styles.instagramIcon} />
          <Text style={styles.footerText}>@muniquinchao</Text>
        </TouchableOpacity>

        {/* Enlace a Facebook */}
        <TouchableOpacity onPress={openFacebook} style={styles.facebookContainer}>
          <FontAwesome name="facebook" size={24} color="#3b5998" style={styles.facebookIcon} />
          <Text style={styles.footerText}>Municipalidad Quinchao</Text>
        </TouchableOpacity>
      </View>

      <MenuInferior />  

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#28a745', 
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  imageContainer: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20, 
  },
  leftImage: {
    width: 90, 
    height: 100,
  },
  rightImage: {
    width: 90, 
    height: 90,
  },
  infoContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#D3D3D3',  
    borderRadius: 10,
    marginBottom: 20, 
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',  
  },
  footerContainer: {
    width: '90%',
    alignItems: 'center',  
  },
  instagramContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    marginBottom: 10,  
  },
  instagramIcon: {
    marginRight: 10,  
  },
  facebookContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
  },
  facebookIcon: {
    marginRight: 10,  
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

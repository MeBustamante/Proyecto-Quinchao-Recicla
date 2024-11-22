// Acerca de ...
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';  
import { FontAwesome } from '@expo/vector-icons';  
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { Linking } from 'react-native'; // Importar Linking
import { LinearGradient } from 'expo-linear-gradient'; // Importamos LinearGradient

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
      {/* Aplicamos el LinearGradient como fondo */}
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
      
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/LOG_AMBIENTE.jpg')}  
            style={styles.rightImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            ¡Bienvenido a la aplicación de Quinchao Recicla!{'\n'}
            El equipo desarrollador está conformado por Kathya Mansilla, Marcelo Bustamante, Yeremi Aburto, Matías Llaipen y Manuel Sanhueza.{'\n\n'}
            ¡Gracias por elegir nuestra aplicación sobre reciclaje, esperamos que la disfrutes!{'\n\n'}
          </Text>
          
          {/* Contenedor para las redes sociales */}
          <View style={styles.footerContainer}>
            {/* Enlace a Instagram */}
            <TouchableOpacity onPress={openInstagram} style={styles.socialIconContainer}>
              <Ionicons name="logo-instagram" size={24} color="#833AB4" style={styles.icon} />
              <Text style={styles.footerText}>@muniquinchao</Text>
            </TouchableOpacity>

            {/* Enlace a Facebook */}
            <TouchableOpacity onPress={openFacebook} style={styles.socialIconContainer}>
              <FontAwesome name="facebook" size={24} color="#3b5998" style={styles.icon} />
              <Text style={styles.footerText}>Municipalidad Quinchao</Text>
            </TouchableOpacity>
          </View>
        </View>

      </LinearGradient>

      <MenuInferior />  

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  gradientBackground: { 
    flex: 1,  
    width: '100%',  
    alignItems: 'center', 
    justifyContent: 'flex-start',  
    padding: 10,  
  },
  
  imageContainer: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'center',  
    marginBottom: 20, 
  },
  leftImage: {
    width: 80, 
    height: 90,
    marginRight: 10,  
  },
  rightImage: {
    width: 80, 
    height: 80,
  },
  infoContainer: {
    width: '90%',
    padding: 18,
    backgroundColor: '#F0FFFF',  
    borderRadius: 10,
    marginBottom: 20, 
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'justify',  
  },
  footerContainer: {
    width: '100%',  
    flexDirection: 'column',  
    alignItems: 'flex-start',  
    marginTop: 20,  
  },
  socialIconContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    marginBottom: 15,  
  },
  icon: {
    marginRight: 10,  
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',  
  },
});

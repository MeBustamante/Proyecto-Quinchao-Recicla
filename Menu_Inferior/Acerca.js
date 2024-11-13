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
      <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
      
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/LOG_AMBIENTE.jpg')}  
            style={styles.rightImage}
          />
        </View>

        <Text style={styles.title}>Acerca de </Text>

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
  title: {
    fontSize: 24,
    color: '#000',  // Cambiar el color del título a negro
    fontWeight: 'bold',
    marginBottom: 30, 
  },
  imageContainer: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'flex-start',  // Alineamos los logos a la izquierda
    marginBottom: -25, 
  },
  leftImage: {
    width: 80, 
    height: 90,
    marginRight: 10,  // Espacio entre los dos logos
  },
  rightImage: {
    width: 80, 
    height: 80,
  },
  infoContainer: {
    width: '90%',
    padding: 20,
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
    width: '100%',  // Asegura que los íconos ocupen todo el ancho disponible
    flexDirection: 'column',  // Organiza los íconos de forma vertical
    alignItems: 'flex-start',  // Alinea los elementos a la izquierda
    marginTop: 20,  // Margen superior para separar de los textos anteriores
  },
  socialIconContainer: {
    flexDirection: 'row',  // Alinea los íconos con el texto en una fila
    alignItems: 'center',  // Alinea verticalmente los íconos y el texto
    marginBottom: 15,  // Espaciado entre los enlaces
  },
  icon: {
    marginRight: 10,  // Espacio entre el ícono y el texto
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',  // Asegura que el texto se alinee a la izquierda
  },
});

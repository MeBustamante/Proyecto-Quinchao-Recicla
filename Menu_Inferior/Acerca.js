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
            ¡¡Bienvenid@s a Quinchao Recicla!!{'\n'}
            El equipo de desarrollo está compuesto por Kathya Mansilla, Marcelo Bustamante, Yeremi Aburto, Matías Llaipen y Manuel Sanhueza.{'\n\n'}
            ¡Gracias por elegir nuestra app y unirte al cuidado del planeta! Juntos podemos hacer la diferencia. ¡Disfruta y sigue contribuyendo al cambio!
          </Text>
          
          <Image
            source={require('../assets/XD.jpg')}  // Ruta de la nueva imagen
            style={styles.newImage}  // Usamos el estilo actualizado
          />

          <Text style={styles.infoText}>
            ¡Síguenos en Redes Sociales!
          </Text>
          {/* Contenedor para las redes sociales */}
          <View style={styles.footerContainer}>
            {/* Enlace a Instagram */}
            <TouchableOpacity onPress={openInstagram} style={styles.socialIconContainer}>
              <Ionicons name="logo-instagram" size={29} color="#833AB4" style={styles.icon} />
              <Text style={styles.footerText}>@Muniquinchao</Text>
            </TouchableOpacity>

            {/* Enlace a Facebook */}
            <TouchableOpacity onPress={openFacebook} style={styles.socialIconContainer}>
              <FontAwesome name="facebook" size={29} color="#3b5998" style={styles.icon} />
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
    padding: 5,  // Aumentamos el padding para que no se vea tan comprimido
  },
  
  imageContainer: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'center',  
    marginBottom: 15, 
  },
  rightImage: {
    width: 95,   // Aumentamos un poco el tamaño de la imagen
    height: 95,
    borderRadius: 10,  // Agregamos bordes redondeados
    borderWidth: 2,
    borderColor: '#ccc',
  },
  newImage: {
    width: 290,   // Aumentamos el tamaño de la imagen a 150px
    height: 120,  // Aumentamos el tamaño de la imagen a 150px
    borderRadius: 15,  // Bordes redondeados
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 5,  // Margen inferior para separación
  },
  infoContainer: {
    width: '90%',
    padding: 15,
    backgroundColor: '#F0FFFF',  
    borderRadius: 15,
    marginBottom: 20, 
    shadowColor: '#000',  // Agregamos sombra para dar un efecto elevado
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'justify',
    marginTop: -8,  
  },
  footerContainer: {
    width: '100%',  
    flexDirection: 'column',  
    alignItems: 'flex-start',  
    marginTop: 15,  
  },
  socialIconContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    marginBottom: 10,  // Aumentamos el margen para mayor separación
  },
  icon: {
    marginRight: 9,  // Más espacio entre el ícono y el texto
  },
  footerText: {
    fontSize: 17,
    color: '#333',
    textAlign: 'left',  
  },
});

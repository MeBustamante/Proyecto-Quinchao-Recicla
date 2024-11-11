// Acerca de ...
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';  // Para el ícono de Instagram
import { FontAwesome } from '@expo/vector-icons';  // Para el ícono de Facebook

export default function App() {
  return (
    <View style={styles.container}>
      {/* Contenedor para las imágenes en la parte superior */}
      <View style={styles.imageContainer}>
        {/* Imagen izquierda */}
        <Image 
          source={require('./assets/LOGO ORIGINAL TRANSPARENCIA.png')}  // Ruta de la imagen izquierda
          style={styles.leftImage}
        />
        
        {/* Imagen derecha */}
        <Image 
          source={require('./assets/LOG_AMBIENTE.jpg')}  // Ruta de la imagen derecha
          style={styles.rightImage}
        />
      </View>

      {/* Título en verde */}
      <Text style={styles.title}>ACERCA DE</Text>

      {/* Cuadro gris con los textos principales */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Bienvenido a la aplicación de Quinchao Recicla...{'\n'}
          Descripción de la aplicación y quienes formaron parte de la APP...{'\n\n'}
          ¡Gracias por elegir nuestra aplicación sobre reciclaje, esperemos que la disfrutes!
        </Text>
      </View>

      {/* Información adicional fuera del cuadro gris */}
      <View style={styles.footerContainer}>
        <View style={styles.instagramContainer}>
          <Ionicons name="logo-instagram" size={24} color="#833AB4" style={styles.instagramIcon} />
          <Text style={styles.footerText}>@instagrammuni</Text>
        </View>
        <View style={styles.facebookContainer}>
          <FontAwesome name="facebook" size={24} color="#3b5998" style={styles.facebookIcon} />
          <Text style={styles.footerText}>Municipalidad Quinchao</Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco para toda la pantalla
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#28a745', // Color verde para el título
    fontWeight: 'bold',
    marginBottom: 20, // Espacio debajo del título
  },
  imageContainer: {
    width: '100%',
    flexDirection: 'row', // Para alinear las imágenes a la izquierda y derecha
    justifyContent: 'space-between', // Espacio entre las dos imágenes
    marginBottom: 20, // Espacio entre las imágenes y el contenido posterior
  },
  leftImage: {
    width: 90, // Ajusta el tamaño de la imagen izquierda
    height: 100,
  },
  rightImage: {
    width: 90, // Ajusta el tamaño de la imagen derecha
    height: 90,
  },
  infoContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#D3D3D3',  // Color gris claro para el fondo del cuadro
    borderRadius: 10,
    marginBottom: 20, // Espacio debajo del cuadro gris
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',  // Alineación centrada para el texto
  },
  footerContainer: {
    width: '90%',
    alignItems: 'center',  // Alineación centrada de los elementos en el pie de página
  },
  instagramContainer: {
    flexDirection: 'row',  // Alinea el ícono y el texto en fila
    alignItems: 'center',  // Centra verticalmente el ícono y el texto
    marginBottom: 10,  // Espacio entre el ícono de Instagram y el siguiente texto
  },
  instagramIcon: {
    marginRight: 10,  // Espacio entre el ícono y el texto
  },
  facebookContainer: {
    flexDirection: 'row',  // Alinea el ícono y el texto en fila
    alignItems: 'center',  // Centra verticalmente el ícono y el texto
  },
  facebookIcon: {
    marginRight: 10,  // Espacio entre el ícono y el texto
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

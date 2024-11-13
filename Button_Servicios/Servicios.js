// Servicios.js
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';


const ServiciosScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#81C784', '#388E3C']}
      style={styles.background}
    >
      {/* Logo en la esquina superior izquierda */}
      <View style={styles.logoContainerLeft}>
        <Image 
          source={require('../assets/LOGONEGRO.png')} 
          style={styles.logo} 
        />
      </View>

      {/* Logo en la esquina superior derecha */}
      <View style={styles.logoContainerRight}>
        <Image 
          source={require('../assets/LOG_AMBIENTE.jpg')} 
          style={styles.logo} 
        />
      </View>

      {/* Contenido principal */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Servicios</Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('SolicitudRetiroResiduos')}
        >
          <Text style={styles.buttonText}>Solicitud Retiro Residuos</Text>
          <Text style={styles.subtitulo}>Acá podrás solicitar el retiro de residuos de tu domicilio</Text>
          <Image 
            source={require('../assets/solicitudretiro.png')} 
            style={styles.botonimagen} 
          />
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('DenunciaMicrobasural')}
        >
          <Text style={styles.buttonText}>Denuncia Microbasural</Text>
          <Text style={styles.subtitulo}>Acá podrás denunciar microbasurales ilegales que veas en la comuna</Text>
          <Image 
            source={require('../assets/MICROBASURAL.png')} 
            style={styles.botonimagen} 
          />
        </Pressable>
         {/* Agregar el menú inferior */}
         <MenuInferior navigation={navigation} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logo: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain',
  },
  logoContainerLeft: { 
    position: 'absolute', 
    top: 30, 
    left: 10, 
    zIndex: 1 
  },
  logoContainerRight: { 
    position: 'absolute', 
    top: 30, 
    right: 10, 
    zIndex: 1 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 85, // Ajusta la posición vertical
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black',
    textAlign: 'center',
  },
  subtitulo: {
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 15,
    width: '90%',
    alignItems: 'center',
    // Sombra para resaltar el botón
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botonimagen: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
});

export default ServiciosScreen;
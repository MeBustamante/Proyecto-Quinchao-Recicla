// Servicios.js
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ServiciosScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']}
      style={styles.background}
    >
      {/* Imagen tipo banner con el título encima */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../assets/servicios3.png')} 
          style={styles.banner} 
        />
      </View>

      {/* Contenido con ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('SolicitudRetiroResiduos')}
        >
          <Text style={styles.buttonText}>Solicitud Retiro Residuos</Text>
          <Text style={styles.subtitulo}>
            Acá podrás solicitar el retiro de residuos de tu domicilio
          </Text>
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
          <Text style={styles.subtitulo}>
            Acá podrás denunciar microbasurales ilegales que veas en la comuna
          </Text>
          <Image 
            source={require('../assets/MICROBASURAL.png')} 
            style={styles.botonimagen} 
          />
        </Pressable>
      </ScrollView>

      {/* Menú inferior */}
      <View style={styles.menuInferiorContainer}>
        <MenuInferior navigation={navigation} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: screenHeight * 0.19, // 20% de la altura de la pantalla
    marginBottom: 5, // Espacio entre el banner y el contenido principal
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Espacio para evitar que el contenido se superponga con el menú inferior
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  botonimagen: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  menuInferiorContainer: {
    width: screenWidth, // Asegura que ocupe todo el ancho de la pantalla
    position: 'absolute',
    bottom: 0,
  },
});

export default ServiciosScreen;
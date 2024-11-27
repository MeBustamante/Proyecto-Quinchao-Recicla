import React, { useContext } from 'react'; // Importa useContext
import { View, Text, Pressable, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ServiciosScreen = () => {
  const navigation = useNavigation();
  const { language } = useContext(AppContext); // Obtén el idioma del contexto

  // Textos en ambos idiomas
  const texts = {
    es: {
      solicitudRetiro: 'Solicitud Retiro Residuos',
      subtituloRetiro: 'Acá podrás solicitar el retiro de residuos de tu domicilio',
      denunciaMicrobasural: 'Denuncia Microbasural',
      subtituloMicrobasural: 'Acá podrás denunciar microbasurales ilegales que veas en la comuna',
    },
    en: {
      solicitudRetiro: 'Request Waste Collection',
      subtituloRetiro: 'Here you can request the collection of waste from your home',
      denunciaMicrobasural: 'Report Illegal Dumpsites',
      subtituloMicrobasural: 'Here you can report illegal dumpsites in the community',
    },
  };

  // Selecciona el idioma actual
  const t = texts[language];

  return (
    <LinearGradient
      colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']}
      style={styles.background}
    >
    <ScrollView contentContainerStyle={styles.scrollContainer}>

           {/* Imagen tipo banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../assets/servicios3.png')} 
          style={styles.banner} 
        />
      </View>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('SolicitudRetiroResiduos')}
        >
          <Text style={styles.buttonText}>{t.solicitudRetiro}</Text>
          <Text style={styles.subtitulo}>{t.subtituloRetiro}</Text>
          <Image 
            source={require('../assets/solicitudretiro.png')} 
            style={styles.botonimagen} 
          />
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('DenunciaMicrobasural')}
        >
          <Text style={styles.buttonText}>{t.denunciaMicrobasural}</Text>
          <Text style={styles.subtitulo}>{t.subtituloMicrobasural}</Text>
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
    height: screenHeight * 0.11, // 20% de la altura de la pantalla
    marginBottom: 3,
    marginTop: 9, 
  },
  banner: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
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
// Acerca de ...
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';  
import { FontAwesome } from '@expo/vector-icons';  
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { Linking } from 'react-native'; // Import Linking
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { AppContext } from '../ConfigGlobal/AppContext';

export default function App() {
  // Obtén el idioma actual desde el contexto
  const { language, toggleLanguage } = useContext(AppContext);

  // Funciones para abrir los enlaces
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/muniquinchao/');
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/MuniQuinchao');
  };

  // Textos en español e inglés
  const texts = {
    es: {
      welcome: '¡¡Bienvenid@s a Quinchao Recicla!!',
      team: 'El equipo de desarrollo está compuesto por Kathya Mansilla, Marcelo Bustamante, Yeremi Aburto, Matías Llaipen y Manuel Sanhueza.',
      thanks: '¡Gracias por elegir nuestra app y unirte al cuidado del planeta! Juntos podemos hacer la diferencia. ¡Disfruta y sigue contribuyendo al cambio!',
      follow: '¡Síguenos en Redes Sociales!',
      instagramText: '@Muniquinchao',
      facebookText: 'Municipalidad Quinchao',
    },
    en: {
      welcome: 'Welcome to Quinchao Recicla!!',
      team: 'The development team is composed of Kathya Mansilla, Marcelo Bustamante, Yeremi Aburto, Matías Llaipen, and Manuel Sanhueza.',
      thanks: 'Thank you for choosing our app and joining the care of the planet! Together we can make a difference. Enjoy and keep contributing to the change!',
      follow: 'Follow us on Social Media!',
      instagramText: '@Muniquinchao',
      facebookText: 'Municipality of Quinchao',
    }
  };

  // Seleccionamos el texto según el idioma
  const currentTexts = texts[language];

  return (
    <View style={styles.container}>
      {/* Apply the LinearGradient as background */}
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
        
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/LOG_AMBIENTE.jpg')}  
            style={styles.rightImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {currentTexts.welcome}{'\n'}
            {currentTexts.team}{'\n\n'}
            {currentTexts.thanks}
          </Text>
          
          <Image
            source={require('../assets/XD.jpg')}  // Path to the new image
            style={styles.newImage}  // Use the updated style
          />

          <Text style={styles.infoText}>
            {currentTexts.follow}
          </Text>
          {/* Container for social media */}
          <View style={styles.footerContainer}>
            {/* Instagram link */}
            <TouchableOpacity onPress={openInstagram} style={styles.socialIconContainer}>
              <Ionicons name="logo-instagram" size={29} color="#833AB4" style={styles.icon} />
              <Text style={styles.footerText}>{currentTexts.instagramText}</Text>
            </TouchableOpacity>

            {/* Facebook link */}
            <TouchableOpacity onPress={openFacebook} style={styles.socialIconContainer}>
              <FontAwesome name="facebook" size={29} color="#3b5998" style={styles.icon} />
              <Text style={styles.footerText}>{currentTexts.facebookText}</Text>
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
    padding: 5,  // Increased padding to avoid being too compressed
  },
  
  imageContainer: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'center',  
    marginBottom: 15, 
  },
  rightImage: {
    width: 95,   // Increased image size a bit
    height: 95,
    borderRadius: 10,  // Added rounded borders
    borderWidth: 2,
    borderColor: '#ccc',
  },
  newImage: {
    width: 290,   // Increased image size to 150px
    height: 120,  // Increased image size to 150px
    borderRadius: 15,  // Rounded borders
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 5,  // Margin for separation
  },
  infoContainer: {
    width: '90%',
    padding: 15,
    backgroundColor: '#F0FFFF',  
    borderRadius: 15,
    marginBottom: 20, 
    shadowColor: '#000',  // Added shadow for an elevated effect
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
    marginBottom: 10,  // Increased margin for more separation
  },
  icon: {
    marginRight: 9,  // More space between icon and text
  },
  footerText: {
    fontSize: 17,
    color: '#333',
    textAlign: 'left',  
  },
});

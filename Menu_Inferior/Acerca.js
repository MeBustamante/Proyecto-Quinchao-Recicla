// Acerca de ...
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';  
import { FontAwesome } from '@expo/vector-icons';  
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { Linking } from 'react-native'; // Import Linking
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { AppContext } from '../ConfigGlobal/AppContext';

export default function App() {
  // Obtén el idioma actual desde el contexto
  const { language } = useContext(AppContext);

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
      team: 'El equipo de desarrollo está compuesto por Kathya Mansilla, Marcelo Bustamante, Yeremi Aburto, Matías Llaipen y Manuel Sanhueza.',
      thanks: '¡Gracias por elegir nuestra app y unirte al cuidado del planeta! Juntos podemos hacer la diferencia. ¡Disfruta y sigue contribuyendo al cambio!',
      follow: '¡Síguenos en Redes Sociales!',
      instagramText: '@Muniquinchao',
      facebookText: 'Municipalidad Quinchao',
      secondMessage: 'Esta aplicación móvil nació como una iniciativa de la Ilustre Municipalidad de Quinchao, con el objetivo de incentivar el reciclaje y promover la gestión sostenible de residuos en la comunidad.\n\nEl desarrollo de la APP estuvo a cargo de un talentoso equipo de estudiantes de Ingeniería en Informática de la Universidad de Los Lagos, sede Chiloé, quienes con dedicación y creatividad hicieron realidad esta idea:\n\nLíder del Proyecto: Marcelo Bustamante Villarroel\n\nProgramadores y Diseñadores: Matías Llaipén Uribe, Kathya Mansilla Fernández, Manuel Sanhueza Villanueva, Yeremi Aburto Miranda\n\nEsta herramienta es un paso hacia un futuro más limpio y sustentable. ¡Gracias por ser parte del cambio!\n\nCastro, Chiloé, 2024',
    },
    en: {
      team: 'The development team is composed of Kathya Mansilla, Marcelo Bustamante, Yeremi Aburto, Matías Llaipen, and Manuel Sanhueza.',
      thanks: 'Thank you for choosing our app and joining the care of the planet! Together we can make a difference. Enjoy and keep contributing to the change!',
      follow: 'Follow us on Social Media!',
      instagramText: '@Muniquinchao',
      facebookText: 'Municipality of Quinchao',
      secondMessage: 'This mobile app was born as an initiative of the Illustrious Municipality of Quinchao, with the goal of encouraging recycling and promoting sustainable waste management in the community.\n\nThe development of the app was carried out by a talented team of Computer Science students from the University of Los Lagos, Chiloé campus, who with dedication and creativity made this idea a reality:\n\nProject Leader: Marcelo Bustamante Villarroel\n\nProgrammers and Designers: Matías Llaipén Uribe, Kathya Mansilla Fernández, Manuel Sanhueza Villanueva, Yeremi Aburto Miranda\n\nThis tool is a step towards a cleaner and more sustainable future. Thank you for being part of the change!\n\nCastro, Chiloé, 2024',
    }
  };

  // Seleccionamos el texto según el idioma
  const currentTexts = texts[language];

  return (
    <View style={styles.container}>
      {/* Apply the LinearGradient as background */}
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
        
        {/* ScrollView para contenido desplazable */}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/LOG_AMBIENTE.jpg')}  
              style={styles.rightImage}
            />
          </View>

          <View style={styles.infoContainer}>
            {/* Ya no mostramos el texto de bienvenida */}
            
            {/* Segundo texto con la nueva información */}
            <Text style={styles.infoText}>
              {currentTexts.secondMessage}
            </Text>

            <Image
              source={require('../assets/XD.jpg')}  
              style={styles.newImage}  
            />

            <Text style={styles.infoText}>
              {currentTexts.follow}
            </Text>
            
            {/* Contenedor para los iconos de redes sociales */}
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
        </ScrollView>
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
    padding: 1,  
  },
  scrollViewContainer: {
    flexGrow: 1,  // Permite que el contenido crezca si es necesario
    alignItems: 'center',  // Centra el contenido dentro del ScrollView
    paddingBottom: 80,  // Aumentamos el paddingBottom para que no se oculten los botones
  },
  imageContainer: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'center',  
    marginBottom: 10, 
  },
  rightImage: {
    width: 95,   
    height: 95,
    borderRadius: 10,  
    borderWidth: 2,
    borderColor: '#ccc',
  },
  newImage: {
    width: 250,   
    height: 150,  
    borderRadius: 15,  
    borderWidth: 0,
    borderColor: '#',
    marginBottom: 5,  
  },
  infoContainer: {
    width: '90%',
    padding: 15,
    backgroundColor: '#ffff',  
    borderRadius: 15,
    marginBottom: 20, 
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  // Ya no tenemos el estilo para el texto de bienvenida
  // Estilo para los demás textos
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
    padding: 15,  // Añadir padding para asegurar que no se corten los botones
  },
  socialIconContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    marginBottom: 17,  
  },
  icon: {
    marginRight: 9,  
  },
  footerText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'left',  
  },
});

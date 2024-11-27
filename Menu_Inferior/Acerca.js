// Acerca de ...
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
      instagramText: '@Muniquinchao',
      facebookText: 'Municipalidad Quinchao',
      secondMessage: 'Esta aplicación móvil nació como una iniciativa de la Ilustre Municipalidad de Quinchao, con el objetivo de incentivar el reciclaje y promover la gestión sostenible de residuos en la comunidad.\n\nEl desarrollo de la APP estuvo a cargo de un talentoso equipo de estudiantes de Ingeniería en Informática de la Universidad de Los Lagos, sede Chiloé, quienes con dedicación y creatividad hicieron realidad esta idea.\n\nProgramadores y Diseñadores: \nMatías Llaipén Uribe, Marcelo Bustamante Villaroel, Kathya Mansilla Fernández, Manuel Sanhueza Villanueva y Yeremi Aburto Miranda.\n\nEsta herramienta es un paso hacia un futuro más limpio y sustentable. ¡Gracias por ser parte del cambio!\n\nCastro, Chiloé, 2024',
    },
    en: {
      team: 'The development team is composed of Kathya Mansilla,    Marcelo Bustamante, Yeremi Aburto, Matías Llaipen, and Manuel Sanhueza.',
      thanks: 'Thank you for choosing our app and joining the care of the planet! Together we can make a difference. Enjoy and keep contributing to the change!',
      instagramText: '@Muniquinchao',
      facebookText: 'Municipality of Quinchao',
      secondMessage: 'This mobile app was born as an initiative of the Illustrious Municipality of Quinchao, with the goal of encouraging recycling and promoting sustainable waste management in the community.\n\nThe development of the app was carried out by a talented team of Computer Science students from the University of Los Lagos, Chiloé campus, who with dedication and creativity made this idea a reality:\n\nProgrammers and Designers: \nMarcelo Bustamante Villarroel, Matías Llaipén Uribe, Kathya Mansilla Fernández, Manuel Sanhueza Villanueva, Yeremi Aburto Miranda\n\nThis tool is a step towards a cleaner and more sustainable future. Thank you for being part of the change!\n\nCastro, Chiloé, 2024',
    },
  };

  // Seleccionamos el texto según el idioma
  const currentTexts = texts[language];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']} style={styles.gradientBackground}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/LOG_AMBIENTE.jpg')}
              style={styles.rightImage}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {language === 'es'
                ? currentTexts.secondMessage.split('Programadores y Diseñadores: ')[0]
                : currentTexts.secondMessage.split('Programmers and Designers: ')[0]
              }
              <Text style={{ fontWeight: 'bold' }}>
                {language === 'es' ? 'Programadores y Diseñadores:' : 'Programmers and Designers:'}
              </Text>
              {language === 'es'
                ? currentTexts.secondMessage.split('Programadores y Diseñadores: ')[1]
                : currentTexts.secondMessage.split('Programmers and Designers: ')[1]
              }
            </Text>

            {/* Imagen centrada */}
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Image
                source={require('../assets/XD.jpg')}
                style={styles.newImage}
              />
            </View>

            {/* Instagram y Facebook debajo de la imagen */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity onPress={openInstagram} style={styles.socialIconContainer}>
                <Ionicons name="logo-instagram" size={29} color="#833AB4" style={styles.icon} />
                <Text style={styles.footerText}>{currentTexts.instagramText}</Text>
              </TouchableOpacity>

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
    alignItems: 'stretch', // Aseguramos que ocupe todo el ancho
  },
  gradientBackground: {
    flex: 1,
    width: '100%', // Garantiza que ocupe el ancho total de la pantalla
  },
  scrollViewContainer: {
    flexGrow: 1,
    width: '100%', // Evita cualquier desbordamiento horizontal
    paddingBottom: 80,
  },
  imageContainer: {
    width: '100%', // Asegura que no exceda el ancho
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 300,
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
  },
  infoContainer: {
    width: '90%', // Asegura un margen interno uniforme
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignSelf: 'center', // Centra horizontalmente dentro del ScrollView
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',  // Centra el texto
    marginTop: -8,
    lineHeight: 24,  // Ajusta el espacio entre líneas de texto
  },
  socialIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

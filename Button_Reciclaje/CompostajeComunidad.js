import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const translations = {
  es: {
    title: 'Compostaje Comunitario en Quinchao',
    activityTitle: 'Actividad',
    activityText: 'Organización de una jornada de recogida y clasificación de residuos orgánicos.',
    tipsTitle: 'Tips',
    tips: [
      'Asegúrate de que todos los participantes conozcan qué materiales son compostables.',
      'Usa contenedores identificados para separar diferentes tipos de residuos.',
    ],
    recommendationsTitle: 'Recomendación',
    recommendations: 'Participa activamente y motiva a otros a unirse para ver los beneficios del compostaje en acción.',
    backButton: 'Volver',
  },
  en: {
    title: 'Community Composting in Quinchao',
    activityTitle: 'Activity',
    activityText: 'Organizing a collection and classification day for organic waste.',
    tipsTitle: 'Tips',
    tips: [
      'Ensure all participants know which materials are compostable.',
      'Use labeled containers to separate different types of waste.',
    ],
    recommendationsTitle: 'Recommendation',
    recommendations: 'Participate actively and motivate others to join to see the benefits of composting in action.',
    backButton: 'Back',
  },
};

const CompostajeComunidad = ({ navigation }) => {
  const { language } = useContext(AppContext); // Usa el contexto global para obtener el idioma
  const t = translations[language]; // Traducciones dinámicas basadas en el idioma

  return (
    <View style={styles.fullScreen}>
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.infoTitleBlack}>{t.title}</Text>

            <Text style={styles.sectionTitle}>{t.activityTitle}</Text>
            <Text style={[styles.infoText, { textAlign: 'center' }]}>{t.activityText}</Text>

            <Text style={styles.sectionTitle}>{t.tipsTitle}</Text>
            {t.tips.map((tip, index) => (
              <Text key={index} style={styles.infoText}>
                • {tip}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>{t.recommendationsTitle}</Text>
            <Text style={styles.infoText}>{t.recommendations}</Text>

            <Image source={require('../assets/Compostaje2.png')} style={styles.image} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>{t.backButton}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <MenuInferior />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 50, // Ajustado para que el cuadro blanco esté más abajo
    marginBottom: 30,
  },
  infoTitleBlack: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompostajeComunidad;

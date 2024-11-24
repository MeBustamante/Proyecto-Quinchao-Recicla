import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const translations = {
  es: {
    title: 'Compostaje en Casa',
    activityTitle: 'Actividad',
    activityText: 'Preparación y mantenimiento de un compostador doméstico.',
    tipsTitle: 'Tips',
    tips: [
      'Coloca tu compostador en un área sombreada para evitar el secado excesivo.',
      'Mantén un equilibrio entre materiales verdes y marrones para optimizar la descomposición.',
    ],
    recommendationsTitle: 'Recomendación',
    recommendations: 'Controla regularmente la humedad y temperatura del compost para asegurar un proceso efectivo.',
    backButton: 'Volver',
  },
  en: {
    title: 'Home Composting',
    activityTitle: 'Activity',
    activityText: 'Preparation and maintenance of a home composter.',
    tipsTitle: 'Tips',
    tips: [
      'Place your composter in a shaded area to prevent excessive drying.',
      'Maintain a balance between green and brown materials to optimize decomposition.',
    ],
    recommendationsTitle: 'Recommendation',
    recommendations: 'Regularly check the moisture and temperature of the compost to ensure an effective process.',
    backButton: 'Back',
  },
};

const CompostajeCasa = ({ navigation }) => {
  const { language } = useContext(AppContext); // Usa el contexto global para obtener el idioma
  const t = translations[language]; // Traducciones dinámicas basadas en el idioma

  return (
    <View style={styles.fullScreen}>
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
        <ScrollView style={styles.scrollContainer}>
          <View style={[styles.contentContainer, { marginTop: 50 }]}>
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

            <Image source={require('../assets/Compostaje.png')} style={styles.image} />
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
    padding: 15,
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

export default CompostajeCasa;

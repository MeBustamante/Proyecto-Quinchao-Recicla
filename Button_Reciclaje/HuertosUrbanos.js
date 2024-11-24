import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const translations = {
  es: {
    title: 'Huertos Urbanos en Quinchao',
    activityTitle: 'Actividad',
    activityText: 'Diseña y cultiva un huerto urbano utilizando espacios pequeños y técnicas sostenibles.',
    tipsTitle: 'Tips',
    tips: [
      'Usa contenedores reciclados para plantar.',
      'Elige plantas que requieran bajo mantenimiento y se adapten al clima local.',
    ],
    recommendationsTitle: 'Recomendaciones',
    recommendations: 'Colabora con vecinos para intercambiar plantas y recursos, fortaleciendo la comunidad.',
    backButton: 'Volver',
  },
  en: {
    title: 'Urban Gardens in Quinchao',
    activityTitle: 'Activity',
    activityText: 'Design and cultivate an urban garden using small spaces and sustainable techniques.',
    tipsTitle: 'Tips',
    tips: [
      'Use recycled containers for planting.',
      'Choose plants that require low maintenance and adapt to the local climate.',
    ],
    recommendationsTitle: 'Recommendations',
    recommendations: 'Collaborate with neighbors to exchange plants and resources, strengthening the community.',
    backButton: 'Back',
  },
};

const HuertosUrbanos = ({ navigation }) => {
  const { language } = useContext(AppContext); // Usa el contexto global para obtener el idioma
  const t = translations[language]; // Traducciones dinámicas basadas en el idioma

  return (
    <View style={styles.fullScreen}>
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
        <ScrollView style={styles.scrollContainer}>
          <View style={[styles.contentContainer, { marginTop: 30 }]}>
            <Text style={styles.infoTitle}>{t.title}</Text>

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

            <Image source={require('../assets/Huertosurbanos.png')} style={styles.image} />
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
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    padding: 15,
    marginBottom: 30,
  },
  infoTitle: {
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

export default HuertosUrbanos;

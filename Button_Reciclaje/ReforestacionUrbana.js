import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const translations = {
  es: {
    title: 'Reforestación Urbana en Quinchao',
    activityTitle: 'Actividad',
    activityText: 'Participa en la reforestación urbana plantando árboles en zonas públicas para revitalizar el entorno.',
    tipsTitle: 'Tips',
    tips: [
      'Elige especies nativas que requieran poco mantenimiento.',
      'Colabora con organizaciones locales para obtener recursos y permisos necesarios.',
    ],
    recommendationsTitle: 'Recomendaciones',
    recommendations: 'Organiza eventos de plantación comunitarios para fomentar la participación y educación ambiental.',
    backButton: 'Volver',
  },
  en: {
    title: 'Urban Reforestation in Quinchao',
    activityTitle: 'Activity',
    activityText: 'Participate in urban reforestation by planting trees in public areas to revitalize the environment.',
    tipsTitle: 'Tips',
    tips: [
      'Choose native species that require little maintenance.',
      'Collaborate with local organizations to obtain resources and necessary permits.',
    ],
    recommendationsTitle: 'Recommendations',
    recommendations: 'Organize community planting events to promote participation and environmental education.',
    backButton: 'Back',
  },
};

const ReforestacionUrbana = ({ navigation }) => {
  const { language } = useContext(AppContext); // Usa el contexto global para obtener el idioma
  const t = translations[language]; // Traducciones dinámicas basadas en el idioma

  return (
    <View style={styles.fullScreen}>
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.contentContainer}>
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

            <Image source={require('../assets/ReforestacionUrbana.png')} style={styles.image} />
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 50,
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

export default ReforestacionUrbana;

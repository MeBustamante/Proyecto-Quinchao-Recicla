import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const translations = {
    en: {
        title: "Composting at Home",
        activity: "Activity",
        activityDescription: "Preparation and maintenance of a home composter.",
        tips: "Tips",
        tip1: "• Place your composter in a shaded area to avoid excessive drying.",
        tip2: "• Maintain a balance between green and brown materials to optimize decomposition.",
        recommendation: "Recommendation",
        recommendationDescription: "Regularly check the moisture and temperature of the compost to ensure an effective process.",
        backButton: "Back",
    },
    es: {
        title: "Compostaje en Casa",
        activity: "Actividad",
        activityDescription: "Preparación y mantenimiento de un compostador doméstico.",
        tips: "Tips",
        tip1: "• Coloca tu compostador en un área sombreada para evitar el secado excesivo.",
        tip2: "• Mantén un equilibrio entre materiales verdes y marrones para optimizar la descomposición.",
        recommendation: "Recomendación",
        recommendationDescription: "Controla regularmente la humedad y temperatura del compost para asegurar un proceso efectivo.",
        backButton: "Volver",
    },
};

const CompostajeCasa = ({ navigation }) => {
    const { language } = useContext(AppContext); // Usa el contexto global para obtener el idioma
    const t = translations[language]; // Traducciones dinámicas basadas en el idioma

    return (
        <View style={styles.fullScreen}>
            <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']} style={styles.gradientBackground}>
                <View style={[styles.contentContainer, { marginTop: screenHeight * -0.10 }]}>
                    <Text style={styles.infoTitleBlack}>{t.title}</Text>
                    <Text style={styles.sectionTitle}>{t.activity}</Text>
                    <Text style={[styles.infoText, { textAlign: 'justify' }]}>{t.activityDescription}</Text>
                    <Text style={styles.sectionTitle}>{t.tips}</Text>
                    <Text style={styles.infoText}>{t.tip1}</Text>
                    <Text style={styles.infoText}>{t.tip2}</Text>
                    <Text style={styles.sectionTitle}>{t.recommendation}</Text>
                    <Text style={styles.infoText}>{t.recommendationDescription}</Text>
                    <Image source={require('../assets/compostaje.png')} style={styles.image} />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>{t.backButton}</Text>
                    </TouchableOpacity>
                </View>
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
    contentContainer: {
        width: screenWidth * 0.9,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: screenHeight * 0.02,
        marginTop: screenHeight * -0.10, // Bajado ligeramente
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
        textAlign: 'justify',
        lineHeight: 22,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: screenHeight * 0.2,
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

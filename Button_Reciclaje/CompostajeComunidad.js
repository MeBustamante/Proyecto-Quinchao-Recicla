import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const CompostajeComunidad = ({ navigation }) => {
    return (
        <View style={styles.fullScreen}>
            <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoTitleBlack}>Compostaje Comunitario en Quinchao</Text>
                        <Text style={styles.sectionTitle}>Actividad</Text>
                        <Text style={[styles.infoText, { textAlign: 'center' }]}>
                            Organización de una jornada de recogida y clasificación de residuos orgánicos.
                        </Text>
                        <Text style={styles.sectionTitle}>Tips</Text>
                        <Text style={styles.infoText}>
                            • Asegúrate de que todos los participantes conozcan qué materiales son compostables.
                        </Text>
                        <Text style={styles.infoText}>
                            • Usa contenedores identificados para separar diferentes tipos de residuos.
                        </Text>
                        <Text style={styles.sectionTitle}>Recomendación</Text>
                        <Text style={styles.infoText}>
                            Participa activamente y motiva a otros a unirse para ver los beneficios del compostaje en acción.
                        </Text>
                        <Image source={require('../assets/Compostaje2.png')} style={styles.image} />
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.backButtonText}>Volver</Text>
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

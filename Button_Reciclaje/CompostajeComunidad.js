import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const CompostajeComunidad = ({ navigation }) => {
    return (
        <View style={styles.fullScreen}>
            <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoTitleBlack}>Compostaje Comunitario en Quinchao</Text>
                        <Text style={styles.sectionTitle}>Actividad</Text>
                        <Text style={styles.infoText}>
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
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 50,
        marginTop: 20,
        marginBottom: 20,
    },
    infoTitleBlack: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', // Title color changed to black
        textAlign: 'center',
        width: '100%',
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        textAlign: 'center',
        width: '100%',
        marginBottom: 3,
    },
    infoText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'left',
        lineHeight: 20,
        width: '100%',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        marginBottom: 15,
    },
    backButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 10,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CompostajeComunidad;

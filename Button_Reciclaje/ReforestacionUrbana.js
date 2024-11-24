import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const ReforestacionUrbana = ({ navigation }) => {
    return (
        <View style={styles.fullScreen}>
            <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={[styles.contentContainer, {marginTop: 30}]}>
                        <Text style={styles.infoTitle}>Reforestación Urbana en Quinchao</Text>
                        <Text style={styles.sectionTitle}>Actividad</Text>
                        <Text style={styles.infoText}>
                            Participa en la reforestación urbana plantando árboles en zonas públicas para revitalizar el entorno.
                        </Text>
                        <Text style={styles.sectionTitle}>Tips</Text>
                        <Text style={styles.infoText}>
                            • Elige especies nativas que requieran poco mantenimiento.
                        </Text>
                        <Text style={styles.infoText}>
                            • Colabora con organizaciones locales para obtener recursos y permisos necesarios.
                        </Text>
                        <Text style={styles.sectionTitle}>Recomendaciones</Text>
                        <Text style={styles.infoText}>
                            Organiza eventos de plantación comunitarios para fomentar la participación y educación ambiental.
                        </Text>
                        <Image source={require('../assets/ReforestacionUrbana.png')} style={styles.image} />
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

export default ReforestacionUrbana;

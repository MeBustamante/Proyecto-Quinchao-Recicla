import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const HuertosUrbanos = ({ navigation }) => {
    return (
        <View style={styles.fullScreen}>
            <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={[styles.contentContainer, { marginTop: 30 }]}>
                        <Text style={styles.infoTitle}>Huertos Urbanos en Quinchao</Text>
                        <Text style={styles.sectionTitle}>Actividad</Text>
                        <Text style={[styles.infoText, { textAlign: 'center' }]}>
                            Diseña y cultiva un huerto urbano utilizando espacios pequeños y técnicas sostenibles.
                        </Text>
                        <Text style={styles.sectionTitle}>Tips</Text>
                        <Text style={styles.infoText}>
                            • Usa contenedores reciclados para plantar.
                        </Text>
                        <Text style={styles.infoText}>
                            • Elige plantas que requieran bajo mantenimiento y se adapten al clima local.
                        </Text>
                        <Text style={styles.sectionTitle}>Recomendaciones</Text>
                        <Text style={styles.infoText}>
                            Colabora con vecinos para intercambiar plantas y recursos, fortaleciendo la comunidad.
                        </Text>
                        <Image source={require('../assets/Huertosurbanos.png')} style={styles.image} />
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

export default HuertosUrbanos;

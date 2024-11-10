// Campaña2.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from './MenuInferior';

const CampañaReforestacionUrbana = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                <View style={styles.contentContainer}>
                    <Text style={styles.infoTitle}>Reforestación Urbana</Text>
                    <Text style={styles.infoSubtitle}>
                        Plantemos árboles en la ciudad para mejorar el aire y crear un entorno más verde.
                    </Text>
                    <Text style={styles.objectivesTitle}>Objetivos:</Text>
                    <Text style={styles.objectives}>
                        - Aumentar áreas verdes{'\n'}
                        - Reducir la contaminación{'\n'}
                        - Involucrar a la comunidad
                    </Text>
                    <Text style={styles.motivationalText}>
                        "¡Planta un árbol, cambia el futuro!"
                    </Text>
                    <Image source={require('./assets/Compostaje2.png')} style={styles.image} />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Ver otras campañas</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <MenuInferior />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    gradientBackground: { flex: 1, width: '100%', alignItems: 'center', paddingVertical: 20 },
    contentContainer: {
        width: '80%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
        marginTop: 20,
    },
    infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center', marginBottom: 10 },
    infoSubtitle: { fontSize: 14, color: '#000', textAlign: 'center', marginBottom: 10 },
    objectivesTitle: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center', marginBottom: 5 },
    objectives: { fontSize: 14, color: '#000', textAlign: 'center', marginBottom: 15 },
    motivationalText: { fontSize: 14, color: '#000', fontStyle: 'italic', textAlign: 'center', marginBottom: 20 },
    image: { width: '100%', height: 150, borderRadius: 10, marginBottom: 20 },
    backButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
    backButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});

export default CampañaReforestacionUrbana;

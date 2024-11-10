// Compostaje2.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from './MenuInferior';

const CompostajeComunidad = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                <View style={styles.contentContainer}>
                    <Text style={styles.infoTitle}>Compostaje en Comunidad</Text>
                    <Text style={styles.infoSubtitle}>
                        Aprende cómo realizar compostaje en tu comunidad y contribuir al cuidado del medio ambiente a través de una gestión responsable de residuos orgánicos.
                    </Text>
                    <Image source={require('./assets/Compostaje2.png')} style={styles.image} />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Ver otros programas</Text>
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
    infoSubtitle: { fontSize: 14, color: '#000', textAlign: 'center', marginBottom: 20 },
    image: { width: '100%', height: 150, borderRadius: 10, marginBottom: 20 },
    backButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
    backButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});

export default CompostajeComunidad;
// Programa2.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from './MenuInferior';
import { Picker } from '@react-native-picker/picker';  // Asegúrate de tener esta importación

const Programa2 = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState("Compostaje1");

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                <Picker
                    selectedValue={selectedOption}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
                >
                    <Picker.Item label="Compostaje en Casa" value="Compostaje1" />
                    <Picker.Item label="Compostaje en Comunidad" value="Compostaje2" />
                </Picker>

                {selectedOption === "Compostaje1" && (
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoTitle}>Compostaje en Casa</Text>
                        <Text style={styles.infoSubtitle}>
                            Aprende cómo hacer compostaje en casa para reducir residuos orgánicos y enriquecer el suelo de tu jardín.
                        </Text>
                        <Image source={require('./assets/Compostaje.png')} style={styles.image} />
                    </View>
                )}

                {selectedOption === "Compostaje2" && (
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoTitle}>Compostaje en Comunidad</Text>
                        <Text style={styles.infoSubtitle}>
                            Aprende cómo realizar compostaje en tu comunidad y contribuir al cuidado del medio ambiente.
                        </Text>
                        <Image source={require('./assets/Compostaje2.png')} style={styles.image} />
                    </View>
                )}

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Ver otros programas</Text>
                </TouchableOpacity>
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
    picker: { width: '100%', height: 50 }  // Asegúrate de ajustar el estilo del Picker según tu diseño
});

export default Programa2;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const CompostajeComunidad = ({ navigation }) => {
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoTitle}>Compostaje Comunitario</Text>
                        
                        <Text style={styles.sectionTitle}>Cómo Comenzar</Text>
                        <Text style={styles.infoText}>Elige un área común y establece normas claras.</Text>
                        
                        <Text style={styles.sectionTitle}>Tips para Mejorar</Text>
                        <Text style={styles.infoText}>Mantén el compost húmedo y asegura buena ventilación.</Text>
                        
                        <Text style={styles.sectionTitle}>Beneficios</Text>
                        <Text style={styles.infoText}>Reduce residuos y mejora la fertilidad del suelo.</Text>
                        
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <MenuInferior />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    gradientBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    contentContainer: {
        width: '90%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff', // Uniform white background
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50', // Green title
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50', // Green for section titles
        textAlign: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CompostajeComunidad;

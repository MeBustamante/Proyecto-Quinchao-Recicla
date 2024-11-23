import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const CompostajeComunidad = ({ navigation }) => {
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoTitle}>Compostaje Comunitario en Quinchao</Text>
                        <View style={styles.textBlock}>
                            <Text style={styles.sectionTitle}>Cómo Comenzar:</Text>
                            <Text style={styles.infoText}>
                                • Selecciona un área común accesible para todos los miembros de la comunidad.
                            </Text>
                            <Text style={styles.infoText}>
                                • Establece normas claras sobre qué se puede y no se puede compostar.
                            </Text>
                            <Text style={styles.infoText}>
                                • Organiza un sistema de turnos para el mantenimiento del compost.
                            </Text>
                        </View>
                        <View style={styles.textBlock}>
                            <Text style={styles.sectionTitle}>Tips para Mejorar:</Text>
                            <Text style={styles.infoText}>
                                • Mantén el compost húmedo pero no encharcado.
                            </Text>
                            <Text style={styles.infoText}>
                                • Añade materiales ricos en carbono para equilibrar los materiales ricos en nitrógeno.
                            </Text>
                            <Text style={styles.infoText}>
                                • Asegúrate de voltear el compost regularmente para airearlo.
                            </Text>
                        </View>
                        <View style={styles.textBlock}>
                            <Text style={styles.sectionTitle}>Beneficios del Compostaje en Comunidad:</Text>
                            <Text style={styles.infoText}>
                                • Reduce significativamente la cantidad de residuos enviados a vertederos.
                            </Text>
                            <Text style={styles.infoText}>
                                • Produce un fertilizante natural excelente para jardines y espacios comunes.
                            </Text>
                            <Text style={styles.infoText}>
                                • Fomenta un sentido de comunidad y responsabilidad compartida.
                            </Text>
                        </View>
                        <Text style={styles.motivationalText}>
                            "¡Cada pequeño esfuerzo comunitario suma, juntos construimos un futuro más verde y sostenible!"
                        </Text>
                        <Image source={require('../assets/Compostaje2.png')} style={styles.image} />
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
    textBlock: {
        width: '100%',
        backgroundColor: '#ffffff', // Ensured all blocks are white
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50', // Green for titles
        textAlign: 'center',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
        lineHeight: 24,
        marginBottom: 10,
    },
    motivationalText: {
        fontSize: 16,
        color: 'black',
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
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

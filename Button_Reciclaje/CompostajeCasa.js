import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const CompostajeCasa = ({ navigation }) => {
    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentScroll}>
            <View style={styles.container}>
                <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoTitle}>Compostaje en Casa</Text>
                        <Text style={styles.infoSubtitle}>
                            Descubre cómo puedes contribuir al medio ambiente desde tu hogar mediante el compostaje.
                        </Text>
                        <Text style={styles.sectionTitle}>Cómo Comenzar:</Text>
                        <Text style={styles.instructions}>
                            1. Elige un contenedor adecuado para tu espacio.{'\n'}
                            2. Coloca una capa de tierra en el fondo.{'\n'}
                            3. Alterna capas de residuos húmedos y secos.{'\n'}
                            4. Asegúrate de airear el compost regularmente.
                        </Text>
                        <Text style={styles.sectionTitle}>Tips para Mejorar:</Text>
                        <Text style={styles.instructions}>
                            - Mantén el compost húmedo, pero no encharcado.{'\n'}
                            - Corta los residuos en pequeños pedazos para acelerar el proceso.{'\n'}
                            - Evita compostar carne o productos lácteos.
                        </Text>
                        <Text style={styles.sectionTitle}>Beneficios del Compostaje:</Text>
                        <Text style={styles.instructions}>
                            - Reduce la cantidad de residuos enviados a vertederos.{'\n'}
                            - Produce un abono excelente para las plantas.{'\n'}
                            - Ayuda a retener la humedad en el suelo.
                        </Text>
                        <Text style={styles.motivationalText}>
                            ¡Tu esfuerzo individual puede hacer una gran diferencia para nuestro planeta!
                        </Text>
                        <Image source={require('../assets/Compostaje.png')} style={styles.image} />
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
    contentScroll: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: { 
        flex: 1, 
        alignItems: 'center' 
    },
    gradientBackground: { 
        width: '100%', 
        alignItems: 'center', 
        paddingVertical: 20 
    },
    contentContainer: {
        width: '90%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
        marginTop: 20,
        marginBottom: 20,
    },
    infoTitle: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: 'black', 
        textAlign: 'center', 
        marginBottom: 10 
    },
    infoSubtitle: { 
        fontSize: 16, 
        color: 'black', 
        textAlign: 'center', 
        marginBottom: 20 
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        textAlign: 'center',
        marginBottom: 5,
    },
    instructions: {
        fontSize: 14,
        color: 'black',
        textAlign: 'left',
        marginBottom: 15,
    },
    motivationalText: { 
        fontSize: 16, 
        color: 'black', 
        fontStyle: 'italic', 
        textAlign: 'center', 
        marginBottom: 20 
    },
    image: { 
        width: '100%', 
        height: 150, 
        borderRadius: 10, 
        marginBottom: 20 
    },
    backButton: { 
        backgroundColor: '#4CAF50', 
        paddingVertical: 12, 
        paddingHorizontal: 25, 
        borderRadius: 10 
    },
    backButtonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        textAlign: 'center' 
    },
});

export default CompostajeCasa;

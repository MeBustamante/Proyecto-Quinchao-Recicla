import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const CompostajeCasa = ({ navigation }) => {
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoTitle}>Compostaje en Casa en Quinchao</Text>
                        <View style={styles.textBlock}>
                            <Text style={styles.sectionTitle}>Cómo Compostar en Casa</Text>
                            {instruccionesCompostaje.map((instruccion, index) => (
                                <Text style={styles.infoText} key={index}>
                                    • {instruccion}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.textBlock}>
                            <Text style={styles.sectionTitle}>Recomendaciones para el Cuidado</Text>
                            {recomendacionesCuidado.map((recomendacion, index) => (
                                <Text style={styles.infoText} key={index}>
                                    • {recomendacion}
                                </Text>
                            ))}
                        </View>
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

const instruccionesCompostaje = [
    "Elige un contenedor adecuado o área en tu jardín para empezar el compostaje.",
    "Añade restos de comida y desechos de jardín al compost, en capas alternas.",
    "Asegúrate de mantener el compost húmedo y revuélvelo regularmente para oxigenarlo.",
    "Utiliza el compost maduro como abono para tus plantas y jardín después de unos meses.",
    "Educa a tu familia sobre los beneficios del compostaje y cómo pueden contribuir."
];

const recomendacionesCuidado = [
    "No incluyas materiales no biodegradables como plásticos o vidrios.",
    "Evita compostar restos de carne o pescado para no atraer animales.",
    "Cubre el compost para mantener la humedad y protegerlo de la lluvia directa.",
    "Si el compost huele mal, añade más material 'marrón' como hojas secas para equilibrar.",
    "Colabora con tus vecinos para compartir consejos y excedentes de compost."
];

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
        backgroundColor: '#F7E0B8', // Light beige background
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
        padding: 20,
        marginBottom: 20,
    },
    textBlock: {
        width: '100%',
        backgroundColor: '#FFF7E5', // Slightly darker beige for contrast
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
        color: 'black',
        textAlign: 'center',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
        lineHeight: 24, // Increased line height for better readability
        marginBottom: 10, // Adds space between tips
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

export default CompostajeCasa;

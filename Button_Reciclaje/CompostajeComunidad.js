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
                            <Text style={styles.sectionTitle}>Cómo Compostar en Comunidad</Text>
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

const instruccionesCompostaje = [
    "Selecciona un área accesible para todos los miembros de la comunidad.",
    "Establece contenedores de compostaje etiquetados para desechos verdes y marrones.",
    "Agrega capas alternas de materiales verdes y marrones para equilibrar la humedad y aportar nutrientes.",
    "Voltea el compost cada dos semanas para airearlo y acelerar el proceso de descomposición.",
    "Utiliza el compost terminado para fertilizar áreas verdes comunitarias o distribuirlo entre los participantes."
];

const recomendacionesCuidado = [
    "Evita agregar carne, huesos y productos lácteos al compost para no atraer plagas.",
    "Cubre el compost con una capa de tierra o hojas secas para minimizar olores.",
    "Mantén el área de compostaje limpia y ordenada para evitar molestias.",
    "Capacita periódicamente a los nuevos miembros de la comunidad sobre cómo compostar correctamente.",
    "Celebra el esfuerzo comunitario con eventos que muestren los beneficios del compostaje."
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

export default CompostajeComunidad;

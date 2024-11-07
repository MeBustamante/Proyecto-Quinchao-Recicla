// Home.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ route }) => {
    const { nombre } = route.params; // Obtiene el nombre desde los parámetros de la ruta
    const isFeminine = nombre.endsWith('a'); // Determina si el nombre es femenino

    // Convierte el nombre a mayúsculas
    const nombreMayusculas = nombre.toUpperCase(); 

    return (
        <View style={styles.container}>
            <Image 
                source={require('./assets/portada1.jpg')} // Asegúrate de que la imagen esté en la carpeta correcta
                style={styles.backgroundImage} 
            />
            <View style={styles.textContainer}>
                <Text style={styles.greetingText}>¡HOLA, {nombreMayusculas}! 🎉</Text>
                <Text style={styles.welcomeText}>
                    {isFeminine ? '¡BIENVENIDA A QUINCHAO SUSTENTABLE!' : '¡BIENVENIDO A QUINCHAO SUSTENTABLE!'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: 200, // Ajusta la altura según lo necesites
        position: 'absolute',
        top: 0,
    },
    textContainer: {
        position: 'absolute',
        top: 20, // Ajusta la posición del texto
        left: 10, // Alineación a la izquierda
        padding: 10,
    },
    greetingText: {
        fontSize: 25, // Tamaño de fuente más pequeño
        color: '#4CAF50', // Cambia el color a un verde llamativo
        fontWeight: 'bold',
        textAlign: 'left', // Alineación a la izquierda
        textDecorationLine: 'underline', // Texto subrayado
        textShadowColor: 'rgba(0, 0, 0, 0.7)', // Color de sombra
        textShadowOffset: { width: 2, height: 2 }, // Offset de sombra
        textShadowRadius: 3, // Radio de desenfoque de sombra
        letterSpacing: 2, // Aumenta el espaciado entre letras para hacerlas más anchas
    },
    welcomeText: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'left', // Alineación a la izquierda
        textShadowColor: 'rgba(0, 0, 0, 0.7)', // Color de sombra
        textShadowOffset: { width: 1, height: 1 }, // Offset de sombra
        textShadowRadius: 2, // Radio de desenfoque de sombra
    },
});

export default HomeScreen;

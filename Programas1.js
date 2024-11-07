import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Programas1() {
    const [scale1, setScale1] = useState(new Animated.Value(1)); // Para animación de agrandado del primer rectángulo
    const [scale2, setScale2] = useState(new Animated.Value(1)); // Para animación de agrandado del segundo rectángulo
    const [showImage1, setShowImage1] = useState(false); // Controla si la imagen del primer rectángulo se muestra
    const [showImage2, setShowImage2] = useState(false); // Controla si la imagen del segundo rectángulo se muestra
    const [selectedOption, setSelectedOption] = useState(null); // Controla cuál opción está seleccionada

    // Función para animar el primer rectángulo y mostrar la imagen
    const handlePress1 = () => {
        setSelectedOption('option1');
        setShowImage1(true);
        setShowImage2(false); // Ocultar la segunda imagen
        Animated.timing(scale1, {
            toValue: 1.1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    // Función para animar el segundo rectángulo y mostrar la imagen
    const handlePress2 = () => {
        setSelectedOption('option2');
        setShowImage2(true);
        setShowImage1(false); // Ocultar la primera imagen
        Animated.timing(scale2, {
            toValue: 1.1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    // Función para volver a la vista de selección de opciones de compostaje
    const handleGoBack = () => {
        setSelectedOption(null); // Restablecer la selección
        setShowImage1(false); // Ocultar la primera imagen
        setShowImage2(false); // Ocultar la segunda imagen
    };

    return (
        <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.container}>
            {/* Solo muestra el botón "Volver" si se ha seleccionado una opción */}
            {selectedOption && (
                <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                    <Text style={styles.goBackText}>Volver</Text>
                </TouchableOpacity>
            )}

            {/* Logo en la esquina superior izquierda */}
            <View style={styles.logoContainerLeft}>
                <Image 
                    source={require('./assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
                    style={styles.logo} 
                />
            </View>

            {/* Logo en la esquina superior derecha */}
            <View style={styles.logoContainerRight}>
                <Image 
                    source={require('./assets/LOG_AMBIENTE.png')} 
                    style={styles.logo} 
                />
            </View>

            {/* Título Programas */}
            <Text style={styles.header}>Programas</Text>

            {/* Mostrar solo el rectángulo seleccionado */}
            {selectedOption === null && (
                <>
                    <TouchableOpacity 
                        style={[styles.programBox, { transform: [{ scale: scale1 }] }]} 
                        onPress={handlePress1}
                    >
                        <Text style={styles.buttonText}>Compostaje en Casa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.programBox, { transform: [{ scale: scale2 }] }]} 
                        onPress={handlePress2}
                    >
                        <Text style={styles.buttonText}>Compostaje en Comunidad</Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Imagen de compostaje que aparece cuando se presiona el primer rectángulo */}
            {showImage1 && (
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('./assets/Compostaje.png')} 
                        style={styles.largeImage}
                    />
                </View>
            )}

            {/* Imagen de compostaje que aparece cuando se presiona el segundo rectángulo */}
            {showImage2 && (
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('./assets/Compostaje2.png')} 
                        style={styles.largeImage}
                    />
                </View>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Centra los elementos horizontalmente
        justifyContent: 'flex-start', // Coloca los elementos desde la parte superior
    },
    logoContainerLeft: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 1,
    },
    logoContainerRight: {
        position: 'absolute',
        top: 30,
        right: 10,
        zIndex: 1,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 140, // Ajusta el espacio para que esté debajo de los logos
        marginBottom: 20,
    },
    programBox: {
        backgroundColor: '#ffffff',
        borderRadius: 25,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeImage: {
        width: 250,  // Imagen más grande
        height: 250, // Imagen más grande
        resizeMode: 'contain',
        marginBottom: 10,
    },
    goBackButton: {
        position: 'absolute',
        top: '10%',
        left: 20,
        zIndex: 2,
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    goBackText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Programas1;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const Programas1Screen = ({ navigation }) => {
    const [scale1, setScale1] = useState(new Animated.Value(1));
    const [scale2, setScale2] = useState(new Animated.Value(1));
    const [showImage1, setShowImage1] = useState(false);
    const [showImage2, setShowImage2] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showButtons, setShowButtons] = useState(false);  // Nuevo estado para mostrar los botones

    const handlePress1 = () => {
        setSelectedOption('option1');
        setShowImage1(true);
        setShowImage2(false);
        Animated.timing(scale1, {
            toValue: 1.1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        setShowButtons(true);  // Mostrar los botones al presionar
    };

    const handlePress2 = () => {
        setSelectedOption('option2');
        setShowImage2(true);
        setShowImage1(false);
        Animated.timing(scale2, {
            toValue: 1.1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        setShowButtons(true);  // Mostrar los botones al presionar
    };

    const handleBackButton = () => {
        setSelectedOption(null);
        setShowImage1(false);
        setShowImage2(false);
        setShowButtons(false);  // Ocultar los botones cuando se regresa
    };

    const handleGoButton = () => {
        // Navegar al destino adecuado dependiendo de la opción seleccionada
        if (selectedOption === 'option1') {
            navigation.navigate('CompostajeCasa');
        } else if (selectedOption === 'option2') {
            navigation.navigate('CompostajeComunidad');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                {/* Logo en la esquina superior izquierda */}
                <View style={styles.logoContainerLeft}>
                    <Image 
                        source={require('../assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
                        style={styles.logo} 
                    />
                </View>

                {/* Logo en la esquina superior derecha */}
                <View style={styles.logoContainerRight}>
                    <Image 
                        source={require('../assets/LOG_AMBIENTE.jpg')} 
                        style={styles.logo} 
                    />
                </View>

                <Text style={styles.header}>Programas</Text>

                {/* Botones de selección cuando no se ha seleccionado ninguna opción */}
                {selectedOption === null && (
                    <>
                        <TouchableOpacity 
                            style={[styles.programBox, { transform: [{ scale: scale1 }] }]} 
                            onPress={handlePress1}
                        >
                            <Text style={styles.buttonText}>Compostaje en Casa</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.programBox, styles.extraSpacing, { transform: [{ scale: scale2 }] }]} 
                            onPress={handlePress2}
                        >
                            <Text style={styles.buttonText}>Compostaje en Comunidad</Text>
                        </TouchableOpacity>
                    </>
                )}

                {/* Imagen de compostaje que aparece cuando se presiona el primer botón */}
                {showImage1 && (
                    <View style={styles.imageContainer}>
                        <Image 
                            source={require('../assets/Compostaje.png')} 
                            style={styles.largeImage}
                        />
                        <Text style={styles.infoText}>¿Quieres aprender sobre el compostaje en casa?</Text>
                    </View>
                )}

                {/* Imagen de compostaje que aparece cuando se presiona el segundo botón */}
                {showImage2 && (
                    <View style={styles.imageContainer}>
                        <Image 
                            source={require('../assets/Compostaje2.png')} 
                            style={styles.largeImage}
                        />
                        <Text style={styles.infoText}>¿Quieres aprender sobre el compostaje en comunidad?</Text>
                    </View>
                )}

                {/* Botones de Regresar y Ir, solo aparecen si showButtons es true */}
                {showButtons && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                            <Text style={styles.backButtonText}>Regresar</Text>
                        </TouchableOpacity>

                        {/* El botón "Ir" que lleva al destino correcto según la opción seleccionada */}
                        <TouchableOpacity style={styles.goButton} onPress={handleGoButton}>
                            <Text style={styles.goButtonText}>Ir</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </LinearGradient>

            {/* Menú inferior */}
            <MenuInferior />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    gradientBackground: { flex: 1, width: '100%', alignItems: 'center', paddingVertical: 20 },
    logoContainerLeft: { position: 'absolute', top: 30, left: 10, zIndex: 1 },
    logoContainerRight: { position: 'absolute', top: 30, right: 10, zIndex: 1 },
    logo: { width: 80, height: 80, resizeMode: 'contain' },
    header: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop: 140, marginBottom: 20 },
    programBox: {
        backgroundColor: '#ffffff',
        borderRadius: 25,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginBottom: 15, // Espacio entre los botones
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%', // Hace que los botones tengan el mismo ancho
    },
    extraSpacing: {
        marginBottom: 30, // Espacio extra debajo del último botón
    },
    buttonText: { fontSize: 18, color: '#000', fontWeight: 'bold' },
    imageContainer: { 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 10 
    },
    largeImage: { 
        width: 250, 
        height: 250, 
        resizeMode: 'contain' 
    },
    infoText: {
        fontSize: 16,        
        color: '#fff',       
        marginTop: 10,       
        textAlign: 'center',
        width: '90%',        
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '80%', 
        marginTop: 20,
    },
    backButton: { 
        backgroundColor: '#FF0000', 
        paddingVertical: 10, 
        paddingHorizontal: 30, 
        borderRadius: 10,
        borderWidth: 2,       
        borderColor: '#000',  // Border black for both buttons
        flex: 1, marginRight: 10,
    },
    backButtonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        textAlign: 'center' 
    },
    goButton: { 
        backgroundColor: '#4CAF50', 
        paddingVertical: 10, 
        paddingHorizontal: 30, 
        borderRadius: 10,
        borderWidth: 2,       
        borderColor: '#000',  // Border black for both buttons
        flex: 1,
    },
    goButtonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        textAlign: 'center' 
    },
});

export default Programas1Screen;

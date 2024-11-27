import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const Animacion = () => {
    const { language } = useContext(AppContext); // Obtiene el idioma actual del contexto

    // Traducciones dinámicas
    const translations = {
        es: {
            slogan: 'PEQUEÑAS ACCIONES, GRANDES CAMBIOS.',
            question: '¿TE UNES?',
            loading: 'CARGANDO EL MAPA, POR FAVOR ESPERE...',
        },
        en: {
            slogan: 'SMALL ACTIONS, BIG CHANGES.',
            question: 'WILL YOU JOIN?',
            loading: 'LOADING THE MAP, PLEASE WAIT...',
        },
    };

    const currentLanguage = translations[language]; // Selección del idioma actual

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/LOGO NEUTRO HORIZONTAL.png')} 
                    style={styles.logo}
                />
            </View>
            <Text style={styles.text}>{currentLanguage.slogan}</Text>
            <Text style={styles.text}>{currentLanguage.question}</Text>
            <LottieView
                source={require('./animacion2.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <Text style={styles.loadingText}>{currentLanguage.loading}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50', // Fondo verde
    },
    logoContainer: {
        flexDirection: 'row', // Alinea los logos horizontalmente
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // Espacio entre los logos y el texto
    },
    logo: {
        width: 250, // Ajusta el tamaño de los logos
        height: 150,
        marginHorizontal: 10, // Espaciado entre los logos
        resizeMode: 'contain', // Ajusta la imagen al tamaño dado
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10, // Espacio entre líneas
        fontFamily: 'sans-serif',
    },
    animation: {
        width: 250,
        height: 250,
    },
    loadingText: {
        position: 'absolute',
        bottom: 20, // Ubicado cerca del final de la pantalla
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'sans-serif',
    },
});

export default Animacion;

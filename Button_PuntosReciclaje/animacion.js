import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const Animacion = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/LOGO NEUTRO HORIZONTAL.png')} // Ajusta la ruta
                    style={styles.logo}
                />
             
            </View>
            <Text style={styles.text}>PEQUEÑAS ACCIONES, GRANDES CAMBIOS.</Text>
            <Text style={styles.text}>¿TE UNES?</Text>
            <LottieView
                source={require('./Animation.json')} // Ajusta la ruta si es necesario
                autoPlay
                loop
                style={styles.animation}
            />
            <Text style={styles.loadingText}>CARGANDO EL MAPA, POR FAVOR ESPERA...</Text>
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
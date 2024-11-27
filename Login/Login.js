import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const isFocused = useIsFocused(); // Detecta si la pantalla está activa

    // Restablece el estado cada vez que la pantalla está enfocada
    useEffect(() => {
        if (isFocused) {
            setLoading(false);
            setIsNavigating(false);
        }
    }, [isFocused]);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setIsNavigating(true); // Evita renderizar el login durante la navegación
            navigation.navigate('Home'); // Navega a la pantalla principal
        }, 2000);
    };

    if (isNavigating) {
        return null; // Evita renderizar la pantalla login mientras navegas
    }

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
                style={styles.logo} 
            />
            {loading ? (
                <LottieView
                    source={require('./login.json')} // Ruta de tu animación
                    autoPlay
                    loop={false} // Desactiva el loop para que se reproduzca una vez
                    style={styles.animation}
                    onAnimationFinish={() => { 
                        setIsNavigating(true); 
                        navigation.navigate('Home'); 
                    }} // Navega al terminar la animación
                />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Comenzar a Reciclar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F8FF', // Fondo beige claro
    },
    logo: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#005B4F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        width: '60%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    animation: {
        width: 200,
        height: 200,
    },
});

export default LoginScreen;

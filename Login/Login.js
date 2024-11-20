import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; // Importa LottieView

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Home'); // Navega a la pantalla principal
        }, 2000);
    };

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
                    loop
                    style={styles.animation}
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

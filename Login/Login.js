// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Home', { nombre }); // navega a la pantalla principal
        }, 2000); // simula un tiempo de carga de 2 segundos
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('./assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
                style={styles.logo} 
            />
            <Text style={styles.text}>DEPARTAMENTO DE MEDIO AMBIENTE</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#aaa"
                value={nombre}
                onChangeText={setNombre}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Comenzar a Reciclar</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // centrae horizontalmente
        justifyContent: 'center', // centrar verticalmente
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
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
});

export default LoginScreen;

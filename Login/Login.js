// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useUser } from './UserContext'; // Importa el contexto de usuario

const LoginScreen = ({ navigation }) => {
    const { setNombre } = useUser(); // Obtén setNombre del contexto
    const [nombreInput, setNombreInput] = useState(''); // Estado local para el nombre ingresado
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setNombre(nombreInput); // Guarda el nombre en el contexto
            navigation.navigate('Home'); // Navega a Home sin pasar el nombre como parámetro
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
                style={styles.logo} 
            />
            <Text style={styles.text}>DEPARTAMENTO DE MEDIO AMBIENTE</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#aaa"
                value={nombreInput}
                onChangeText={setNombreInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Comenzar a Reciclar</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    logo: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 20 },
    text: { fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 20, textAlign: 'center' },
    input: { width: '80%', padding: 10, borderWidth: 1, borderColor: '#000', borderRadius: 5, color: '#000', marginBottom: 20, textAlign: 'center' },
    button: { backgroundColor: '#005B4F', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, alignItems: 'center', width: '60%' },
    buttonText: { color: 'white', fontSize: 18 },
});

export default LoginScreen;

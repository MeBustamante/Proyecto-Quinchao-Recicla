// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './Home'; // Importa el nuevo componente

const Stack = createNativeStackNavigator();

function StartScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReciclar = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Home', { nombre }); // Navega a la pantalla principal
        }, 2000); // Simula un tiempo de carga de 2 segundos
    };

    return (
        <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('./assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
                    style={styles.logo} 
                />
            </View>
            <Text style={styles.text}>DEPARTAMENTO DE MEDIO AMBIENTE</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#aaa"
                value={nombre}
                onChangeText={setNombre}
            />
            <TouchableOpacity style={styles.button} onPress={handleReciclar} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reciclar</Text>}
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Centra los elementos horizontalmente
        justifyContent: 'center', // Centra los elementos verticalmente
    },
    logoContainer: {
        marginBottom: 20, // Espacio entre el logo y el texto
        alignItems: 'center', // Centra el logo en su contenedor
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#005B4F', // Color más oscuro para el botón
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

// Pantalla_Principal.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PantallaPrincipalScreen = ({ route, navigation }) => {
    const { nombre } = route.params; // Obtiene el nombre desde los parámetros de la ruta

    // Convierte el nombre a mayúsculas
    const nombreMayusculas = nombre.toUpperCase(); 

    // Función para manejar la navegación cuando el botón de reciclaje es presionado
    const handleReciclajeButtonPress = () => {
        navigation.navigate('ReciclajeGestion'); // Asegúrate de que la pantalla 'ReciclajeGestion' esté configurada correctamente
    };

    // Función para manejar la navegación cuando el botón de servicio es presionado
    const handleServicioButtonPress = () => {
        navigation.navigate('Servicio'); // Asegúrate de que la pantalla 'Servicio' esté configurada correctamente
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('./assets/portada1.jpg')} // Asegúrate de que la imagen esté en la carpeta correcta
                style={styles.backgroundImage} 
            />
            <View style={styles.overlay}></View> 
            <View style={styles.textContainer}>
                <View style={styles.textWithLogo}>
                    <View style={styles.textContent}>
                        <Text style={styles.greetingText}>HOLA, {nombreMayusculas}</Text>
                        <Text style={styles.welcomeText}>BIENVENIDO A</Text>
                    </View>
                    <Image 
                        source={require('./assets/LOG_AMBIENTE.jpg')} // Ruta de tu logo
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.appName}>QUINCHAO RECICLA</Text>
            </View>

            {/* Botón Reciclaje y Gestión debajo del banner */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.reciclajeButton} 
                    onPress={handleReciclajeButtonPress}
                >
                    <Image 
                        source={require('./assets/RG.jpg')} // Ruta de la imagen del botón
                        style={styles.reciclajeImage}
                    />
                </TouchableOpacity>
                {/* Texto debajo del botón */}
                <Text style={styles.reciclajeText}>Reciclaje y Gestión</Text>

                {/* Botón Servicio debajo del botón de reciclaje */}
                <TouchableOpacity 
                    style={styles.servicioButton} 
                    onPress={handleServicioButtonPress}
                >
                    <Image 
                    source={require('./assets/servicio.jpg')} 
                    style={styles.servicioImage} 
                    resizeMode="contain" // Añadido para asegurarse de que la imagen se ajuste dentro del contenedor
                    />

                </TouchableOpacity>
                {/* Texto debajo del botón */}
                <Text style={styles.servicioText}>Servicios</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200, // Asegura que el contenido no se superponga con la imagen
    },
    backgroundImage: {
        width: '100%',
        height: 200, // Ajusta la altura del banner
        position: 'absolute',
        top: 0,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textContainer: {
        position: 'absolute',
        top: 40,
        left: 10,
        padding: 10,
        width: '100%',
    },
    textWithLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '97%',
    },
    textContent: {
        flex: 1,
    },
    greetingText: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        textTransform: 'uppercase',
    },
    welcomeText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'sans-serif',
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        textTransform: 'uppercase',
    },
    appName: {
        fontSize: 23,
        color: '#4CAF50',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 15,
        textTransform: 'uppercase',
        marginTop: -10,
    },
    logo: {
        width: 100,
        height: 100,
        marginLeft: 0,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    reciclajeButton: {
        width: '80%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 8,  // Grosor del borde blanco
        borderColor: '#FFFFFF', // Color blanco
        borderRadius: 10, // Bordes redondeados
        padding: 10,  // Espacio entre el borde y el contenido del botón
    },
    reciclajeImage: {
        width: '110%',
        height: '190%',
        borderRadius: 10,
    },
    reciclajeText: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#9acd32',
        marginTop: 21,
    },
    servicioButton: {
        width: '80%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Bordes redondeados
        padding: 10,  // Espacio entre el borde y el contenido del botón
        marginTop: 20, // Espacio entre los botones
    },
    servicioImage: {
        width: '100%', // Ajusta al ancho del contenedor
        height: 120, // Ajusta la altura de la imagen si es necesario
        borderRadius: 10,
        resizeMode: 'contain', // Ajusta la imagen para que no se distorsione
    },
    servicioText: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#9acd32',
        marginTop: 21,
    },
});

export default PantallaPrincipalScreen;
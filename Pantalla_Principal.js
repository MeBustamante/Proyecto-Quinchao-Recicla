import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importamos LinearGradient
import MenuInferior from './MenuInferior'; // Importa el archivo del menú inferior

const PantallaPrincipalScreen = ({ route, navigation }) => {
    const { nombre } = route.params;
    const nombreMayusculas = nombre.toUpperCase();

    const handleReciclajeButtonPress = () => {
        navigation.navigate('Reciclaje');
    };

    const handleBoton2Press = () => {
        console.log("Botón 2 presionado");
        navigation.navigate('Servicios'); // Navegar a la pantalla Servicios
    };

    const handleBoton3Press = () => {
        console.log("Botón 3 presionado");
        navigation.navigate('PuntosReciclaje'); // Navegar a la pantalla Puntos de Reciclaje
    };
        
    return (
        <View style={styles.container}>
            {/* Marco verde con flecha */}
            <View style={styles.imageContainer}>
                <Image 
                    source={require('./assets/p3.jpg')} 
                    style={styles.backgroundImage} 
                />
                <View style={styles.arrowContainer}>
                    <View style={styles.arrow}></View> 
                </View>
            </View>
            <View style={styles.overlay}></View>
            <View style={styles.textContainer}>
                <View style={styles.textWithLogo}>
                    <View style={styles.textContent}>
                        <Text style={styles.greetingText}>HOLA, {nombreMayusculas}</Text>
                        <Text style={styles.welcomeText}>BIENVENIDO A</Text>
                    </View>
                    <Image 
                        source={require('./assets/LOG_AMBIENTE.jpg')}
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.appName}>QUINCHAO RECICLA</Text>
            </View>

            {/* Contenedor para los tres botones */}
            <LinearGradient 
                colors={['#81C784', '#388E3C']}  // Gradiente verde
                style={styles.gradientBackground}
            >
                <View style={styles.buttonsContainer}>
                    {/* Primer botón */}
                    <TouchableOpacity 
                        style={[styles.button, styles.buttonYellowBorder]} 
                        onPress={handleReciclajeButtonPress}
                    >
                        <Text style={[styles.infoTitle, { color: '#FFC107' }]}>RECICLAJE</Text>
                        <Text style={styles.infoSubtitle}>
                            Gestiona tus residuos y únete a la campaña de reciclaje.
                        </Text>
                        <Image source={require('./assets/RG.jpg')} style={styles.buttonImage1} />
                    </TouchableOpacity>

                    {/* Segundo botón */}
                    <TouchableOpacity 
                        style={[styles.button, styles.buttonOrangeBorder]} 
                        onPress={handleBoton2Press}
                    >
                        <Text style={[styles.infoTitle, { color: '#FF9800' }]}>SERVICIOS</Text> 
                        <Text style={styles.infoSubtitle}>
                            Solicita retiro de residuos y reporta microbasurales en tu comunidad.
                        </Text>
                        <Image 
                            source={require('./assets/servicio.jpg')} 
                            style={styles.buttonImage2}  
                        />
                    </TouchableOpacity>

                    {/* Tercer botón */}
                    <TouchableOpacity 
                        style={[styles.button, styles.buttonGreenBorder]} 
                        onPress={handleBoton3Press}
                    >
                        <Text style={[styles.infoTitle, { color: '#4CAF50' }]}>PUNTOS DE RECICLAJE</Text>
                        <Text style={styles.infoSubtitle}>
                            Ubica puntos verdes cercanos para reciclar de manera fácil y responsable.
                        </Text>
                        <Image 
                            source={require('./assets/puntos2.jpg')} 
                            style={styles.buttonImage3} 
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Menú Inferior */}
            <MenuInferior />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50, 
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: '110%',
        height: 200,
        borderWidth: 5,
        borderColor: '#4CAF50', 
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: -55,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    arrowContainer: {
        position: 'absolute',
        bottom: -10,
        right: -10,
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: '#4CAF50',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
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
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        textTransform: 'uppercase',
    },
    welcomeText: {
        fontSize: 20,
        color: '#fff',
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
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 15,
        textTransform: 'uppercase',
        marginTop: -10,
    },
    logo: {
        width: 80,
        height: 80, 
        marginLeft: 10,
    },
    gradientBackground: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20, // Aumenta el espacio superior para que se vea bien
        paddingBottom: 100, // Añade espacio inferior
    },
    buttonsContainer: {
        width: '80%',
        alignItems: 'center',
    },
    button: {
        marginTop: 20, 
        width: '100%',
        padding: 0,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        alignItems: 'center',
        height: 180,
    },
    buttonYellowBorder: {
        borderColor: '#FFEB3B',
    },
    buttonOrangeBorder: {
        borderColor: '#FF9800',
    },
    buttonGreenBorder: {
        borderColor: '#4CAF50',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infoSubtitle: {
        fontSize: 13,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        width: '90%',
    },
    buttonImage1: {
        width: '80%',
        height: 110,
        borderRadius: 10,
    },
    buttonImage2: {
        width: '80%',
        height: 110,
        borderRadius: 10,
    },
    buttonImage3: {
        width: '80%',
        height: 110,
        borderRadius: 10,
    },
});

export default PantallaPrincipalScreen;

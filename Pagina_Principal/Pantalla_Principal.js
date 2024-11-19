// Pantalla_Principal.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useUser } from '../Login/UserContext';

const PantallaPrincipalScreen = ({ navigation }) => {
    const { nombre } = useUser();
    const nombreMayusculas = nombre.toUpperCase();

    const handleReciclajeButtonPress = () => {
        navigation.navigate('MenuReciclaje');
    };

    const handleBoton2Press = () => {
        navigation.navigate('Servicios');
    };

    const handleBoton3Press = () => {
        navigation.navigate('PuntosReciclaje');
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/p3.jpg')} 
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
                        <Text style={styles.greetingText}>HOLA {nombreMayusculas}</Text>
                        <Text style={styles.welcomeText}>TE DAMOS LA BIENVENIDA A</Text>
                    </View>
                    <Image 
                        source={require('../assets/LOG_AMBIENTE.jpg')}
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.appName}>QUINCHAO RECICLA</Text>
            </View>

            <LinearGradient 
                colors={['#81C784', '#388E3C']}
                style={styles.gradientBackground}
            >
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.buttonYellowBorder]} 
                        onPress={handleReciclajeButtonPress}
                    >
                        <Text style={[styles.infoTitle, { color: '#FFC107' }]}>RECICLAJE</Text>
                        <Text style={styles.infoSubtitle}>
                            Gestiona tus residuos y únete a la campaña de reciclaje.
                        </Text>
                        <Image source={require('../assets/RG.jpg')} style={styles.buttonImage} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.buttonOrangeBorder]} 
                        onPress={handleBoton2Press}
                    >
                        <Text style={[styles.infoTitle, { color: '#FF9800' }]}>SERVICIOS</Text> 
                        <Text style={styles.infoSubtitle}>
                            Solicita retiro de residuos y reporta microbasurales en tu comunidad.
                        </Text>
                        <Image 
                            source={require('../assets/servicio.jpg')} 
                            style={styles.buttonImage}  
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.buttonGreenBorder]} 
                        onPress={handleBoton3Press}
                    >
                        <Text style={[styles.infoTitle, { color: '#4CAF50' }]}>PUNTOS DE RECICLAJE</Text>
                        <Text style={styles.infoSubtitle}>
                            Ubica en el mapa los Puntos Verdes cercanos para reciclar de manera fácil y responsable.
                        </Text>
                        <Image 
                            source={require('../assets/mapa6.png')} 
                            style={styles.buttonImage} 
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View style={styles.menuInferiorContainer}>
                <MenuInferior />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40, 
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
        marginTop: -65,
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
        top: 30,
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
        fontSize: 25,
        color: '#76FF03',
        fontWeight: 'bold',
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 55,
        textTransform: 'uppercase',
        marginTop: -10,
    },
    logo: {
        width: 80,
        height: 80, 
        marginLeft: 10,
    },
    gradientBackground: {
        flex: 1, // Expande el gradiente para llenar todo el espacio disponible
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between', // Espaciado entre botones y el menú inferior
        paddingTop: 10,
    },
    buttonsContainer: {
        width: '80%',
        alignItems: 'center',
        marginTop: 10, // Ajuste fino para subir los botones sin que toquen la imagen
    },
    button: {
        marginVertical: 10, 
        width: '100%',
        padding: 0,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
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
    buttonImage: {
        width: '80%',
        height: 110,
        borderRadius: 10,
    },
    menuInferiorContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});

export default PantallaPrincipalScreen;

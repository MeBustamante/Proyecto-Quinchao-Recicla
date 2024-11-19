import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
            <LinearGradient
                colors={['#81C784', '#388E3C']}
                style={styles.gradientBackground}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Encapsulación de la imagen y el texto de bienvenida */}
                    <View style={styles.headerContainer}>
                        {/* Imagen de fondo */}
                        <Image
                            source={require('../assets/p3.jpg')}
                            style={styles.backgroundImage}
                        />
                        {/* Contenedor del texto y el logo */}
                        <View style={styles.textOverlay}>
                            <Text style={styles.greetingText}>HOLA {nombreMayusculas}</Text>
                            <Text style={styles.welcomeText}>TE DAMOS LA BIENVENIDA A</Text>
                            <Image
                                source={require('../assets/LOG_AMBIENTE.jpg')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonYellowBorder]}
                            onPress={handleReciclajeButtonPress}
                        >
                            <Text style={[styles.infoTitle, { color: '#FFC107' }]}>RECICLAJE</Text>
                            <Text style={styles.infoSubtitle}>
                                Gestiona tus residuos y únete a la campaña de reciclaje.
                            </Text>
                            <Image
                                source={require('../assets/RG.jpg')}
                                style={styles.buttonImage}
                                resizeMode="contain"
                            />
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
                                resizeMode="contain"
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
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>

            {/* Menú inferior */}
            <View style={styles.menuInferiorContainer}>
                <MenuInferior />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 80, // Espacio suficiente para que el último botón sea visible
    },
    headerContainer: {
        width: '100%',
        height: 200,
        borderWidth: 5,
        borderColor: '#4CAF50',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    textOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 10,
    },
    greetingText: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        textAlign: 'center',
        marginBottom: 5,
    },
    welcomeText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
        textAlign: 'center',
        marginBottom: 5,
    },
    logo: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        marginTop: 0,
    },
    buttonsContainer: {
        width: '90%',
    },
    button: {
        marginVertical: 10,
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        alignItems: 'center',
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
        textAlign: 'center',
        marginTop: 5,
    },
    buttonImage: {
        width: '100%',
        height: 110,
    },
    menuInferiorContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
});

export default PantallaPrincipalScreen;

import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { useUser } from '../Login/UserContext';
import { AppContext } from '../ConfigGlobal/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const PantallaPrincipalScreen = ({ navigation }) => {
    const { nombre } = useUser();
    const { language, notifications } = useContext(AppContext); // Acceso al idioma y las notificaciones desde el contexto global
    const [isNotificationVisible, setNotificationVisible] = useState(false); // Controla la visibilidad del modal de notificaciones
    const nombreMayusculas = nombre.toUpperCase();

    // Traducciones dinámicas
    const translations = {
        es: {
            greeting: `HOLA ${nombreMayusculas}`,
            welcome: 'TE DAMOS LA BIENVENIDA A',
            reciclaje: {
                title: 'RECICLAJE',
                subtitle: 'Gestiona tus residuos y únete a la campaña de reciclaje.',
            },
            servicios: {
                title: 'SERVICIOS',
                subtitle: 'Solicita retiro de residuos y reporta microbasurales en tu comunidad.',
            },
            puntos: {
                title: 'PUNTOS DE RECICLAJE',
                subtitle: 'Ubica en el mapa los Puntos Verdes cercanos para reciclar de manera fácil y responsable.',
            },
            notifications: 'Notificaciones',
            noNotifications: 'No tienes notificaciones nuevas.',
            close: 'Cerrar', // Añadido aquí
        },
        en: {
            greeting: `HELLO ${nombreMayusculas}`,
            welcome: 'WELCOME TO',
            reciclaje: {
                title: 'RECYCLING',
                subtitle: 'Manage your waste and join the recycling campaign.',
            },
            servicios: {
                title: 'SERVICES',
                subtitle: 'Request waste collection and report illegal dumping in your community.',
            },
            puntos: {
                title: 'RECYCLING POINTS',
                subtitle: 'Locate nearby Green Points to recycle easily and responsibly.',
            },
            notifications: 'Notifications',
            noNotifications: 'No new notifications.',
            close: 'Close', // Añadido aquí
        },
    };

    const currentLanguage = translations[language]; // Traducciones dinámicas según el idioma

    const handleNotificationPress = () => {
        setNotificationVisible(true); // Abre el modal de notificaciones
    };

    const handleCloseNotification = () => {
        setNotificationVisible(false); // Cierra el modal de notificaciones
    };

    const handleReciclajeButtonPress = () => navigation.navigate('MenuReciclaje');
    const handleBoton2Press = () => navigation.navigate('Servicios');
    const handleBoton3Press = () => navigation.navigate('PuntosReciclaje');

    return (
        <View style={styles.container}>

            {/* Modal de notificaciones */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isNotificationVisible}
                onRequestClose={handleCloseNotification}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{currentLanguage.notifications}</Text>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <View key={index} style={styles.notificationContainer}>
                                        <Text style={styles.notificationText}>
                                            {notification.text}
                                        </Text>
                                        <Text style={styles.notificationDate}>
                                            {notification.date}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.noNotificationsText}>
                                    {currentLanguage.noNotifications}
                                </Text>
                            )}
                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseNotification}>
                            <Text style={styles.closeButtonText}>{currentLanguage.close}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <LinearGradient
                colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']}
                style={styles.gradientBackground}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity
                    style={[styles.fixedCampana, styles.shadowCampana]} // Sombra adicional opcional
                    onPress={handleNotificationPress}
                >
                  <MaterialIcons name="notifications-active" size={40} color="white" />
                </TouchableOpacity>
                    {/* Encabezado */}
                    <View style={styles.headerContainer}>
                        <Image
                            source={require('../assets/p3.jpg')}
                            style={styles.backgroundImage}
                        />
                        <View style={styles.textOverlay}>
                            <Text style={styles.greetingText}>{currentLanguage.greeting}</Text>
                            <Text style={styles.welcomeText}>{currentLanguage.welcome}</Text>
                            <Image
                                source={require('../assets/LOG_AMBIENTE.jpg')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    {/* Botones */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonYellowBorder]}
                            onPress={handleReciclajeButtonPress}
                        >
                            <Text style={[styles.infoTitle, { color: '#FFC107' }]}>
                                {currentLanguage.reciclaje.title}
                            </Text>
                            <Text style={styles.infoSubtitle}>
                                {currentLanguage.reciclaje.subtitle}
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
                            <Text style={[styles.infoTitle, { color: '#FF9800' }]}>
                                {currentLanguage.servicios.title}
                            </Text>
                            <Text style={styles.infoSubtitle}>
                                {currentLanguage.servicios.subtitle}
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
                            <Text style={[styles.infoTitle, { color: '#4CAF50' }]}>
                                {currentLanguage.puntos.title}
                            </Text>
                            <Text style={styles.infoSubtitle}>
                                {currentLanguage.puntos.subtitle}
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
    fixedCampana: {
        position: 'absolute',
        top: 110,
        right: 10,
        zIndex: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContent: {
        paddingVertical: 10,
    },
    notificationContainer: {
        marginBottom: 10,
    },
    notificationText: {
        fontSize: 16,
    },
    notificationDate: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    noNotificationsText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 80,
    },
    headerContainer: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 1,
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
    },
    welcomeText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
        textAlign: 'center',
    },
    logo: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
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
    shadowCampana: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5, // Para Android
    },
    fixedCampana: {
        position: 'absolute',
        top: 30, // Ajusta esta distancia desde el borde superior según tus necesidades
        right: 10, // Ajusta esta distancia desde el borde derecho según tus necesidades
        zIndex: 100, // Asegúrate de que sea mayor a otros elementos en la pantalla
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
        shadowOpacity: 0.3, // Transparencia de la sombra
        shadowRadius: 4, // Difusión de la sombra
        // Sombra en Android
        elevation: 8 // Altura de la sombra para Android
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
        fontWeight: 'bold',
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

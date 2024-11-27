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
            <ScrollView
                contentContainerStyle={styles.modalContent}
                style={{ maxHeight: 400 }} // Ajustamos el alto para que se muestren 3 notificaciones (aprox.)
            >
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Image
                                    source={require('../assets/LOG_AMBIENTE.jpg')} // Icono o logo de la app
                                    style={styles.cardIcon}
                                />
                                <Text style={styles.cardTitle}>Quinchao Recicla</Text>
                                <Text style={styles.cardTime}>{notification.date}</Text>
                            </View>
                            <Text style={styles.cardMessage}>{notification.text}</Text>
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
                {/* Icono de campana con imagen personalizada */}
<TouchableOpacity
    style={[styles.fixedCampana, styles.shadowCampana]} // Mantén los estilos actuales
    onPress={handleNotificationPress} // Abre el modal de notificaciones
>
    <Image
        source={require('../assets/campana.png')} // Ruta de la imagen personalizada
        style={{ width: 40, height: 40 }} // Ajusta el tamaño según tus necesidades
    />
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
        paddingTop: 35, // Deja un espacio de 40 píxeles en la parte superior
        backgroundColor: '#ffffff', 
    },
    gradientBackground: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // Para sombras en Android
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalContent: {
        paddingVertical: 10,
    },
    notificationContainer: {
        flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    },
    card: {
        backgroundColor: '#E6E6FA', // Color de fondo suave
        borderRadius: 15,
        padding: 15,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4, // Para sombras en Android
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 4,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
    },
    cardTime: {
        fontSize: 12,
        color: '#888',
    },
    cardMessage: {
        fontSize: 16,
        color: '#333',
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
    notificationDate: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
    },
    notificationIcon: {
        marginRight: 10,
    },
    noNotificationsText: {
        fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    },
    notificationTextContainer: {
    flex: 1,
},notificationTextContainer: {
    flex: 1,
},
    closeButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
        top: 25, // Ajusta esta distancia desde el borde superior según tus necesidades
        right: 10, // Ajusta esta distancia desde el borde derecho según tus necesidades
        zIndex: 100, // Asegúrate de que sea mayor a otros elementos en la pantalla
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
        shadowOpacity: 0.5, // Transparencia de la sombra
        shadowRadius: 10, // Difusión de la sombra
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

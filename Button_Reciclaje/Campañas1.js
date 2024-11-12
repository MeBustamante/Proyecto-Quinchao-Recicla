import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importamos LinearGradient
import MenuInferior from './MenuInferior'; // Importa el archivo del menú inferior

const Campañas1Screen = ({ navigation }) => {
    const [showButtons, setShowButtons] = useState(false); // Estado para controlar la visibilidad de los botones
    const [showImage1, setShowImage1] = useState(false); // Estado para mostrar la imagen de "Huertos urbanos"
    const [showImage2, setShowImage2] = useState(false); // Estado para mostrar la imagen de "Reforestación urbana"

    const handlePress1 = () => {
        setShowButtons(true); // Muestra los botones "Regresar" e "Ir"
        setShowImage1(true); // Muestra la imagen de "Huertos urbanos"
        setShowImage2(false); // Asegura que la imagen de "Reforestación urbana" no esté visible
    };

    const handlePress2 = () => {
        setShowButtons(true); // Muestra los botones "Regresar" e "Ir"
        setShowImage2(true); // Muestra la imagen de "Reforestación urbana"
        setShowImage1(false); // Asegura que la imagen de "Huertos urbanos" no esté visible
    };

    const handleBackButton = () => {
        setShowButtons(false); // Oculta los botones "Regresar" e "Ir"
        setShowImage1(false); // Oculta la imagen de "Huertos urbanos"
        setShowImage2(false); // Oculta la imagen de "Reforestación urbana"
    };

    const handleGoButton = () => {
        if (showImage1) {
            // Navegar a HuertosUrbanos.js si se seleccionó "Huertos urbanos"
            navigation.navigate('HuertosUrbanos');
        }
        else if (showImage2) {
            // Navegar a ReforestacionUrbana.js si se seleccionó "Reforestación urbana"
            navigation.navigate('ReforestacionUrbana');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
                
                {/* Logo en la esquina superior izquierda */}
                <View style={styles.logoContainerLeft}>
                    <Image 
                        source={require('./assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
                        style={styles.logo} 
                    />
                </View>

                {/* Logo en la esquina superior derecha */}
                <View style={styles.logoContainerRight}>
                    <Image 
                        source={require('./assets/LOG_AMBIENTE.jpg')} 
                        style={styles.logo} 
                    />
                </View>

                <Text style={styles.header}>Campañas</Text>

                {/* Botones de selección cuando no se ha seleccionado ninguna opción */}
                {!showButtons && (
                    <>
                        <TouchableOpacity 
                            style={styles.programBox} 
                            onPress={handlePress1}
                        >
                            <Text style={styles.buttonText}>Huertos urbanos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.programBox, styles.extraSpacing]} 
                            onPress={handlePress2}
                        >
                            <Text style={styles.buttonText}>Reforestación urbana</Text>
                        </TouchableOpacity>
                    </>
                )}

                {/* Mostrar las imágenes solo cuando se haya presionado un botón */}
                {showImage1 && (
                    <View style={styles.imageContainer}>
                        <Image 
                            source={require('./assets/huerto.png')} 
                            style={styles.largeImage}
                        />
                        <Text style={styles.infoText}>¿Quieres aprender sobre huertos urbanos?</Text>
                    </View>
                )}

                {showImage2 && (
                    <View style={styles.imageContainer}>
                        <Image 
                            source={require('./assets/refo.png')} 
                            style={styles.largeImage}
                        />
                        <Text style={styles.infoText}>¿Quieres aprender sobre reforestación urbana?</Text>
                    </View>
                )}

                {/* Botones de Regresar e Ir */}
                {showButtons && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                            <Text style={styles.backButtonText}>Regresar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.goButton} onPress={handleGoButton}>
                            <Text style={styles.goButtonText}>Ir</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </LinearGradient>

            {/* Menú Inferior */}
            <MenuInferior />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    gradientBackground: { flex: 1, width: '100%', alignItems: 'center', paddingVertical: 20 },
    logoContainerLeft: { position: 'absolute', top: 30, left: 10, zIndex: 1 },
    logoContainerRight: { position: 'absolute', top: 30, right: 10, zIndex: 1 },
    logo: { width: 80, height: 80, resizeMode: 'contain' },
    header: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop: 140, marginBottom: 20 },
    programBox: {
        backgroundColor: '#ffffff',
        borderRadius: 25,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginBottom: 15, // Espacio entre los botones
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%', // Hace que los botones tengan el mismo ancho
    },
    extraSpacing: {
        marginBottom: 30, // Espacio extra debajo del último botón
    },
    buttonText: { fontSize: 18, color: '#000', fontWeight: 'bold' },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '80%', 
        marginTop: 20,
    },
    backButton: { 
        backgroundColor: '#FF0000', 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 10,
        borderWidth: 1,       
        borderColor: '#000',  
        flex: 1, marginRight: 10,
    },
    backButtonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        textAlign: 'center' 
    },
    goButton: { 
        backgroundColor: '#4CAF50', 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 10,
        borderWidth: 1,       
        borderColor: '#000',  
        flex: 1,
    },
    goButtonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        textAlign: 'center' 
    },
    imageContainer: { 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 10 
    },
    largeImage: { 
        width: 250, 
        height: 250, 
        resizeMode: 'contain' 
    },
    infoText: {
        fontSize: 16,        
        color: '#fff',       
        marginTop: 10,       
        textAlign: 'center',
        width: '90%',        
    },
});

export default Campañas1Screen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import MenuInferior from '../Menu_Inferior/MenuInferior'; // Importa el menú inferior

const PuntosReciclaje = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [recyclingPoints, setRecyclingPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    useEffect(() => {
        (async () => {
            // Navega a la pantalla de animación mientras carga
            navigation.navigate('Animacion');

            try {
                // Solicitar permisos de ubicación del usuario
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permiso de ubicación denegado');
                    return;
                }

                // Obtener ubicación actual del usuario
                let userLocation = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });

                // Descargar el archivo GeoJSON desde Google Drive
                const geojsonUri = `${FileSystem.documentDirectory}Puntos_Verdes.geojson`;
                await FileSystem.downloadAsync(
                    'https://drive.google.com/uc?export=download&id=1hBLoji4cVxiqbK-JZBSaUXmwRyIZDzgA',
                    geojsonUri
                );

                // Leer archivo GeoJSON
                const geojsonContent = await FileSystem.readAsStringAsync(geojsonUri);
                const geojsonData = JSON.parse(geojsonContent);

                // Filtrado de lista de materiales permitidos
                const materialesPermitidos = ["Botellas Plásticas", "Latas de Aluminio", "Vidrio", "Cartón", "Papel", "Orgánico"];

                // Procesar los puntos
                const points = geojsonData.features.map(feature => {
                    const descripcionCompleta = feature.properties.description || "Sin descripción";

                    // Filtrar la descripción para incluir solo los materiales permitidos
                    const descripcionFiltrada = materialesPermitidos
                        .filter(material => new RegExp(material, 'i').test(descripcionCompleta));

                    return {
                        latitude: feature.geometry.coordinates[1],
                        longitude: feature.geometry.coordinates[0],
                        name: feature.properties.name.replace(/N°?\s*\d+\s*/gi, '').trim() || "Punto Verde",
                        description: descripcionFiltrada.length > 0 ? descripcionFiltrada : ["Materiales no especificados"]
                    };
                });
                setRecyclingPoints(points);
            } catch (error) {
                console.error('Error al cargar los puntos de reciclaje:', error);
            } finally {
                setIsLoading(false); // Finaliza la carga
                navigation.navigate('PuntosReciclaje'); // Regresa a la pantalla cuando termina de cargar
            }
        })();
    }, []);

    const handleMarkerPress = (point) => {
        setSelectedPoint(point);
        setModalVisible(true);
    };

    const handleComoLlegar = () => {
        if (selectedPoint) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.latitude},${selectedPoint.longitude}`;
            Linking.openURL(url);
        }
    };

    if (isLoading || !location) {
        return null; // Evita que se renderice el mapa mientras carga
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={location} showsUserLocation={true}>
                {recyclingPoints.map((point, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        title={point.name}
                        pinColor="green"
                        onPress={() => handleMarkerPress(point)}
                    />
                ))}
            </MapView>

            {/* Modal para mostrar detalles del punto */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                        <Image 
                            source={require('../assets/LOG_AMBIENTE.jpg')} 
                            style={styles.logo}
                        />
                        <Text style={styles.modalTitle}>{selectedPoint?.name}</Text>
                        <Text style={styles.subtitle}>Acá puedes reciclar:</Text>
                        <View style={styles.listContainer}>
                            {(selectedPoint?.description || []).map((item, index) => (
                                <Text key={index} style={styles.listItem}>• {item}</Text>
                            ))}
                        </View>
                        <TouchableOpacity style={styles.directionsButton} onPress={handleComoLlegar}>
                            <Text style={styles.directionsButtonText}>COMO LLEGAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* agregar el menú inferior */}
            <MenuInferior navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        position: 'relative',
    },
    logo: {
        width: 90,
        height: 90,
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#000000',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        textAlign: 'center',
        marginBottom: 10,
    },
    listContainer: {
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    listItem: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 5,
    },
    directionsButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        alignItems: 'center',
    },
    directionsButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PuntosReciclaje;

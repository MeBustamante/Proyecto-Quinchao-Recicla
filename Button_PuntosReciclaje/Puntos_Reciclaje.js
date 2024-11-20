import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const PuntosReciclaje = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [recyclingPoints, setRecyclingPoints] = useState([]);
    const [filteredPoints, setFilteredPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState(["Todos"]);

    const materialesPermitidos = ["Todos", "Botellas Plásticas", "Latas de Aluminio", "Vidrio", "Cartón", "Papel", "Orgánico"];

    useEffect(() => {
        (async () => {
            navigation.navigate('Animacion');
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permiso de ubicación denegado');
                    return;
                }

                let userLocation = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });

                const geojsonUri = `${FileSystem.documentDirectory}Puntos_Verdes.geojson`;
                await FileSystem.downloadAsync(
                    'https://drive.google.com/uc?export=download&id=1hBLoji4cVxiqbK-JZBSaUXmwRyIZDzgA',
                    geojsonUri
                );

                const geojsonContent = await FileSystem.readAsStringAsync(geojsonUri);
                const geojsonData = JSON.parse(geojsonContent);

                const points = geojsonData.features.map(feature => {
                    const descripcionCompleta = feature.properties.description || "Sin descripción";
                    const descripcionFiltrada = materialesPermitidos.slice(1)
                        .filter(material => new RegExp(material, 'i').test(descripcionCompleta));

                    return {
                        latitude: feature.geometry.coordinates[1],
                        longitude: feature.geometry.coordinates[0],
                        name: feature.properties.name.replace(/N°?\s*\d+\s*/gi, '').trim() || "Punto Verde",
                        description: descripcionFiltrada.length > 0 ? descripcionFiltrada : ["Materiales no especificados"]
                    };
                });
                setRecyclingPoints(points);
                setFilteredPoints(points);
            } catch (error) {
                console.error('Error al cargar los puntos de reciclaje:', error);
            } finally {
                setIsLoading(false);
                navigation.navigate('PuntosReciclaje');
            }
        })();
    }, []);

    const toggleFilter = (filter) => {
        setActiveFilters((prevFilters) => {
            const essentialFilters = ["Botellas Plásticas", "Latas de Aluminio", "Vidrio", "Cartón", "Papel"];
            if (filter === "Todos") {
                return prevFilters.includes("Todos") ? [] : ["Todos"];
            } else {
                let newFilters = prevFilters.includes(filter)
                    ? prevFilters.filter((f) => f !== filter) // Desmarcar si ya está seleccionado
                    : [...prevFilters.filter((f) => f !== "Todos"), filter]; // Agregar y desmarcar "Todos"

                if (newFilters.includes("Orgánico") && essentialFilters.every((f) => newFilters.includes(f))) {
                    newFilters = ["Todos"];
                }

                if (filter === "Orgánico" && newFilters.length > 1 && !newFilters.includes("Todos")) {
                    newFilters = ["Orgánico"];
                }

                return newFilters.length === 0 ? ["Todos"] : newFilters;
            }
        });
    };

    useEffect(() => {
        if (activeFilters.includes("Todos")) {
            setFilteredPoints(recyclingPoints);
        } else {
            setFilteredPoints(
                recyclingPoints.filter((point) =>
                    point.description.some((material) => activeFilters.includes(material))
                )
            );
        }
    }, [activeFilters, recyclingPoints]);

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
        return null;
    }

    return (
        <View style={styles.container}>
            {/* Botón desplegable */}
            <View style={[styles.dropdownContainer, dropdownVisible ? { zIndex: 10 } : { zIndex: 1 }]}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Text style={styles.dropdownButtonText}>
                        {activeFilters.includes("Todos")
                            ? "Se muestran todos los Puntos Verdes"
                            : `Filtros (${activeFilters.length}): ${activeFilters.join(", ")}`}
                    </Text>
                </TouchableOpacity>
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={materialesPermitidos}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.dropdownItem,
                                        activeFilters.includes(item) && styles.activeDropdownItem,
                                    ]}
                                    onPress={() => toggleFilter(item)}
                                >
                                    <Text
                                        style={[
                                            styles.dropdownItemText,
                                            activeFilters.includes(item) && styles.activeDropdownItemText,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>

            {/* Mapa */}
            <MapView style={styles.map} initialRegion={location} showsUserLocation={true}>
                {filteredPoints.map((point, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        title={point.name}
                        pinColor="green"
                        onPress={() => handleMarkerPress(point)}
                    />
                ))}
            </MapView>

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
    dropdownContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: '80%', // Reduce el ancho para que no bloquee la interacción
    },
    dropdownButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
    },
    dropdownButtonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    dropdown: {
        backgroundColor: '#FFF',
        marginTop: 5,
        borderRadius: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        maxWidth: 200,
    },
    dropdownItem: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    activeDropdownItem: {
        backgroundColor: '#E0F7FA',
        borderRadius: 5,
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#333',
    },
    activeDropdownItemText: {
        color: '#00796B',
        fontWeight: 'bold',
    },
});

export default PuntosReciclaje;

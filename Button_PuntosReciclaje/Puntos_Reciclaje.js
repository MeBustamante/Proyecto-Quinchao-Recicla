import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Linking } from 'react-native';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global
import { getDocs, collection } from "firebase/firestore";
import { db } from '../ConfigGlobal/config';  // Importa tu configuración de Firebase
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';  // Importa expo-location
import MenuInferior from '../Menu_Inferior/MenuInferior';  // Importación correcta de MenuInferior

// Función para obtener el archivo .geojson desde Firestore
async function obtenerArchivoGeoJSON() {
  try {
    const querySnapshot = await getDocs(collection(db, "archivos_geojson"));
    const docData = querySnapshot.docs[0].data();  // Obtén el primer documento
    const geojsonContent = docData.geojsonContent;  // Contenido del archivo .geojson

    // Convertir el contenido en un objeto JSON
    const geojsonData = JSON.parse(geojsonContent);
    return geojsonData;  // Devuelve los datos del archivo
  } catch (error) {
    console.error("Error al obtener el archivo .geojson desde Firestore:", error);
  }
}

const PuntosReciclaje = ({ navigation }) => {
    const { language } = useContext(AppContext); // Obtén el idioma seleccionado del contexto
    const [location, setLocation] = useState(null);
    const [recyclingPoints, setRecyclingPoints] = useState([]);
    const [filteredPoints, setFilteredPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState(["Todos"]);

    // Traducciones de materiales y textos
    const translations = {
        es: {
            allPoints: "Filtros",
            filters: "Filtros",
            modalTitle: "Acá puedes reciclar:",
            directionsButton: "COMO LLEGAR",
            noMaterials: "Materiales no especificados",
            materialsAllowed: ["Todos", "Botellas Plásticas", "Latas de Aluminio", "Vidrio", "Cartón", "Papel", "Orgánico"],
        },
        en: {
            allPoints: "Filters",
            filters: "Filters",
            modalTitle: "You can recycle here:",
            directionsButton: "GET DIRECTIONS",
            noMaterials: "No specified materials",
            materialsAllowed: ["All", "Plastic Bottles", "Aluminum Cans", "Glass", "Cardboard", "Paper", "Organic"],
        },
    };

    const t = translations[language];

    useEffect(() => {
        (async () => {
            navigation.navigate('Animacion');
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    alert(language === 'es' ? 'Permiso de ubicación denegado' : 'Location permission denied');
                    return;
                }

                let userLocation = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });

                // Obtener el archivo .geojson desde Firestore
                const geojsonData = await obtenerArchivoGeoJSON();
                console.log("Datos cargados desde Firestore:", geojsonData); // Verifica los datos

                const points = geojsonData.features.map(feature => {
                    const descripcionCompleta = feature.properties.description || (language === 'es' ? "Sin descripción" : "No description");
                    const materialesTraducidos = {
                        "Botellas Plásticas": t.materialsAllowed[1],
                        "Latas de Aluminio": t.materialsAllowed[2],
                        "Vidrio": t.materialsAllowed[3],
                        "Cartón": t.materialsAllowed[4],
                        "Papel": t.materialsAllowed[5],
                        "Orgánico": t.materialsAllowed[6],
                    };

                    const descripcionFiltrada = Object.keys(materialesTraducidos)
                        .filter(material => new RegExp(material, 'i').test(descripcionCompleta))
                        .map(material => materialesTraducidos[material]);

                    return {
                        latitude: feature.geometry.coordinates[1],
                        longitude: feature.geometry.coordinates[0],
                        name: feature.properties.name.replace(/N°?\s*\d+\s*/gi, '').trim() || (language === 'es' ? "Punto Verde" : "Green Point"),
                        description: descripcionFiltrada.length > 0 ? descripcionFiltrada : [t.noMaterials],
                    };
                });

                console.log("Puntos de reciclaje obtenidos:", points); // Verifica los puntos

                setRecyclingPoints(points);
                setFilteredPoints(points);
            } catch (error) {
                console.error('Error al cargar los puntos de reciclaje:', error);
            } finally {
                setIsLoading(false);
                navigation.navigate('PuntosReciclaje');
            }
        })();
    }, [language]);

    // Toggle para los filtros
    const toggleFilter = (filter) => {
        setActiveFilters((prevFilters) => {
            if (filter === t.materialsAllowed[0]) {
                return prevFilters.includes(t.materialsAllowed[0]) ? [] : [t.materialsAllowed[0]];
            } else {
                let newFilters = prevFilters.includes(filter)
                    ? prevFilters.filter((f) => f !== filter)
                    : [...prevFilters.filter((f) => f !== t.materialsAllowed[0]), filter];
                return newFilters.length === 0 ? [t.materialsAllowed[0]] : newFilters;
            }
        });
    };

    useEffect(() => {
        if (activeFilters.includes(t.materialsAllowed[0])) {
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
            {/* Botón desplegable para filtros */}
            <View style={[styles.dropdownContainer, dropdownVisible ? { zIndex: 10 } : { zIndex: 1 }]}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Text style={styles.dropdownButtonText}>
                        {activeFilters.includes(t.materialsAllowed[0])
                            ? t.allPoints
                            : `${t.filters} (${activeFilters.length}): ${activeFilters.join(", ")}`}
                    </Text>
                </TouchableOpacity>
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={t.materialsAllowed}
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
                        <Text style={styles.modalTitle}>{selectedPoint?.name}</Text>
                        <Text style={styles.subtitle}>{t.modalTitle}</Text>
                        <View style={styles.listContainer}>
                            {(selectedPoint?.description || []).map((item, index) => (
                                <Text key={index} style={styles.listItem}>• {item}</Text>
                            ))}
                        </View>
                        <TouchableOpacity style={styles.directionsButton} onPress={handleComoLlegar}>
                            <Text style={styles.directionsButtonText}>{t.directionsButton}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Menú inferior */}
            <MenuInferior />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    dropdownContainer: { position: 'absolute', top: 10, left: 10, width: '80%' },
    dropdownButton: { backgroundColor: '#4CAF50', padding: 8, borderRadius: 10, alignItems: 'center' },
    dropdownButtonText: { color: 'white', fontSize: 14, textAlign: 'center' },
    dropdown: { backgroundColor: '#FFF', marginTop: 5, borderRadius: 10, padding: 5 },
    dropdownItem: { paddingVertical: 8, paddingHorizontal: 10 },
    activeDropdownItem: { backgroundColor: '#E0F7FA', borderRadius: 5 },
    dropdownItemText: { fontSize: 14, color: '#333' },
    activeDropdownItemText: { color: '#00796B', fontWeight: 'bold' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' },
    closeButton: { position: 'absolute', top: 10, right: 10, backgroundColor: '#000', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
    closeButtonText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center', marginBottom: 10 },
    listContainer: { alignSelf: 'flex-start', marginLeft: 20 },
    listItem: { fontSize: 16, textAlign: 'left', marginBottom: 5 },
    directionsButton: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#4CAF50', borderRadius: 20, alignItems: 'center' },
    directionsButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default PuntosReciclaje;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const PuntosReciclajeScreen = () => {
    const [location, setLocation] = useState(null);
    const [puntosVerdes, setPuntosVerdes] = useState([]);

    useEffect(() => {
        (async () => {
            // Solicitar permisos de ubicación
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'No se puede acceder a tu ubicación.');
                return;
            }

            // Obtener ubicación actual
            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });

            // Cargar el archivo GeoJSON desde el directorio de activos
            const asset = Asset.fromModule(require('../assets/Puntos_Verdes1.geojson'));
            await asset.downloadAsync();

            // Verificar si el archivo ha sido descargado
            if (asset.localUri) {
                try {
                    // Leer el contenido del archivo GeoJSON
                    const geojsonContent = await FileSystem.readAsStringAsync(asset.localUri);
                    const geojsonData = JSON.parse(geojsonContent);

                    // Verificar que el formato GeoJSON es válido
                    if (geojsonData && geojsonData.features) {
                        const puntos = geojsonData.features.map((feature) => ({
                            latitude: feature.geometry.coordinates[1],
                            longitude: feature.geometry.coordinates[0],
                            nombre: feature.properties.name || 'Punto de reciclaje',
                        }));
                        setPuntosVerdes(puntos);
                    } else {
                        Alert.alert('Error en el formato GeoJSON', 'El archivo no contiene datos válidos.');
                    }
                } catch (error) {
                    Alert.alert('Error al leer el archivo', 'Hubo un problema al leer el archivo GeoJSON.');
                    console.error('Error al leer el archivo geojson:', error);
                }
            } else {
                Alert.alert('Error', 'No se pudo cargar el archivo GeoJSON.');
            }
        })();
    }, []);

    const handleDirectionsPress = (latitude, longitude) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'No se pudo abrir Google Maps.');
        });
    };

    return (
        <View style={styles.container}>
            {location && (
                <MapView style={styles.map} initialRegion={location} showsUserLocation={true}>
                    {puntosVerdes.map((punto, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: punto.latitude,
                                longitude: punto.longitude,
                            }}
                            title={punto.nombre}
                            pinColor="green"
                        >
                            <Callout onPress={() => handleDirectionsPress(punto.latitude, punto.longitude)}>
                                <View style={styles.callout}>
                                    <Text style={styles.calloutTitle}>{punto.nombre}</Text>
                                    <Text style={styles.calloutButton}>Cómo llegar</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            )}
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
    callout: {
        width: 150,
        padding: 5,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    calloutButton: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default PuntosReciclajeScreen;

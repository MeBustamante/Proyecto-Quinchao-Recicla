import * as FileSystem from 'expo-file-system';

export async function leerArchivoGeoJSON() {
  try {
    // Ruta del archivo .geojson en el almacenamiento local de la app
    const geojsonUri = `${FileSystem.documentDirectory}Puntos_Verdes.geojson`;
    
    // Leer el archivo .geojson como texto
    const geojsonContent = await FileSystem.readAsStringAsync(geojsonUri);

    console.log("Contenido del archivo .geojson:", geojsonContent);

    // Retornar el contenido para usarlo más tarde (puedes almacenarlo o procesarlo)
    return geojsonContent;
  } catch (e) {
    console.error("Error al leer el archivo .geojson:", e);
  }
}

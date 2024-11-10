// Gestión Residuos
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function App() {
  // Función que se ejecuta al presionar un día del calendario
  const handleDayPress = (day) => {
    // Verificamos si el día presionado es el 22 de noviembre de 2024
    if (day.dateString === '2024-11-22') {
      // Mostramos una alerta si se presiona el día marcado
      Alert.alert('Recolección de residuos', 'Hoy es el día de recolección de residuos en tu área.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Título de la aplicación */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Gestión Residuos</Text>
      </View>
      
      {/* Contenedor con el texto grande */}
      <View style={styles.secondContainer}>
        <Text style={styles.referenceText}>
          Mantén tu zona limpia y organizada con nuestro calendario de recolección. Aquí podrás ver las fechas programadas para la recolección de diferentes tipos de residuos en tu área.
        </Text>
      </View>
      
      {/* Calendario con la fecha de recolección destacada */}
      <View style={styles.thirdContainer}>
        <Calendar
          // Establece una fecha marcada para la recolección
          markedDates={{
            '2024-11-25': {
              selected: true,
              selectedColor: 'red', // Color para la fecha seleccionada (indicando recolección)
              selectedTextColor: 'white', // Color del texto en la fecha seleccionada
              customStyles: {
                container: {
                  backgroundColor: 'lightblue',
                },
              },
            },
          }}
          // Propiedades del calendario
          monthFormat={'yyyy MM'}
          theme={{
            selectedDayBackgroundColor: 'red', // Fondo rojo para la fecha seleccionada
            todayTextColor: 'black', // Color del texto del día de hoy
            arrowColor: 'black', // Color de las flechas de navegación
            dayTextColor: '#000', // Color de los días
          }}
          // Llamamos a la función cuando un día es presionado
          onDayPress={handleDayPress}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleContainer: {
    marginBottom: 20, // Espaciado debajo del título
    padding: 10,
    width: '100%',
    alignItems: 'center', // Centrar el título
  },
  titleText: {
    fontSize: 32, // Aumento del tamaño de la fuente para el título
    fontWeight: 'bold', // Hacer el texto en negrita
    color: '#4CAF50', // Color verde para el título
  },
  secondContainer: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    width: '90%',
  },
  referenceText: {
    fontSize: 17, // Tamaño de fuente más grande
    fontWeight: 'bold', // Texto en negrita
    color: '#333',
    textAlign: 'center',
  },
  thirdContainer: {
    width: '90%',
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    height: 350, // Establecer altura para hacer el calendario cuadrado
  },
});

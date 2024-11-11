// Gestión Residuos
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MenuInferior from './MenuInferior'; // Importa el componente MenuInferior

export default function App() {
  // Función que se ejecuta al presionar un día del calendario
  const handleDayPress = (day) => {
    // Verificamos si el día presionado es el 22 de noviembre de 2024
    if (day.dateString === '2024-11-22') {
      // Mostramos una alerta si se presiona el día marcado
      Alert.alert('Recolección de residuos', 'Hoy es el día de recolección de residuos en tu área.');
    }
  };

  // Función para generar los viernes del mes
  const generateFridays = (year, month) => {
    const fridays = {};
    // Vamos a crear la fecha de inicio del mes (1ro de mes)
    const startDate = new Date(year, month - 1, 1);
    // Obtenemos el día de la semana del primer día del mes
    const firstDay = startDate.getDay();

    // Ajustamos el primer viernes (si el primer día del mes no es viernes)
    let firstFriday = 1 + (5 - firstDay + 7) % 7; // 5 es el valor para viernes
    for (let i = firstFriday; i <= 31; i += 7) {
      const dayString = `${year}-${month < 10 ? '0' + month : month}-${i < 10 ? '0' + i : i}`;
      fridays[dayString] = {
        selected: true,
        selectedColor: 'red',
        selectedTextColor: 'white',
        customStyles: {
          container: {
            backgroundColor: 'lightblue',
          },
        },
      };
    }
    return fridays;
  };

  const month = 11; // Noviembre
  const year = 2024; // Año
  const fridays = generateFridays(year, month); // Obtener todos los viernes

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
      
      {/* Calendario con todos los viernes resaltados en rojo */}
      <View style={styles.thirdContainer}>
        <Calendar
          // Agregamos los viernes al calendario
          markedDates={fridays}
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

      {/* Menú inferior */}
      <MenuInferior />  {/* Aquí es donde agregamos el menú inferior */}

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
    fontSize: 13, // Tamaño de fuente más grande
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

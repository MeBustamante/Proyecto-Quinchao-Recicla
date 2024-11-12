// Gestión Residuos
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MenuInferior from './MenuInferior'; // Importa el menú inferior

const Gestion = () => {

  // Función que maneja cuando se selecciona un día
  const handleDayPress = (day) => {
    if (day.dateString === '2024-11-22') {
      Alert.alert('Recolección de residuos', 'Hoy es el día de recolección de residuos en tu área.');
    }
  };

  // Función para generar las fechas de los viernes de un mes
  const generateFridays = (year, month) => {
    const fridays = {};
    const startDate = new Date(year, month - 1, 1);
    const firstDay = startDate.getDay();

    let firstFriday = 1 + (5 - firstDay + 7) % 7;  // Encuentra el primer viernes del mes
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

  // Mes y año para el calendario
  const month = 11; 
  const year = 2024; 
  const fridays = generateFridays(year, month); 

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Gestión de Residuos</Text>
      </View>
      
      <View style={styles.secondContainer}>
        <Text style={styles.referenceText}>
          Mantén tu zona limpia y organizada con nuestro calendario de recolección. Aquí podrás ver las fechas programadas para la recolección de diferentes tipos de residuos en tu área.
        </Text>
      </View>
      
      <View style={styles.thirdContainer}>
        <Calendar
          markedDates={fridays}
          monthFormat={'yyyy MM'}
          theme={{
            selectedDayBackgroundColor: 'red', 
            todayTextColor: 'black', 
            arrowColor: 'black', 
            dayTextColor: '#000', 
          }}
          onDayPress={handleDayPress}
        />
      </View>

      {/* Menú Inferior */}
      <MenuInferior />  

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleContainer: {
    marginBottom: 20, 
    padding: 10,
    width: '100%',
    alignItems: 'center', 
  },
  titleText: {
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#4CAF50', 
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
    fontSize: 13, 
    fontWeight: 'bold', 
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
    height: 350, 
  },
});

export default Gestion;

// Gestión Residuos
import React from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const Gestion = () => {

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    
    if (fridays[dateString]) {
      const { selectedColor, selectedTextColor, hours, address } = fridays[dateString];
      if (selectedColor === 'red') {
        Alert.alert(
          'Recolección de residuos',
          `Hoy es el día que pasamos a recolectar los residuos en tu área.\n\nHora: ${hours}\nDirección: ${address}`,
        );
      }
    }
  };

  const generateFridays = (year) => {
    const fridays = {};
    
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1);
      const firstDay = startDate.getDay();

      // Calcula el primer viernes del mes
      let firstFriday = 1 + (5 - firstDay + 7) % 7;
      
      for (let i = firstFriday; i <= 31; i += 7) {
        const dayString = `${year}-${(month + 1) < 10 ? '0' + (month + 1) : (month + 1)}-${i < 10 ? '0' + i : i}`;
        

        fridays[dayString] = {
          selected: true,
          selectedColor: 'red',
          selectedTextColor: 'white',
          customStyles: {
            container: {
              backgroundColor: 'lightblue',
            },
          },
          hours: '10:00 AM - 12:00 PM', // Hora de recolección
          address: 'Calle Ejemplo 123', // Dirección de recolección
        };
      }
    }
    
    return fridays;
  };

  const year = 2024;  // Año para generar los viernes
  const fridays = generateFridays(year);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>

        {/* Banner */}
        <Image source={require('../assets/gestion.png')} style={styles.banner} />

        <View style={styles.secondContainer}>
          <Text style={styles.referenceText}>
            Mantén tu zona limpia y organizada con nuestro calendario de recolección. Aquí podrás ver las fechas programadas para la recolección de diferentes tipos de residuos en tu área.
          </Text>
        </View>

        <View style={styles.thirdContainer}>
          <Calendar
            markedDates={fridays}
            monthFormat={'MMMM yyyy'} 
            theme={{
              selectedDayBackgroundColor: 'red', 
              todayTextColor: 'black', 
              arrowColor: 'black', 
              dayTextColor: '#000', 
            }}
            onDayPress={handleDayPress}
            locale={'es'} 
          />
        </View>
      </LinearGradient>

      {/* Menú Inferior */}
      <MenuInferior />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,  
    padding: 0,  
    backgroundColor: 'transparent', 
  },
  gradientBackground: {
    flex: 1, 
    width: '100%',
    justifyContent: 'flex-start', 
    alignItems: 'center',  
    paddingTop: 10,  
  },
  banner: {
    width: '95%',
    height: 95,
    resizeMode: 'cover',
  },
  secondContainer: {
    marginBottom: 10,  
    paddingHorizontal: 20, 
    width: '100%',  
    alignItems: 'center',  
  },
  referenceText: {
    fontSize: 16, 
    fontWeight: '600', 
    color: '#000000',  
    textAlign: 'justify',  
  },
  thirdContainer: {
    width: '90%',
    padding: 15,  
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 350, 
    alignItems: 'center',  
  },
});

export default Gestion;
// Gestión Residuos
import React from 'react';
import { StyleSheet, Text, View, Alert, Image, ScrollView } from 'react-native';
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
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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

          {/* Cuadro de Recorrido */}
          <View style={styles.recourseContainer}>
            <Text style={styles.recourseTitle}>Recorrido de Recolección</Text>
            <Text style={styles.recourseText}>
              Aquí tienes el recorrido de recolección para las diferentes zonas:
            </Text>
            <View style={styles.recourseItem}>
              <Text style={styles.recourseAddress}>Calle Ejemplo 123</Text>
              <Text style={styles.recourseHours}>Hora: 10:00 AM</Text>
            </View>
            <View style={styles.recourseItem}>
              <Text style={styles.recourseAddress}>Calle Ficticia 456</Text>
              <Text style={styles.recourseHours}>Hora: 11:30 AM</Text>
            </View>
            <View style={styles.recourseItem}>
              <Text style={styles.recourseAddress}>Avenida Principal 789</Text>
              <Text style={styles.recourseHours}>Hora: 1:00 PM</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Menú Inferior */}
      <View style={styles.menuContainer}>
        <MenuInferior />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center', // Centra todo el contenido en el eje vertical
    alignItems: 'center', // Centra todo el contenido en el eje horizontal
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Asegúrate de que haya espacio para el menú inferior
    justifyContent: 'center', // Centra el contenido del ScrollView
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20, // Agregado padding bottom para asegurar que el fondo cubra hasta el fondo de la pantalla
  },
  banner: {
    width: '95%',
    height: 95,
    resizeMode: 'cover',
    marginBottom: 20, // Separación entre el banner y el siguiente contenido
  },
  secondContainer: {
    marginBottom: 20, // Separación entre los textos
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
    marginBottom: 20, // Separación entre el calendario y el siguiente contenido
  },
  recourseContainer: {
    marginTop: 20,
    padding: 15,
    width: '90%',
    backgroundColor: '#ffcc80',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    marginBottom: 30, // Separación entre el cuadro de recorrido y el menú inferior
  },
  recourseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  recourseText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  recourseItem: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  recourseAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  recourseHours: {
    fontSize: 14,
    color: '#000',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10, // Asegura que el menú esté encima del contenido
  },
});

export default Gestion;

// Gestión Residuos
import React from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
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
      <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>
        {/* Logo en la esquina superior izquierda */}
        <View style={styles.logoContainerLeft}>
          <Image 
            source={require('./assets/LOGO ORIGINAL TRANSPARENCIA.png')} 
            style={styles.logo} 
          />
        </View>

        {/* Logo en la esquina superior derecha */}
        <View style={styles.logoContainerRight}>
          <Image 
            source={require('./assets/LOG_AMBIENTE.jpg')} 
            style={styles.logo} 
          />
        </View>

        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Gestión</Text>
          <Text style={styles.titleText}>de</Text>
          <Text style={styles.titleText}>Residuos</Text>
        </View>

        {/* Contenedor del texto sin fondo gris y con mayor espacio horizontal */}
        <View style={styles.secondContainer}>
          <Text style={styles.referenceText}>
            Mantén tu zona limpia y organizada con nuestro calendario de recolección. Aquí podrás ver las fechas programadas para la recolección de diferentes tipos de residuos en tu área.
          </Text>
        </View>

        {/* Contenedor del calendario con menos espacio */}
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
      </LinearGradient>

      {/* Menú Inferior */}
      <MenuInferior />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,  // Aseguramos que no haya márgenes en el contenedor principal
    padding: 0,  // Aseguramos que no haya relleno en el contenedor principal
    backgroundColor: 'transparent', // Eliminamos el fondo blanco
  },
  gradientBackground: {
    flex: 1, // Asegura que LinearGradient ocupe toda la pantalla
    width: '100%',
    justifyContent: 'center', // Centra los elementos dentro del LinearGradient
    alignItems: 'center',  // Centra los elementos horizontalmente dentro del LinearGradient
    paddingTop: 10,  // Añade un pequeño padding en la parte superior, si es necesario
  },
  logoContainerLeft: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1, // Asegura que el logo esté por encima de otros elementos
  },
  logoContainerRight: {
    position: 'absolute',
    top: 30,
    right: 10,
    zIndex: 1, // Asegura que el logo esté por encima de otros elementos
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain', // Asegura que la imagen se ajuste sin distorsionar
  },
  titleContainer: {
    marginBottom: 10,  // Reducido para acercar el título hacia arriba
    padding: 10,
    alignItems: 'center',  // Centra el texto en el contenedor
  },
  titleText: {
    fontSize: 28, // Título reducido
    fontWeight: 'bold', 
    color: '#FFFFFF',  // Cambié el color del texto a blanco
  },
  secondContainer: {
    marginBottom: 10,  // Reducido para disminuir el espacio entre el texto y el calendario
    paddingHorizontal: 20, // Aumenta el relleno horizontal para dar más espacio al texto
    width: '100%',  // Asegura que el texto ocupe todo el ancho disponible
    alignItems: 'center',  // Centra el texto dentro de este contenedor
  },
  referenceText: {
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#fff',  // Cambié el color del texto a blanco
    textAlign: 'center',  // Centra el texto dentro del contenedor
  },
  thirdContainer: {
    width: '90%',
    padding: 10,  // Reducido para acercar más el calendario al texto
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    height: 350, 
    alignItems: 'center',  // Centra los elementos dentro de este contenedor
  },
});

export default Gestion;

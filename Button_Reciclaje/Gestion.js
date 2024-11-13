// Gestión Residuos
import React from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior'; 

const Gestion = () => {

  const handleDayPress = (day) => {
    if (fridays[day.dateString] && fridays[day.dateString].selectedColor === 'red') {
      Alert.alert('Recolección de residuos', 'Hoy es el día que pasamos a recolectar los residuos en tu área.');
    }
  };

  const generateFridays = (year, month) => {
    const fridays = {};
    const startDate = new Date(year, month - 1, 1);
    const firstDay = startDate.getDay();

    let firstFriday = 1 + (5 - firstDay + 7) % 7;  
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


  const month = 11; 
  const year = 2024; 
  const fridays = generateFridays(year, month); 

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#81C784', '#388E3C']} style={styles.gradientBackground}>

        <View style={styles.logoContainerLeft}>
          <Image 
            source={require('../assets/LOGO NEUTRO (1).png')} 
            style={styles.logo} 
          />
        </View>


        <View style={styles.logoContainerRight}>
          <Image 
            source={require('../assets/LOG_AMBIENTE.jpg')} 
            style={styles.logo} 
          />
        </View>


        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Gestión</Text>
          <Text style={styles.titleText}>de</Text>
          <Text style={styles.titleText}>Residuos</Text>
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
  logoContainerLeft: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1, 
  },
  logoContainerRight: {
    position: 'absolute',
    top: 30,
    right: 10,
    zIndex: 1, 
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain', 
  },
  titleContainer: {
    marginBottom: 15,  
    padding: 10,
    alignItems: 'center',  
  },
  titleText: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color: '#000000',  
  },
  secondContainer: {
    marginBottom: 10,  
    paddingHorizontal: 20, 
    width: '100%',  
    alignItems: 'center',  
  },
  referenceText: {
    fontSize: 15, 
    fontWeight: 'normal', 
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

// Gestión Residuos
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Alert, Image, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext';

const Gestion = () => {
  const { language } = useContext(AppContext); // Obtenemos el idioma actual

  const handleDayPress = (day) => {
    const dateString = day.dateString;

    if (fridays[dateString]) {
      const { selectedColor, selectedTextColor, hours, address } = fridays[dateString];
      if (selectedColor === 'red') {
        Alert.alert(
          texts[language].alertTitle,
          `${texts[language].alertMessage}\n\nHora: ${hours}\nDirección: ${address}`,
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
          hours: '10:00 AM - 2:00 PM', // Hora de recolección
          address: 'Isla de Achao', // Dirección de recolección
        };
      }
    }

    return fridays;
  };

  const year = 2024;  // Año para generar los viernes
  const fridays = generateFridays(year);

  // Textos en español e inglés
  const texts = {
    es: {
      alertTitle: 'Recolección de residuos',
      alertMessage: 'Hoy es el día que pasamos a recolectar los residuos en tu área.',
      referenceText: 'Mantén tu zona limpia y organizada con nuestro calendario de recolección. Aquí podrás ver las fechas programadas:',
      recourseTitle: 'Recorrido de Recolección',
      recourseText: 'Aquí tienes el recorrido de recolección para las diferentes zonas:',
      recourseAddress1: 'Calle Mirador Alto 123',
      recourseAddress2: 'Calle Serrano 456',
      recourseAddress3: 'Calle Padre German Ampuero 789',
      recourseHours1: 'Hora: 10:00 AM a 10:00 AM',
      recourseHours2: 'Hora: 11:30 AM a 12:00 PM',
      recourseHours3: 'Hora: 1:00 PM a 2:00 PM',
    },
    en: {
      alertTitle: 'Waste Collection',
      alertMessage: 'Today is the day we come to collect waste in your area.',
      referenceText: 'Keep your area clean and organized with our waste collection calendar. Here you can see the scheduled dates:',
      recourseTitle: 'Collection Route',
      recourseText: 'Here is the collection route for the different zones:',
      recourseAddress1: 'Mirador Alto Street 123',
      recourseAddress2: 'Serrano Street 456',
      recourseAddress3: 'Padre German Ampuero Street 789',
      recourseHours1: 'Time: 10:00 AM to 10:00 AM',
      recourseHours2: 'Time: 11:30 AM to 12:00 PM',
      recourseHours3: 'Time: 1:00 PM to 2:00 PM',
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Banner */}
          <Image source={require('../assets/gestion.png')} style={styles.banner} />

          <View style={styles.secondContainer}>
            <Text style={styles.referenceText}>
              {texts[language].referenceText}
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
              locale={language === 'es' ? 'es' : 'en'} // Cambia el idioma del calendario
            />
          </View>

          {/* Cuadro de Recorrido */}
          <View style={styles.recourseContainer}>
            <Text style={styles.recourseTitle}>{texts[language].recourseTitle}</Text>
            <Text style={styles.recourseText}>
              {texts[language].recourseText}
            </Text>
            <View style={styles.recourseItem}>
              <Text style={styles.recourseAddress}>{texts[language].recourseAddress1}</Text>
              <Text style={styles.recourseHours}>{texts[language].recourseHours1}</Text>
            </View>
            <View style={styles.recourseItem}>
              <Text style={styles.recourseAddress}>{texts[language].recourseAddress2}</Text>
              <Text style={styles.recourseHours}>{texts[language].recourseHours2}</Text>
            </View>
            <View style={styles.recourseItem}>
              <Text style={styles.recourseAddress}>{texts[language].recourseAddress3}</Text>
              <Text style={styles.recourseHours}>{texts[language].recourseHours3}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  banner: {
    width: '100%',
    height: 95,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  secondContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  referenceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'justify',
  },
  thirdContainer: {
    width: '90%',
    padding: 15,
    borderWidth: 2.5,
    borderColor: '#4CAF50',
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 350,
    alignItems: 'center',
    marginBottom: 10,
  },
  recourseContainer: {
    marginTop: 5,
    padding: 15,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#4CAF50',
    alignItems: 'center',
    marginBottom: 10,
  },
  recourseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  recourseText: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  recourseItem: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  recourseAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  recourseHours: {
    fontSize: 14,
    color: 'white',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
});

export default Gestion;

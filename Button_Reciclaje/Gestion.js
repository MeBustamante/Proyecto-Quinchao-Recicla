import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext';

const { height: screenHeight } = Dimensions.get('window'); // Dimensiones para calcular alturas dinámicas

const Gestion = () => {
  const { language, setCollectionSchedule } = useContext(AppContext); // Contexto global
  const [modalVisible, setModalVisible] = useState(false); // Modal
  const [modalData, setModalData] = useState({}); // Datos del modal

  const handleDayPress = (day) => {
    const dateString = day.dateString;

    if (fridays[dateString]) {
      const { selectedColor, hours, address } = fridays[dateString];
      if (selectedColor === 'red') {
        setModalData({ hours, address });
        setModalVisible(true);
      }
    }
  };

  const generateFridays = (year) => {
    const fridays = {};
    const scheduleArray = [];

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1);
      const firstDay = startDate.getDay();
      // Calcula el primer viernes del mes
      let firstFriday = 1 + (5 - firstDay + 7) % 7;

      for (let i = firstFriday; i <= 31; i += 7) {
        const dayString = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

        fridays[dayString] = {
          selected: true,
          selectedColor: 'red',
          selectedTextColor: 'white',
          hours: '10:00 AM - 2:00 PM',
          address: 'Isla de Achao',
        };

        scheduleArray.push({ 
          date: dayString, hours: '10:00 AM - 2:00 PM', 
          address: 'Isla de Achao',
        });
      }
    }
    return { fridays, scheduleArray };
  };

  useEffect(() => {
    const year = 2024;
    const { scheduleArray } = generateFridays(year);

    // Actualizamos el contexto con los horarios después del renderizado inicial
    setCollectionSchedule(scheduleArray);
  }, [setCollectionSchedule]);

  const year = 2024;
  const { fridays } = generateFridays(year);

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
      referenceText: 'Keep your area clean and organized with our waste collection calendar:',
      recourseTitle: 'Collection Route',
      recourseText: 'Here is the collection route for the different zones:',
      recourseAddress1: 'Mirador Alto Street 123',
      recourseAddress2: 'Serrano Street 456',
      recourseAddress3: 'Padre German Ampuero Street 789',
      recourseHours1: 'Time: 10:00 AM a 10:00 AM',
      recourseHours2: 'Time: 11:30 AM a 12:00 PM',
      recourseHours3: 'Time: 1:00 PM a 2:00 PM',
    },
  };

  return (
    <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/gestion.png')} style={styles.banner} />
        </View>

        {/* Textos y calendario */}
        <Text style={styles.referenceText}>{texts[language].referenceText}</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={fridays}
            onDayPress={handleDayPress}            
            theme={{
              selectedDayBackgroundColor: 'red',
              todayTextColor: 'black',
              arrowColor: 'black',
              dayTextColor: '#000',
            }}
            locale={language === 'es' ? 'es' : 'en'}
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

      {/* Menú Inferior */}
      <View style={styles.menuContainer}>
        <MenuInferior />
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{texts[language].alertTitle}</Text>
            <Text style={styles.modalMessage}>Hora: {modalData.hours}</Text>
            <Text style={styles.modalMessage}>Dirección: {modalData.address}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: { flex: 1, paddingVertical: 20 },
  scrollContainer: { flexGrow: 1, alignItems: 'center', paddingBottom: 80, width: '100%',}, 
  bannerContainer: { width: '100%', marginBottom: 5 },
  banner: { width: '100%', height: 115, resizeMode: 'cover' },
  referenceText: { fontSize: 16, marginLeft: 11, marginRight: 11, fontWeight: '500',  color: '#000000', textAlign: 'justify', marginBottom: 10 },
  calendarContainer: { width: '90%', borderWidth: 2.5, borderColor: '#4CAF50',borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', marginBottom: 15, marginTop: 2 },
  recourseContainer: { width: '90%', padding: 15, backgroundColor: '#fff', borderRadius: 10 },
  recourseTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 10 },
  recourseText: { fontSize: 15, color: '#000', textAlign: 'left', marginBottom: 15 },
  recourseItem: { marginBottom: 10 },
  recourseAddress: { fontSize: 14 },
  recourseHours: { fontSize: 12 },
  menuContainer: { position: 'absolute', bottom: 0, width: '100%' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalMessage: { fontSize: 16, marginBottom: 10 },
  closeButton: { backgroundColor: '#4CAF50', paddingVertical: 10, borderRadius: 5, paddingHorizontal: 20 },
  closeButtonText: { color: 'white', fontSize: 16 },
});

export default Gestion;
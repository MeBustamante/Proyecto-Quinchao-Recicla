import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import { AppContext } from '../ConfigGlobal/AppContext';

const { height: screenHeight } = Dimensions.get('window');

// Traducciones para meses y días
const translations = {
  es: {
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ],
    days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  },
  en: {
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
};

// Función para formatear las fechas dinámicamente
const formatDate = (dateString, language) => {
  const { months } = translations[language];
  const [year, month, day] = dateString.split('-');
  return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
};

const Gestion = () => {
  const { language, setCollectionSchedule } = useContext(AppContext); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalData, setModalData] = useState({}); 

  const { months, days } = translations[language];

  const schedule = {
    Quinchao: { dates: ['2024-11-01', '2024-11-06', '2024-11-11', '2024-11-16', '2024-11-21', '2024-11-26'], color: '#1E90FF' },
    Matao: { dates: ['2024-11-02', '2024-11-12', '2024-11-22'], color: '#32CD32' },
    Chequian: { dates: ['2024-11-03', '2024-11-13', '2024-11-23'], color: '#32CD32' },
    Chaulinec: { dates: ['2024-11-04', '2024-11-14', '2024-11-24'], color: '#FFA500' },
    Alao: { dates: ['2024-11-05', '2024-11-15', '2024-11-25'], color: '#FFA500' },
    Apiao: { dates: ['2024-11-05', '2024-11-15', '2024-11-25'], color: '#FFA500' },
  };

  const markedDates = {};
  Object.keys(schedule).forEach((key) => {
    schedule[key].dates.forEach((date) => {
      markedDates[date] = {
        selected: true,
        selectedColor: schedule[key].color,
        selectedTextColor: 'white',
      };
    });
  });

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    for (const key in schedule) {
      if (schedule[key].dates.includes(dateString)) {
        setModalData({
          area: key,
          date: formatDate(dateString, language),
        });
        setModalVisible(true);
        return;
      }
    }
  };

  useEffect(() => {
    const scheduleArray = [];
    Object.keys(schedule).forEach((key) => {
      schedule[key].dates.forEach((date) => {
        scheduleArray.push({ date, area: key });
      });
    });
    setCollectionSchedule(scheduleArray);
  }, [setCollectionSchedule]);

  const texts = {
    es: {
      alertTitle: 'Recolección de residuos',
      recuerda: 'Recuerda: El reciclaje comienza en casa. Clasifica tus residuos correctamente.',
      referenceText: 'Consulta el cronograma de recolección en tu zona según el calendario:',
      tableTitle: 'Cronograma de recolección',
      areaHeader: 'Localidad',
      datesHeader: 'Fechas de recolección',
      close: 'Cerrar',
    },
    en: {
      alertTitle: 'Waste Collection',
      recuerda: 'Remember: Recycling starts at home. Sort your waste correctly.',
      referenceText: 'Check the collection schedule in your area according to the calendar:',
      tableTitle: 'Collection Schedule',
      areaHeader: 'Area',
      datesHeader: 'Collection Dates',
      close: 'Close',
    },
  };

  const currentTexts = texts[language];

  return (
    <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/gestion.png')} style={styles.banner} />
        </View>

        {/* Texto de recordatorio antes del calendario */}
        <View style={styles.reminderContainer}>
          <Text style={styles.reminderText}>{currentTexts.recuerda}</Text>
        </View>

        {/* Calendario */}
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={{
              textDayFontFamily: 'System',
              textMonthFontFamily: 'System',
              textDayHeaderFontFamily: 'System',
              textMonthFontSize: 18,
              textDayFontSize: 16,
              monthTextColor: 'black',
              todayTextColor: 'red',
              arrowColor: 'black',
              dayTextColor: '#000',
              textDayHeaderFontSize: 12,
            }}
            renderHeader={(date) => (
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
                {months[date.getMonth()]} {date.getFullYear()}
              </Text>
            )}
            renderDayHeader={(day, index) => (
              <Text key={index} style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>
                {days[index]}
              </Text>
            )}
            firstDay={1} // La semana empieza el lunes
          />
        </View>

        {/* Tabla de Cronograma */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>{currentTexts.tableTitle}</Text>
          {Object.keys(schedule).map((area, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                {
                  borderLeftColor: schedule[area].color,
                  backgroundColor: `${schedule[area].color}20`,
                },
              ]}
            >
              <Text style={styles.tableArea}>{area}</Text>
              <View style={styles.tableDates}>
                {schedule[area].dates.map((date, idx) => (
                  <Text key={idx} style={styles.tableDate}>
                    {formatDate(date, language)}
                  </Text>
                ))}
              </View>
            </View>
          ))}
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
            <Text style={styles.modalTitle}>{currentTexts.alertTitle}</Text>
            <Text style={styles.modalMessage}>
              {currentTexts.areaHeader}: {modalData.area}
            </Text>
            <Text style={styles.modalMessage}>
              Fecha: {modalData.date}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>{currentTexts.close}</Text>
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
  calendarContainer: { width: '90%', borderWidth: 2, borderColor: '#4CAF50',borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', marginBottom: 15, marginTop: 2 },
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
  tableContainer: {
    marginTop: 15, // Separación superior
    width: '90%', // Ancho relativo
    backgroundColor: '#FFF', // Fondo blanco
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Espaciado interno
    borderWidth: 2, // Borde fino
    borderColor: '#4CAF50', // Color verde del borde
},
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  reminderContainer: {
    backgroundColor: 'transparent', // Fondo moderno (naranja claro)
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Espaciado interno
    marginVertical: 20, // Separación con otros elementos
    marginHorizontal: 10, // Separación lateral
    borderWidth: 2, // Borde fino
    borderColor: '#4CAF50',
  },
  reminderText: {
    fontSize: 18, // Tamaño del texto
    fontWeight: 'bold', // Negrita
    color: 'black', // Naranja oscuro para el texto
    textAlign: 'center', // Centrado
    lineHeight: 24, // Espaciado entre líneas
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderLeftWidth: 5,
    paddingLeft: 10,
  },
  tableArea: {
    flex: 0.3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  tableDates: {
    flex: 0.7,
    flexDirection: 'column',
  },
  tableDate: {
    fontSize: 14,
    color: '#000',
  },
});

export default Gestion;
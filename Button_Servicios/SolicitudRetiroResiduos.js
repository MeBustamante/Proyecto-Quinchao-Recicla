import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import CheckBox from 'react-native-check-box';
import LottieView from 'lottie-react-native';
import { AppContext } from '../ConfigGlobal/AppContext';

const { height: screenHeight } = Dimensions.get('window');

const translations = {
  es: {
    title: '¡Cuidemos la comuna! Completa los datos y déjalo en nuestras manos!',
    name: 'Nombre y Apellidos',
    phone: 'Teléfono',
    phoneplaceholder: '+569 12345678',
    email: 'Correo Electrónico',
    emailplaceholder: 'ejemplo@gmail.com',
    address: 'Dirección',
    addressplaceholder: 'Dirección #01',
    wasteType: 'Tipo de Residuos',
    submit: 'Enviar',
    modalTitle: '¡Gracias por tu compromiso! Tu solicitud ha sido enviada correctamente.',
    modalText: 'Residuos seleccionados:',
    close: 'Cerrar',
    wasteOptions: ['Latas', 'Plásticos', 'Vidrios', 'Metales', 'Papel', 'Orgánicos'],
    terminos: 'Al enviar este formulario, usted acepta que los datos proporcionados serán conocidos y utilizados exclusivamente por la Municipalidad de Quinchao para la gestión y resolución de su solicitud.',
    errorModalText: 'Faltan completar los siguientes campos:',
    closeError: 'Cerrar', // Cambié el nombre para evitar la colisión
  },
  en: {
    title: 'Let’s care for our community! Complete the information and leave it to us!',
    name: 'Full Name',
    phone: 'Phone',
    phoneplaceholder: '+569 12345678',
    email: 'Email Address',
    emailplaceholder: 'example@gmail.com',
    address: 'Address',
    addressplaceholder: 'Address #01',
    wasteType: 'Type of Waste',
    submit: 'Submit',
    modalTitle: 'Thank you for your commitment! Your request has been successfully sent.',
    modalText: 'Selected waste:',
    close: 'Close',
    wasteOptions: ['Cans', 'Plastics', 'Glass', 'Metals', 'Paper', 'Organics'],
    terminos: 'By submitting this form, you agree that the data provided will be known and used exclusively by the Municipality of Quinchao for the management and resolution of your application.',
    errorModalText: 'Please complete all fields.',
    closeError: 'Close', // Cambié el nombre para evitar la colisión
  },
};

const SolicitudRetiroResiduos = () => {
  const { language, addNotification } = useContext(AppContext);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [selectedResiduos, setSelectedResiduos] = useState([]);
  const [tempSelectedResiduos, setTempSelectedResiduos] = useState([]); // Estado temporal para mostrar en el modal
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigation = useNavigation();

  const toggleResiduo = (residuo) => {
    setSelectedResiduos((prev) =>
      prev.includes(residuo) ? prev.filter((item) => item !== residuo) : [...prev, residuo]
    );
  };

  const t = translations[language];

  const [missingFields, setMissingFields] = useState([]);

  const handleSubmit = () => {
    const errors = [];

    if (!nombre) errors.push(t.name);
    if (!telefono) errors.push(t.phone);
    if (!email) errors.push(t.email);
    if (!direccion) errors.push(t.address);
    if (selectedResiduos.length === 0) errors.push(t.wasteType);

    if (errors.length > 0) {
      setMissingFields(errors); // Actualiza los campos faltantes
      setShowErrorModal(true);  // Muestra el modal de error
      return;
    }

    // Si todo está correcto, procede con el envío
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(language === 'es' ? 'es-CL' : 'en-US');
    const formattedTime = currentDate.toLocaleTimeString(language === 'es' ? 'es-CL' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const notificationMessage = language === 'es'
      ? `Se solicitó el retiro de residuos de ${selectedResiduos}. En ${direccion}`
      : `Requested waste removal of ${selectedResiduos} at ${direccion}`;

    addNotification(notificationMessage);

    setTempSelectedResiduos(selectedResiduos); // Guarda los residuos seleccionados temporalmente
    setShowModal(true);

    // Limpia los estados
    setNombre('');
    setTelefono('');
    setEmail('');
    setDireccion('');
    setSelectedResiduos([]);
    setMissingFields([]); // Limpia los campos faltantes
  };

  return (
    <LinearGradient colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/retiro1.png')} style={styles.banner} />
        </View>

        <View style={styles.container}>
          <Text style={styles.description}>{t.title}</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>{t.name}<Text style={styles.requiredAsterisk}>*</Text></Text>
            <TextInput
  style={styles.input}
  placeholder={t.name}
  value={nombre}
  onChangeText={(text) => {
    // Limitar a 40 caracteres
    const sanitizedText = text.substring(0, 40);
    setNombre(sanitizedText);
  }}
/>

            <Text style={styles.label}>{t.phone}<Text style={styles.requiredAsterisk}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder={t.phoneplaceholder}
              value={telefono}
              onChangeText={(text) => {
                // Limitar el número a 12 caracteres y asegurarse del formato
                const sanitizedText = text.replace(/[^0-9+]/g, '').substring(0, 12); // Permitir solo números y "+"
                setTelefono(sanitizedText);
              }}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>{t.email}<Text style={styles.requiredAsterisk}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t.emailplaceholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>{t.address}<Text style={styles.requiredAsterisk}>*</Text>
            </Text>
            <TextInput style={styles.input} placeholder={t.addressplaceholder} value={direccion} onChangeText={setDireccion} />

            <Text style={styles.label}>{t.wasteType}<Text style={styles.requiredAsterisk}>*</Text>
            </Text>
            <View style={styles.residuosContainer}>
              {t.wasteOptions.map((residuo, index) => (
                <View key={index} style={styles.checkboxContainer}>
                  <CheckBox
                    isChecked={selectedResiduos.includes(residuo)}
                    onClick={() => toggleResiduo(residuo)}
                    rightText={residuo}
                    rightTextStyle={styles.checkboxText}
                    checkBoxColor="#388E3C"
                    style={styles.checkbox}
                  />
                </View>
              ))}
            </View>

            {/* Mensaje de uso de datos */}
            <View style={styles.dataUsageContainer}>
              <Text style={styles.dataUsageText}>{t.terminos}</Text>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{t.submit}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <MenuInferior navigation={navigation} />

      {/* Modal de éxito */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <LottieView
              source={require('../assets/Animaciones/enviar.json')}
              autoPlay
              loop={true}
              style={styles.animation}
            />
            <Text style={styles.modalTitle}>{t.modalTitle}</Text>
            <Text style={styles.modalText}>
              {t.modalText} {tempSelectedResiduos.length > 0 ? tempSelectedResiduos.join(', ') : 'Ninguno'}
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.closeButton]} // Agregar clase de botón de cierre
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.modalButtonText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de error */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.errorModalContainer}>
            <LottieView
              source={require('../assets/Animaciones/fail.json')}
              autoPlay
              loop={true}
              style={styles.animation}
              speed={0.5}
            />
            <Text style={styles.errorModalText}>{t.errorModalText}</Text>
            {missingFields.length > 0 && (
              <View style={styles.missingFieldsContainer}>
                {missingFields.map((field, index) => (
                  <Text key={index} style={styles.missingFieldItem}>
                    - {field}
                  </Text>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={[styles.errorModalButton, styles.closeButton]} // Agregar clase de botón de cierre
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.errorModalButtonText}>{t.closeError}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  bannerContainer: { position: 'relative', width: '100%', height: screenHeight * 0.15,  marginBottom: 0.2, marginTop: 5,  },
  banner: { width: '100%', height: 100, resizeMode: 'contain', },
  scrollContainer: { paddingBottom: 80 },
  container: { paddingHorizontal: 20 },
  description: { fontSize: 18, textAlign: 'center', color: 'black', paddingHorizontal: 12, marginBottom: 8 },
  dataUsageContainer: {
    backgroundColor: '#F9F9F9', // Fondo gris claro
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20, // Espacio entre los campos del formulario y el mensaje
    marginBottom: 20, // Espacio entre el mensaje y el botón de envío
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Borde sutil
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dataUsageText: { fontSize: 13, textAlign: 'justify', color: '#555' },
  formContainer: { backgroundColor: 'white', borderRadius: 10, padding: 15, marginHorizontal: 2, elevation: 5, shadowColor: 'black', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  label: { fontSize: 14, color: '#333333', marginBottom: 2, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: '#ffffff' },
  residuosContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', },
  checkboxContainer: { width: '48%', marginBottom: 5 },
  checkboxText: { fontSize: 14, color: '#333' },
  submitButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8, alignItems: 'center', elevation: 8 },
  submitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: { backgroundColor: 'white', padding: 20, borderRadius: 20, alignItems: 'center', width: '85%', },
  animation: { width: 230, height: 180, marginBottom: 0 },
  modalTitle: { fontSize: 16, textAlign: 'center', marginBottom: 10, color: 'green', fontWeight: 'bold' },
  modalText: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 },
  modalButton: { backgroundColor: '#388E3C', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { color: '#ffffff', fontSize: 16 },
  errorModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '75%',
    height: '63%',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  errorModalText: { fontSize: 16, fontWeight: 'bold', color: 'black', textAlign: 'left', marginBottom: 10, },
  errorModalButton: { backgroundColor: '#4CAF50', marginTop: 15, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  errorModalButtonText: { color: '#ffffff', fontSize: 16},
  closeButton: {
    backgroundColor: 'red', // Fondo rojo
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  requiredAsterisk: { color: 'red', fontSize: 16,  marginLeft: 4 },
  missingFieldsContainer: {
    alignSelf: 'flex-start', 
    marginTop: 1,  
    paddingHorizontal: 10, 
  },
  missingFieldItem: {
    fontSize: 14,
    textAlign: 'left',
    color: 'black',        
    marginVertical: 2,
  },  
});

export default SolicitudRetiroResiduos;

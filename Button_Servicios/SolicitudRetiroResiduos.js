import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MenuInferior from '../Menu_Inferior/MenuInferior';
import CheckBox from 'react-native-check-box';
import LottieView from 'lottie-react-native';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global

const { height: screenHeight } = Dimensions.get('window');

const translations = {
  es: {
    title: '¡Cuidemos la comuna! Completa los datos y déjalo en nuestras manos!',
    name: 'Nombre y Apellidos',
    phone: 'Teléfono',
    email: 'Correo Electrónico',
    address: 'Dirección',
    wasteType: 'Tipo de Residuos',
    submit: 'Enviar',
    modalTitle: '¡Gracias por tu compromiso! Tu solicitud ha sido enviada correctamente.',
    modalText: 'Residuos seleccionados:',
    close: 'Cerrar',
    wasteOptions: ['Latas', 'Plásticos', 'Vidrios', 'Metales', 'Papel', 'Orgánicos'], 

  },
  en: {
    title: 'Let’s care for our community! Complete the information and leave it to us!',
    name: 'Full Name',
    phone: 'Phone',
    email: 'Email Address',
    address: 'Address',
    wasteType: 'Type of Waste',
    submit: 'Submit',
    modalTitle: 'Thank you for your commitment! Your request has been successfully sent.',
    modalText: 'Selected waste:',
    close: 'Close',
    wasteOptions: ['Cans', 'Plastics', 'Glass', 'Metals', 'Paper', 'Organics'], // Traducciones en inglés
  },
};

const SolicitudRetiroResiduos = () => {
  const { language } = useContext(AppContext); // Usa el contexto global para obtener el idioma
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [selectedResiduos, setSelectedResiduos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const residuos = ['Latas', 'Plásticos', 'Vidrios', 'Metales', 'Papel', 'Orgánicos'];

  const toggleResiduo = (residuo) => {
    setSelectedResiduos((prev) =>
      prev.includes(residuo) ? prev.filter((item) => item !== residuo) : [...prev, residuo]
    );
  };

  const handleSubmit = () => {
    setShowModal(true); // Muestra el modal con la animación
  };

  const t = translations[language]; // Traducciones según el idioma

  return (
    <LinearGradient
      colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#FFD54F']}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/retiro1.png')} style={styles.banner} />
        </View>

        <View style={styles.container}>
          <Text style={styles.description}>{t.title}</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>{t.name}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.name}
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>{t.phone}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.phone}
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>{t.email}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.email}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>{t.address}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.address}
              value={direccion}
              onChangeText={setDireccion}
            />

            <Text style={styles.label}>{t.wasteType}</Text>
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


            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{t.submit}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <MenuInferior navigation={navigation} />

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
              {t.modalText} {selectedResiduos.length > 0 ? selectedResiduos.join(', ') : 'Ninguno'}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
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
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  bannerContainer: {
    width: '100%',
    height: screenHeight * 0.2,
    marginBottom: 1,
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  container: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  residuosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    width: '48%',
    marginBottom: 5,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: 'green',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default SolicitudRetiroResiduos;

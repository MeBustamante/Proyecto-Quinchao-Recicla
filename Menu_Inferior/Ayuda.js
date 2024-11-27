import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { AppContext } from '../ConfigGlobal/AppContext'; // Importa el contexto global
import MenuInferior from '../Menu_Inferior/MenuInferior'; // Importa el componente MenuInferior

const Ayuda = () => {
  const { language } = useContext(AppContext); // Obtén el idioma del contexto

  const translations = {
    es: {
      appUsage: '¿Cómo usar la aplicación?',
      appUsageDescription: 'Navega a través de las opciones en el menú inferior para explorar diferentes funcionalidades de la aplicación. En el menú principal podrás acceder a los diferentes servicios, como la denuncia de microbasurales y la consulta de puntos de reciclaje.',
      reportWaste: '¿Cómo realizar una denuncia?',
      reportWasteDescription: 'Para reportar un microbasural, ve a la sección de "Denuncia" en el menú de servicios. Completa los datos requeridos y adjunta una imagen. Así podrás contribuir al cuidado de nuestro medio ambiente.',
      notifications: '¿Cómo habilitar notificaciones?',
      notificationsDescription: 'Ve a "Configuración" en el menú inferior y habilita las notificaciones para recibir alertas sobre los servicios y actividades de reciclaje. Asegúrate de haber dado permiso en tu dispositivo para recibirlas.',
      recyclingPoints: '¿Dónde puedo encontrar puntos de reciclaje?',
      recyclingPointsDescription: 'Puedes consultar los puntos de reciclaje cercanos a tu ubicación en la sección "Puntos de Reciclaje". El mapa te mostrará los lugares donde puedes llevar tus residuos reciclables.',
      contact: 'Contacto',
      contactDescription: 'Si necesitas ayuda adicional, por favor contacta con nosotros al correo: soporte@quinchaorecicla.cl. Estamos disponibles para resolver cualquier duda o problema que tengas.'
    },
    en: {
      appUsage: 'How to use the app?',
      appUsageDescription: 'Navigate through the options in the bottom menu to explore the different features of the app. In the main menu, you can access different services, such as reporting illegal dumps and finding recycling points.',
      reportWaste: 'How to make a report?',
      reportWasteDescription: 'To report an illegal dump, go to the "Report" section in the services menu. Fill in the required data and attach an image. This way, you can help protect our environment.',
      notifications: 'How to enable notifications?',
      notificationsDescription: 'Go to "Settings" in the bottom menu and enable notifications to receive alerts about recycling services and activities. Make sure you have granted permission on your device to receive them.',
      recyclingPoints: 'Where can I find recycling points?',
      recyclingPointsDescription: 'You can find nearby recycling points in the "Recycling Points" section. The map will show you locations where you can take your recyclable waste.',
      contact: 'Contact',
      contactDescription: 'If you need further assistance, please contact us at: soporte@quinchaorecicla.cl. We are available to resolve any questions or issues you may have.'
    },
  };

  const currentLanguage = translations[language];

  return (
    <LinearGradient
      colors={['#A8E6CF', '#DCEDC1', '#FFF9C4', '#f7db81']}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>{currentLanguage.appUsage}</Text>
            <Text style={styles.text}>{currentLanguage.appUsageDescription}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>{currentLanguage.reportWaste}</Text>
            <Text style={styles.text}>{currentLanguage.reportWasteDescription}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>{currentLanguage.notifications}</Text>
            <Text style={styles.text}>{currentLanguage.notificationsDescription}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>{currentLanguage.recyclingPoints}</Text>
            <Text style={styles.text}>{currentLanguage.recyclingPointsDescription}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>{currentLanguage.contact}</Text>
            <Text style={styles.text}>{currentLanguage.contactDescription}</Text>
          </Card.Content>
        </Card>

        {/* Añadimos un paddingBottom para asegurarnos de que el contenido no quede debajo del menú */}
      </ScrollView>

      {/* Aquí agregamos el menú inferior */}
      <MenuInferior />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80, // Asegura que el contenido no quede oculto debajo del menú inferior
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796B',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
  },
});

export default Ayuda;

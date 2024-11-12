// Servicios.js
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const ServiciosScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#81C784', '#388E3C']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Servicios</Text>
        <Text>Acá podrás </Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('SolicitudRetiroResiduos')}
        >
          <Text style={styles.buttonText}>Solicitud Retiro Residuos</Text>
          <Image 
             source={require('./assets/solicitudretiro.png')} 
             style={styles.botonimagen} 
          />
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('DenunciaMicrobasural')}
        >
          <Text style={styles.buttonText}>Denuncia Microbasural</Text>
          <Image 
             source={require('./assets/MICROBASURAL.png')} 
             style={styles.botonimagen} 
          />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botonimagen: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
});

export default ServiciosScreen;

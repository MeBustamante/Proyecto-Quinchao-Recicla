// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login';
import PantallaPrincipalScreen from './Pantalla_Principal';
import ReciclajeScreen from './Programas1';
import ServiciosScreen from './Servicios';
import PuntosReciclajeScreen from './Puntos_Reciclaje'; // Importa la nueva pantalla

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={PantallaPrincipalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reciclaje" component={ReciclajeScreen} options={{ title: 'Gestión de Reciclaje' }} />
        <Stack.Screen name="Servicios" component={ServiciosScreen} options={{ title: 'Servicios' }} />
        <Stack.Screen name="PuntosReciclaje" component={PuntosReciclajeScreen} options={{ title: 'Puntos de Reciclaje' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

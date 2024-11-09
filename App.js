// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login'; // Importamos LoginScreen
import PantallaPrincipalScreen from './Pantalla_Principal'; // Importamos PantallaPrincipalScreen
import ReciclajeScreen from './Reciclaje'; // Importamos ReciclajeScreen
import ServiciosScreen from './Servicios'; // Importamos ServiciosScreen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={PantallaPrincipalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reciclaje" component={ReciclajeScreen} options={{ title: 'Gestión de Reciclaje' }} />
        <Stack.Screen name="Servicios" component={ServiciosScreen} options={{ title: 'Servicios' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

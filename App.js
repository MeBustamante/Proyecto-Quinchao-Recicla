import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login';  // Pantalla de login
import PantallaPrincipalScreen from './Pantalla_Principal';  // Pantalla principal
import Programas1Screen from './Programas1';  // Pantalla Programas1
import ServiciosScreen from './Servicios';  // Pantalla Servicios
import PuntosReciclajeScreen from './Puntos_Reciclaje';  // Pantalla Puntos de Reciclaje
import Campañas1Screen from './Campañas1'; // Nueva pantalla Campañas1
import MenuReciclajeScreen from './MenuReciclaje'; // Nueva pantalla MenuReciclaje

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla de login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Pantalla principal */}
        <Stack.Screen 
          name="Home" 
          component={PantallaPrincipalScreen} 
          options={{ headerShown: false }} 
        />

        {/* Pantalla Programas1Screen */}
        <Stack.Screen 
          name="Programas1" 
          component={Programas1Screen} 
          options={{ title: 'Programas' }} 
        />
        
        {/* Nueva pantalla MenuReciclaje */}
        <Stack.Screen 
          name="MenuReciclaje" 
          component={MenuReciclajeScreen} 
          options={{ title: 'Menú Reciclaje' }} 
        />

        {/* Pantalla Campañas1 */}
        <Stack.Screen 
          name="Campañas1" 
          component={Campañas1Screen} 
          options={{ title: 'Campañas' }} 
        />

        {/* Pantalla Servicios */}
        <Stack.Screen 
          name="Servicios" 
          component={ServiciosScreen} 
          options={{ title: 'Servicios' }} 
        />
        
        {/* Pantalla PuntosReciclaje */}
        <Stack.Screen 
          name="PuntosReciclaje" 
          component={PuntosReciclajeScreen} 
          options={{ title: 'Puntos de Reciclaje' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

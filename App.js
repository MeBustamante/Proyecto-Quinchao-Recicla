import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login/Login';  // Pantalla de login
import PantallaPrincipalScreen from './Pagina_Principal/Pantalla_Principal';  // Pantalla principal
import ServiciosScreen from './Button_Servicios/Servicios';  // Pantalla Servicios
import PuntosReciclajeScreen from './Button_PuntosReciclaje/Puntos_Reciclaje';  // Pantalla Puntos de Reciclaje
import MenuReciclajeScreen from './Button_Reciclaje/MenuReciclaje'; // Nueva pantalla MenuReciclaje
import SolicitudRetiroResiduos from './Button_Servicios/SolicitudRetiroResiduos';
import DenunciaMicrobasural from './Button_Servicios/DenunciaMicrobasural';
import Gestion from './Button_Reciclaje/Gestion';
import AcercaScreen from './Menu_Inferior/Acerca';
import CompostajeCasa from './Button_Reciclaje/CompostajeCasa';
import CompostajeComunidad from './Button_Reciclaje/CompostajeComunidad';
import HuertosUrbanosScreen from './Button_Reciclaje/HuertosUrbanos';
import ReforestacionUrbanaScreen from './Button_Reciclaje/ReforestacionUrbana';

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

        {/* pantalla MenuReciclaje */}
        <Stack.Screen 
          name="MenuReciclaje" 
          component={MenuReciclajeScreen} 
          options={{ title: 'Menú Reciclaje' }} 
        />

        {/* Pantalla CompostajeCasa */}
        <Stack.Screen 
          name="CompostajeCasa" 
          component={CompostajeCasa} 
          options={{ title: 'Compostaje en Casa' }} 
        />

        {/* Pantalla CompostajeComunidad */}
        <Stack.Screen 
          name="CompostajeComunidad" 
          component={CompostajeComunidad} 
          options={{ title: 'Compostaje en Comunidad' }} 
        />

        {/* Pantalla Servicios */}
        <Stack.Screen 
          name="Servicios" 
          component={ServiciosScreen} 
          options={{ title: 'Servicios' }} 
        />

        {/* Pantalla HuertosUrbanos */}
        <Stack.Screen 
          name="HuertosUrbanos" 
          component={HuertosUrbanosScreen} 
          options={{ title: 'Huertos Urbanos' }} 
        />

        {/* Pantalla ReforestacionUrbana */}
        <Stack.Screen 
          name="ReforestacionUrbana" 
          component={ReforestacionUrbanaScreen} 
          options={{ title: 'Reforestación Urbana' }} 
        />

        {/* Pantalla para Solicitar Retiro de Residuos */}
        <Stack.Screen 
          name="SolicitudRetiroResiduos" 
          component={SolicitudRetiroResiduos} 
        />

        {/* Pantalla DenunciaMicrobasural */}
        <Stack.Screen 
          name="DenunciaMicrobasural" 
          component={DenunciaMicrobasural} 
        />

        {/* Pantalla PuntosReciclaje */}
        <Stack.Screen 
          name="PuntosReciclaje" 
          component={PuntosReciclajeScreen} 
          options={{ title: 'Puntos de Reciclaje' }} 
        />

        {/* Pantalla Gestión */}
        <Stack.Screen 
          name="Gestion" 
          component={Gestion} 
        />

        {/* Pantalla Acerca */}
        <Stack.Screen 
          name="Acerca" 
          component={AcercaScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

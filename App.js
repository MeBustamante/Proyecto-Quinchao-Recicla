import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './Login/UserContext';

import LoginScreen from './Login/Login';
import PantallaPrincipalScreen from './Pagina_Principal/Pantalla_Principal';
import ServiciosScreen from './Button_Servicios/Servicios';
import PuntosReciclajeScreen from './Button_PuntosReciclaje/Puntos_Reciclaje';
import MenuReciclajeScreen from './Button_Reciclaje/MenuReciclaje';
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
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={PantallaPrincipalScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MenuReciclaje" component={MenuReciclajeScreen} options={{ title: 'Menú Reciclaje' }} />
                    <Stack.Screen name="CompostajeCasa" component={CompostajeCasa} options={{ title: 'Compostaje en Casa' }} />
                    <Stack.Screen name="CompostajeComunidad" component={CompostajeComunidad} options={{ title: 'Compostaje en Comunidad' }} />
                    <Stack.Screen name="Servicios" component={ServiciosScreen} options={{ title: 'Servicios' }} />
                    <Stack.Screen name="HuertosUrbanos" component={HuertosUrbanosScreen} options={{ title: 'Huertos Urbanos' }} />
                    <Stack.Screen name="ReforestacionUrbana" component={ReforestacionUrbanaScreen} options={{ title: 'Reforestación Urbana' }} />
                    <Stack.Screen name="SolicitudRetiroResiduos" component={SolicitudRetiroResiduos} />
                    <Stack.Screen name="DenunciaMicrobasural" component={DenunciaMicrobasural} />
                    <Stack.Screen name="PuntosReciclaje" component={PuntosReciclajeScreen} options={{ title: 'Puntos de Reciclaje' }} />
                    <Stack.Screen name="Gestion" component={Gestion} />
                    <Stack.Screen name="Acerca" component={AcercaScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InscriptionScreen from './MyApp/Employe/Inscription'
import {ImageScreen}  from './MyApp/Employe/Tabs/ReportTab/ImageScreen'
import MyTabs from './MyApp/Employe/MyTabs';
import LoginScreen from './MyApp/Employe/LoginScreen';
import LoginAdminScreen from './MyApp/Administrateur/LoginAdminScreen';
import Chose from './MyApp/Chose'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen options={{headerLeft: null}} name="Qui êtes-vous ?" component={Chose} />
        <Stack.Screen options={{headerLeft: null}} name="LoginEmploye" component={LoginScreen} />
        <Stack.Screen options={{headerLeft: null}} name="LoginAdmin" component={LoginAdminScreen} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen options={{headerShown: false}} name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Photo" component={ImageScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Mycamera from './MyApp/Employe/Tabs/ReportTab/Camera' 
import {ImageScreen}  from './MyApp/Employe/Tabs/ReportTab/ImageScreen'
import MyTabs from './MyApp/Employe/MyTabs';
import LoginScreen from './MyApp/Employe/LoginScreen';
import LoginAdminScreen from './MyApp/Administrateur/LoginAdminScreen';
import Chose from './MyApp/Chose'

const Stack = createNativeStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen options={{headerLeft: null}} name="Qui êtes-vous ?" component={Chose} />
        <Stack.Screen options={{headerShown: false}} name="LoginAdmin" component={LoginAdminScreen} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Signaler un risque" component={Mycamera} />
        <Stack.Screen name="Photo" component={ImageScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InscriptionScreen from './MyApp/Worker/Login_InscriptionScreens/InscriptionWorker'
import {ImageScreen}  from './MyApp/Worker/SendReportTab/PictureOfTheReport'

import MyTabs from './MyApp/Worker/MyTabWorker';
import MyTabsAdmin from './MyApp/Administrator/MyTabsAdmin';

import LoginScreen from './MyApp/Worker/Login_InscriptionScreens/LoginScreenWorker';
import LoginAdminScreen from './MyApp/Administrator/LoginScreenAdmin';

import Chose from './MyApp/ChoseNavigation'
import logo from './MyApp/logo'
import skeletonWorker from './MyApp/Skeletons/skeletonHomeWorker'
import skeletonAdmin from './MyApp/Skeletons/skeletonHomeAdmin'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>

    
        <Stack.Screen options={{headerShown: false}} name="logo" component={logo} />
        <Stack.Screen options={{headerShown: false}} name="skeletonWorker" component={skeletonWorker} />
        <Stack.Screen options={{headerShown: false}} name="skeletonAdmin" component={skeletonAdmin} />
        <Stack.Screen options={{headerShown: false}} name="Qui êtes-vous ?" component={Chose} />
        <Stack.Screen options={{headerLeft: null}} name="LoginEmploye" component={LoginScreen} />
        <Stack.Screen options={{headerLeft: null}} name="LoginAdmin" component={LoginAdminScreen} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen options={{headerShown: false}} name="MyTabs" component={MyTabs} />
        <Stack.Screen options={{headerShown: false}} name="MyTabsAdmin" component={MyTabsAdmin} />
        <Stack.Screen name="Photo" component={ImageScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
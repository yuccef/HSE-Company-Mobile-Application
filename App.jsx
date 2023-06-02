import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InscriptionScreen from './MyApp/Services/InscriptionWorker'
import {ImageScreen}  from './MyApp/Components/Worker/SendReportTab/PictureOfTheReport'

import MyTabs from './MyApp/Pages/WorkerPages/MyTabWorker';
import MyTabAdmin from './MyApp/Pages/AdminPages/MyTabAdmin';

import LoginScreen from './MyApp/Services/LoginScreenWorker';
import LoginAdminScreen from './MyApp/Services/LoginScreenAdmin';

import Chose from './MyApp/Pages/GeneralPages/ChoseNavigation'
import logo from './MyApp/Pages/GeneralPages/logo'

import skeletonWorker from './MyApp/Pages/Skeletons/skeletonHomeWorker'
import skeletonAdmin from './MyApp/Pages/Skeletons/skeletonHomeAdmin'


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
        <Stack.Screen options={{headerShown: false}} name="MyTabsAdmin" component={MyTabAdmin} />
        <Stack.Screen name="Photo" component={ImageScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Mycamera} from './MyApp/Report/Report' 
import {ImageScreen}  from './MyApp/Report/ImageScreen'
import MyTabs from './MyApp/MyTabs';
import LoginScreen from './MyApp/Screens/LoginScreen';
import LoginAdminScreen from './MyApp/Screens/LoginAdminScreen';
import chose from './MyApp/Screens/chose'
import {styles} from './MyApp/Styles'
const Stack = createNativeStackNavigator();

test

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Chose" component={chose} />
       <Stack.Screen name="LoginAdmin" component={LoginAdminScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Signaler un risque" component={Mycamera} />
        <Stack.Screen name="Photo" component={ImageScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

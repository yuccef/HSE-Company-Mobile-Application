import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Mycamera} from './MyApp/Screens/Camera' ;
import MyTabs from './MyApp/MyTabs';
import LoginScreen from './MyApp/Screens/LoginScreen';
import {styles} from './MyApp/Styles';
import chose from './MyApp/Screens/chose'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Chose" component={chose} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Signaler un risque" component={Mycamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {Text } from 'react-native';


import HomeScreen from './Screens/HomeScreenAdmin'
import HSE from './Screens/HSE'
import ReportScreenAdmin from './Screens/ReportScreenAdmin'
import SettingsScreen from './Screens/SettingScreen'
import button_camera from './button_risk';
import {styles} from './Styles'
import {Mycamera} from './Report/Report' 
import {ImageScreen}  from './Report/ImageScreen'
import ButtonRisk from './button_risk';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 10 }}>Accueil</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Signalements"
        component={ReportScreenAdmin}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? 'green' : color, fontSize: 10 }}>Signalements</Text>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="checkcircleo" size={size} color={focused ? 'green' : color} />
          ),
          tabBarOptions: {
            activeTintColor: 'green',
            inactiveTintColor: 'gray',
          },
        }}/>

      <Tab.Screen
        name="HSE"
        component={HSE}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ textAlign: 'center', color: focused ? 'purple' : color, fontSize: 10 }}>HSE</Text>
          ),
          tabBarIcon: ({focused, color, size }) => (
            <Entypo name="open-book" size={size} color={focused ? 'purple' : color} />
          ),
          tabBarOptions: {
            activeTintColor: 'purple',
            inactiveTintColor: 'gray',
          },
        }}/>
      <Tab.Screen
        name="Paramètres"
        component={SettingsScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ textAlign: 'center', color: focused ? 'black' : color, fontSize: 10 }}>Paramètres</Text>
          ),
          tabBarIcon: ({focused, color, size }) => (
            <AntDesign name="setting" size={size} color={focused ? 'black' : color} />
          ),
          tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          },
        }}/>



    </Tab.Navigator>

  );
}
MyTabs.options = {
  headerShown: false
};
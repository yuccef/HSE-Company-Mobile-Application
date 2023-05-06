import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';



import HomeScreen from './Screens/HomeScreen'
import HSE from './Screens/HSE'
import ReportScreen from './Screens/ReportScreen'
import SettingsScreen from './Screens/SettingScreen'
import button_camera from './button_risk';
import {styles} from './Styles'
import Mycamera from './Screens/Camera';

const Tab = createBottomTabNavigator();


export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Signalements"
        component={ReportScreen}
        options={{
          tabBarLabel: 'Signalements',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="report-problem" size={size} color={color} />
          ),
        }}/>
      <Tab.Screen
        name="HSE"
        component={HSE}
        options={{
          tabBarLabel: 'HSE',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" size={size} color={color} />
          ),
        }}/>
      <Tab.Screen
        name="Paramètres"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Paramètres',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}/>
    </Tab.Navigator>

  );
}
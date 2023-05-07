import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';



import HomeScreen from './Screens/HomeScreen'
import HSE from './Screens/HSE'
import ReportScreen from './Screens/ReportScreen'
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
            <AntDesign name="checkcircleo" size={size} color={"green"} />
          ),
        }}/>
        <Tab.Screen
    name="Signaler un risque"
    component={Mycamera}
    options={{
        tabBarIcon: ({ color, size }) => (
            <AntDesign name="warning" size={size} color={"red"} />
        ),
    }}
/>
      <Tab.Screen
        name="HSE"
        component={HSE}
        options={{
          tabBarLabel: 'HSE',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" size={size} color={"purple"} />
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
MyTabs.options = {
  headerShown: false
};


{/* <Tab.Screen
    name="Photo"
    component={ImageScreen}
    options={{
        tabBarIcon: ({ color, size }) => (
            <AntDesign name="warning" size={size} color={color} />
        ),
    }}
/> */}
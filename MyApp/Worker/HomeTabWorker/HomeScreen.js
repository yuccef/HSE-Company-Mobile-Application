import {  Text, View, } from 'react-native';
import {styles} from '../../Styles/Styles'
import button_risk from './button_risk';
import { nomm } from '../Login_InscriptionScreens/LoginScreenWorker';
import { prenomm } from '../Login_InscriptionScreens/LoginScreenWorker';


export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Bienvenue, {nomm} {prenomm}!</Text>
         {button_risk({navigation})}
      </View>
    );
  }
  
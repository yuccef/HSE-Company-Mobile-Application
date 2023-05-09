import {  Text, View, } from 'react-native';
import {styles} from '../Styles'
import {Mycamera} from '../Report/Report'
import button_risk from '../button_risk';
import { nomm } from './LoginAdminScreen';


export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Bienvenue, {nomm} !</Text>
         {button_risk({navigation})}
      </View>
    );
  }
  HomeScreen.options = {
    headerShown: false
  };

  
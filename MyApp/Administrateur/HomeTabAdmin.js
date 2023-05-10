import {  Text, View, } from 'react-native';
import {styles} from '../Styles/Styles'
import { nomm } from './LoginAdminScreen';
import { prenomm } from './LoginAdminScreen';

export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Bienvenue, {nomm} {prenomm}!</Text>
      </View>
    );
  }
  HomeScreen.options = {
    headerShown: false
  };

  
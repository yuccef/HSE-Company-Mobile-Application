import {  Text, View, } from 'react-native';
import {styles} from '../Styles/Styles'

/**Import Some Data from LoginAdminScreen file */
import { nomm } from './LoginScreenAdmin';
import { prenomm } from './LoginScreenAdmin';


export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Bienvenue, {nomm} {prenomm}!</Text>
      </View>
    );
  }


  
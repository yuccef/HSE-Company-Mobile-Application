import {  Text, View, } from 'react-native';
import {styles} from '../Styles'
import {Mycamera} from './Camera'
import button_risk from '../button_risk';


export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Accueil</Text>
         {button_risk({navigation})}
      </View>
    );
  }
import { Pressable, Text, View, } from 'react-native';
import {styles} from '../Styles'
import { Entypo } from '@expo/vector-icons';
import { Alert} from 'react-native';


const createTwoButtonAlert = (navigation) => {
  Alert.alert('Voulez-vous vous déconnecter ?', '', [
    {
      text: 'Non',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Oui',
       onPress: () => navigation.navigate('Login')
    }
  ]);  
}



export default function SettingScreen({navigation}) {
  const handlePress = () => {
    createTwoButtonAlert(navigation);
  };
  return (
      <View style={styles.setting}>
        <Pressable 
          style={styles.deconnect}
          onPress={() => handlePress()}
        > 
          <Text style ={styles.text_disconnect} >
            Se déconnecter
          </Text>
          <Entypo name="log-out" size={24} color="red" />
        </Pressable>
      </View>
    );
    }

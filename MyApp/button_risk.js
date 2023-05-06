import {Text, View, Pressable } from 'react-native';
import {styles} from './Styles'
import { AntDesign } from '@expo/vector-icons';

export default function button_risk({navigation}) {
    return(
        <Pressable
        style={styles.button_risk}
        onPress={() => navigation.navigate('Signaler un risque')}
        // onPress={this.takePicture}
        >
            <Text style={styles.text_button_risk}><AntDesign name="warning" size={16} color={'#fff'} />{"\n"}Signaler un risque </Text>
        </Pressable>)
}
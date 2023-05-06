import { Pressable, Text} from 'react-native';
import { AntDesign} from '@expo/vector-icons';
import { styles} from './Styles';

export default function button_risk({navigation}) {
    const onPress = () => {
        navigation.navigate('Signaler un risque');
    };
    
    return (
        <Pressable
            style={styles.button_risk}
            onPress={onPress}
        >
            <Text style={styles.text_button_risk}><AntDesign name="warning" size={16} color={'#fff'} />{"\n"}Signaler un risque </Text>
        </Pressable>
    );
}


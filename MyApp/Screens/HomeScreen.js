import { Text, View } from 'react-native';
import { styles } from '../Styles';
import { Mycamera } from './Camera';
import ButtonRisk from '../button_risk';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Accueil</Text>
      <ButtonRisk navigation={navigation} />
    </View>
  );
}

import {  Text, View, } from 'react-native';
import {styles} from '../Styles/Styles'

/**Import Some Data from LoginAdminScreen file */
import { nomm } from './LoginScreenAdmin';
import { prenomm } from './LoginScreenAdmin';


export default function HomeScreen({navigation}) {
    return (
      <View style={styles.containerHome}>
      <Text style={styles.titleHome}>Bienvenue {nomm} {prenomm} ! </Text>
     <Text style={styles.DescriptionHome}>   Votre application HSE vous permet de commenter et de gérer les risques liés à la santé, à la sécurité et à l'environnement dans votre environnement de travail des employés. Avec notre application conviviale, vous pouvez facilement gérer et suivre les incidents, les accidents, les observations de sécurité et bien plus encore.</Text>
   
   </View>
    );
  }


  
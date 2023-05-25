import React from 'react';
import { styles } from '../../Styles/Styles';
import { View, Text } from 'react-native';
import button_risk from './button_risk';
import { nomm, prenomm } from '../Login_InscriptionScreens/LoginScreenWorker';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.containerHome}>
       <Text style={styles.titleHome}>Bienvenue {nomm} {prenomm} ! </Text>
      <Text style={styles.DescriptionHome}>   Votre application HSE vous permet de signaler et de gérer les risques liés à la santé, à la sécurité et à l'environnement dans votre environnement de travail. Avec notre application conviviale, vous pouvez facilement enregistrer et suivre les incidents, les accidents, les observations de sécurité et bien plus encore.</Text>
      {button_risk({navigation})}
    </View>
  );
}

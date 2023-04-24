import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './style';

const Stack = createNativeStackNavigator();

const API_URL = "https://81c4-91-205-43-234.ngrok-free.app/api/customers"; // mettre l'URL correcte pour votre serveur
const ERROR_MESSAGES = {
  EMAIL: "Veuillez entrer une adresse e-mail valide.",
  PASSWORD: "Le mot de passe doit contenir au moins 6 caractères.",
  LOGIN: "Adresse e-mail ou mot de passe incorrect."
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction de validation de l'adresse e-mail
  const isValidEmail = (email) => {
    // Utiliser une expression régulière pour valider le format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction de validation du mot de passe
  const isValidPassword = (password) => {
    // Le mot de passe doit contenir au moins 6 caractères
    return password.length >= 6;
  };

  // Fonction de gestion du changement d'adresse e-mail
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  // Fonction de gestion du changement de mot de passe
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const checkUser = async (email, password) => {
    try {
      const response = await fetch(API_URL);
      const users = await response.json();
      const foundUser = users.find(user => user.email === email && user.password === password);
      if (foundUser) {
        navigation.navigate('Page2');
      } else {
        console.warn('Adresse e-mail ou mot de passe incorrect.');
        Alert.alert(ERROR_MESSAGES.LOGIN);
      }
      return foundUser;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      Alert.alert(ERROR_MESSAGES.LOGIN);
      return null;
    }
  };

  // Fonction de soumission du formulaire de connexion
  const handleSubmit = async () => {
    console.log(email);
    console.log(password);

    // Vérifier si l'adresse e-mail est valide
    if (!isValidEmail(email)) {
      Alert.alert(ERROR_MESSAGES.EMAIL);
      return;
    }

    // Vérifier si le mot de passe est valide
    if (!isValidPassword(password)) {
      Alert.alert(ERROR_MESSAGES.PASSWORD);
      return;
    }

    // Vérifier si l'utilisateur est valide
    await checkUser(email, password);
  };  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('./logo.png')} style={styles.logo} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Adresse e-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"

autofocus={true} // ajouter cette prop pour que le champ de saisie soit automatiquement sélectionné
autoCapitalize="none" // ajouter cette prop pour ne pas capitaliser automatiquement le texte saisi
/>
<Text style={styles.label}>Mot de passe</Text>
<TextInput
style={styles.input}
value={password}
onChangeText={handlePasswordChange}
secureTextEntry={true} // ajouter cette prop pour masquer le texte saisi
/>
<Button title="Se connecter" onPress={handleSubmit} />
</View>
</ScrollView>
</SafeAreaView>
);
};

const Page2Screen = () => {
return (
<View style={styles.page2Container}>
<Text style={styles.page2Text}>Bienvenue sur la page 2 !</Text>
</View>
);
};

const App = () => {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="Page2" component={Page2Screen} />
</Stack.Navigator>
</NavigationContainer>
);
};

export default App;
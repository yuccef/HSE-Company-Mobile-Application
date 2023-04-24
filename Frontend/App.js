import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './style';

const Stack = createNativeStackNavigator();

const API_URL = "https://81c4-91-205-43-234.ngrok-free.app/api/customers";
const API_URL2 = "https://81c4-91-205-43-234.ngrok-free.app/api/customers/sign";

const ERROR_MESSAGES = {
  EMAIL: "Veuillez entrer une adresse e-mail valide.",
  PASSWORD: "Le mot de passe doit contenir au moins 6 caractères.",
  LOGIN: "Adresse e-mail ou mot de passe incorrect."
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  return password.length >= 6;
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const checkUser = async (email, password) => {
    try {
      const response = await fetch(API_URL);
      const users = await response.json();
      const foundUser = users.find(user => user.email === email && user.password === password);
      if (foundUser) {
        navigation.navigate('Page2', { name: foundUser.nom });
      } else {
        Alert.alert(ERROR_MESSAGES.LOGIN);
      }
      return foundUser;
    } catch (error) {
      console.error('Erreur lors de la vérification de l utilisateur :', error);
      Alert.alert(ERROR_MESSAGES.LOGIN);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      Alert.alert(ERROR_MESSAGES.EMAIL);
      return;
    }
  
    if (!isValidPassword(password)) {
      Alert.alert(ERROR_MESSAGES.PASSWORD);
      return;
    }
  
    const foundUser = await checkUser(email, password);

    if (!foundUser) {
      console.warn(ERROR_MESSAGES.LOGIN);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Button
          title="Valider"
          onPress={handleSubmit}
        />
      </View>
      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate('Inscription')}
      />
    </View>
  );
};

const InscriptionScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [local, setLocal] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleNomChange = (text) => {
    setNom(text);
  };
  const handlePrenomChange = (text) => {
    setPrenom(text);
  };

  const handleLocalChange = (text) => {
    setLocal(text);
  };

  const createUser = async (user) => {
try {
const response = await fetch(API_URL2, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(user)
});
const createdUser = await response.json();
return createdUser;
} catch (error) {
console.error('Erreur lors de la création de l utilisateur :', error);
Alert.alert("Erreur lors de l'inscription.");
return null;
}
};

const handleSubmit = async () => {
if (!isValidEmail(email)) {
Alert.alert(ERROR_MESSAGES.EMAIL);
return;
}



if (!isValidPassword(password)) {
  Alert.alert(ERROR_MESSAGES.PASSWORD);
  return;
}

const user = {
  nom: nom,
  prenom: prenom,
  local: local,
  email: email,
  password: password
};
console.log(user);
const createdUser = await createUser(user);

if (createdUser) {
  Alert.alert("Inscription réussie !");
  navigation.navigate('Page2', { name: createdUser.nom });
} else {
  console.warn("Erreur lors de l'inscription.");
}

};

return (
<View style={styles.container}>
<View style={styles.inputContainer}>
<TextInput
       style={styles.input}
       placeholder="Nom"
       value={nom}
       onChangeText={handleNomChange}
     />
     <TextInput
       style={styles.input}
       placeholder="Prenom"
       value={prenom}
       onChangeText={handlePrenomChange}
     />
     <TextInput
       style={styles.input}
       placeholder="Localisation"
       value={local}
       onChangeText={handleLocalChange}
     />
<TextInput
       style={styles.input}
       placeholder="Adresse e-mail"
       keyboardType="email-address"
       value={email}
       onChangeText={handleEmailChange}
     />
<TextInput
       style={styles.input}
       placeholder="Mot de passe"
       secureTextEntry={true}
       value={password}
       onChangeText={handlePasswordChange}
     />

<Button
       title="S'inscrire"
       onPress={handleSubmit}
     />
</View>
<Button
title="Retour"
onPress={() => navigation.goBack()}
/>
</View>
);
};

const Page2Screen = ({ navigation, route }) => {
return (
<View style={styles.container}>
<Text>Bienvenue, {route.params.name} !</Text>
<Button
title="Se déconnecter"
onPress={() => navigation.goBack()}
/>
</View>
);
};

const App = () => {
return (
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen
name="Connexion"
component={LoginScreen}
options={{ title: 'Connexion' }}
/>
<Stack.Screen
name="Inscription"
component={InscriptionScreen}
options={{ title: 'Inscription' }}
/>
<Stack.Screen
name="Page2"
component={Page2Screen}
options={{ title: 'Page 2' }}
/>
</Stack.Navigator>
</NavigationContainer>
);
};

export default App;
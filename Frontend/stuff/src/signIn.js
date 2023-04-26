import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import { SafeAreaView, View, Text, Image, ScrollView, TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './style';

const Stack = createNativeStackNavigator();
const API_URL = "https://81c4-91-205-43-234.ngrok-free.app/api/customers/sign";

const MyComponent = () => {

const [nom, setNom] = useState('');
const [prenom, setPrenom] = useState('');
const [local, setLocal] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleNomChange = (text) => {
setNom(text);
};
const handlePrenomChange = (text) => {
setPrenom(text);
};
const handleLocalChange = (text) => {
setLocal(text);
};

const handleEmailChange = (text) => {
setEmail(text);
};

const handlePasswordChange = (text) => {
setPassword(text);
};

function addUser(nom, prenom, local, email, password) {
const userData = {
nom: nom,
prenom: prenom,
local: local,
email: email,
password: password
};


fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
})
.then(response => response.json())
.then(data => console.log("Utilisateur ajouté:", data))
.catch(error => {
  console.error("Erreur lors de l'ajout de l'utilisateur :", error);
  console.log("Reponse serveur :", error.response);
})};

const handleButtonClick = () => {

const user = { nom, prenom, local, email, password };
console.log('Utilisateur :', user);
addUser(nom, prenom, local, email, password);
};

return (
<View style={styles.container}>
<View style={styles.inputContainer}>
<TextInput
       style={styles.input}
       placeholder="nom"
       value={nom}
       onChangeText={handleNomChange}
     />
<TextInput
       style={styles.input}
       placeholder="prenom"
       value={prenom}
       onChangeText={handlePrenomChange}
     />
<TextInput
       style={styles.input}
       placeholder="local"
       value={local}
       onChangeText={handleLocalChange}
     />
<TextInput
       style={styles.input}
       placeholder="email"
       value={email}
       onChangeText={handleEmailChange}
     />
<TextInput
       style={styles.input}
       placeholder="mot de passe"
       secureTextEntry={true}
       value={password}
       onChangeText={handlePasswordChange}
     />
<Button
       title="Valider"
       onPress={handleButtonClick}
     />
</View>
</View>
);
};

export default MyComponent;
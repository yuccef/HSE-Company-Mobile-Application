/**Import parametres*/
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { sha256 } from 'js-sha256';
import { styles } from './../../Styles/Styles';


let nomm, prenomm;

/**URLs of Databases */
const API_URL = "https://bbf0-185-109-254-166.ngrok-free.app/api/worker";


/**ERRORS*/
const ERROR_MESSAGES = {
  EMAIL: "Veuillez entrer une adresse e-mail valide.",
  PASSWORD: "Le mot de passe doit contenir au moins 6 caractères.",
  LOGIN: "Adresse e-mail ou mot de passe incorrect."
};

/**Verification of valide email */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**Verificate the leght of password (>6) */
const isValidPassword = (password) => {
  return password.length >= 6;
};

/**LoginScreen Class where we put our email and Password  */
const LoginScreen = ({ navigation }) => {

  /**Parametres*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  /**Initialize email*/
  const handleEmailChange = (text) => { 
    setEmail(text);
  };

  /**Initialize email*/
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  

  
  /**The function to  Verify if this email and password exist in the DataBase (on the server created in Backend) */
  const checkUser = async (email, password) => {
    try {
      const response = await fetch(API_URL);
      const users = await response.json();
      const foundUser = users.find(
        (user) => user.email === email && user.password === sha256(password).toString()
      );/**The verification is here */
      /**if it's TRUE, we navigate to another page */
      if (foundUser) {
        nomm = foundUser.nom;
        prenomm = foundUser.prenom;
        navigation.navigate('MyTabs');
      }
      /**if not, return Alert */
      else {
        Alert.alert(ERROR_MESSAGES.LOGIN);
      }
      console.log(foundUser);
      console.log(nomm);
      return foundUser;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur :', error);
      Alert.alert(ERROR_MESSAGES.LOGIN);
      return null;
    }
  };
  
  /** While Submitting */
  const handleSubmit = async () => {
    /**Verify email */
    if (!isValidEmail(email)) {
      Alert.alert(ERROR_MESSAGES.EMAIL);
      return;
    }
  
    /**Verify password */
    if (!isValidPassword(password)) {
      Alert.alert(ERROR_MESSAGES.PASSWORD);
      return;
    }
  
    /**Calculate password hash */


    /**Check the existence of this Data */
    const foundUser = await checkUser(email, password);
  
    /**Error case */
    if (!foundUser) {
      console.warn(ERROR_MESSAGES.LOGIN);
    }
  };
  

  /**Style and Front (page) */
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputt}
          placeholder="Adresse e-mail"
          keyboardType="email-address"

          /**Initialize  email */
          value={email}
          onChangeText={handleEmailChange}
        />
        
        <TextInput
          style={styles.inputt}
          placeholder="Mot de passe"
          secureTextEntry={true}
          
          /**Initialize  password */
          value={password}
          onChangeText={handlePasswordChange}
        />

        <Button
          /*Button of *Submit */
          title="Valider"
          onPress={handleSubmit}
        />
      </View>
      
      <Button
        /**Button to navigate to the page wehre we can do our inscription  */
        title="S'inscrire"
        onPress={() => navigation.navigate('Inscription')}
      />
    </View>
  );
};



export default LoginScreen;
export { nomm };
export { prenomm };
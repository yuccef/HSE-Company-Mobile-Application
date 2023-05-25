/**Import parametres*/
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { sha256 } from 'js-sha256';
import { styles } from './../../Styles/Styles';
/**URLs of Databases (workers) */
const API_URL = "https://bbf0-185-109-254-166.ngrok-free.app/api/worker";



/**Verificate if the email is valide */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


/**Verificate the leght of password (>6) */
const isValidPassword = (password) => {
  return password.length >= 6;
};

/**InscriptionScreen  Class where we do our inscription  */
const InscriptionScreen = ({ navigation }) => {
    /**Parametres */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [local, setLocal] = useState('');
  
    /**Intialize email */
    const handleEmailChange = (text) => {
      setEmail(text);
    };
  
    /**Intialize Password */
    const handlePasswordChange = (text) => {
      setPassword(text);
    };
  
    /**Intialize first name */
    const handleNomChange = (text) => {
      setNom(text);
    };
  
    /**Intialize last name */
    const handlePrenomChange = (text) => {
      setPrenom(text);
    };
  
    /**Intialize lacal */
    const handleLocalChange = (text) => {
      setLocal(text);
    };
  
    /**Create User by adding this data on the server using the option POST */
    const createUser = async (user) => {
      try {
      const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)  /**the body or the data to push is "user" */
      });
  
  
      const createdUser = await response.json();
      return createdUser;
  
      /**Error Case */
      } catch (error) {
      console.error('Erreur lors de la création de l utilisateur :', error);
      Alert.alert("Erreur lors de l'inscription.");
      return null;
      }
    };
  
   

  /**While Submiting */
    const handleSubmit = async () => {
  
      /**Verificate email */
      if (!isValidEmail(email)) {
      Alert.alert(ERROR_MESSAGES.EMAIL);
      return;
      }
  
      /**Verificate Password */
      if (!isValidPassword(password)) {
        Alert.alert(ERROR_MESSAGES.PASSWORD);
        return;
      }
  
      /**Initialize the new user  */
      const user = {
        nom: nom,
        prenom: prenom,
        local: local,
        email: email,
        password: sha256(password).toString()
      };
  
      console.log(user);
  
      /**Add the new user at the DataBase */
      const createdUser = await createUser(user);
  
      /**if DONE navigate to page 2 */
      if (createdUser) {
        Alert.alert("Inscription réussie !");
        navigation.navigate('LoginEmploye')
      /**if  note ERROR*/
      } else {
        console.warn("Erreur lors de l'inscription.");
      }
    };
  
    /**Style and Front (page) */
  
    return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>
    <TextInput
          style={styles.inputt}
          placeholder="Nom"
          value={nom}
          onChangeText={handleNomChange}
        />
        <TextInput
          style={styles.inputt}
          placeholder="Prenom"
          value={prenom}
          onChangeText={handlePrenomChange}
        />
        <TextInput
          style={styles.inputt}
          placeholder="Localisation"
          value={local}
          onChangeText={handleLocalChange}
        />
    <TextInput
          style={styles.inputt}
          placeholder="Adresse e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={handleEmailChange}
        />
    <TextInput
          style={styles.inputt}
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

export default InscriptionScreen;

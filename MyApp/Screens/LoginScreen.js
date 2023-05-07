
/**Import parametres*/
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../style';
import MyTabs from '../MyTabs';


const Stack = createNativeStackNavigator();

let nomm;


/**URLs of Databases */
const API_URL = "https://60c5-91-205-43-215.ngrok-free.app/api/customers";
const API_URL2 = "https://60c5-91-205-43-215.ngrok-free.app/api/customers/sign";
const API_URL3 = "https://60c5-91-205-43-215.ngrok-free.app/api/pictures";




/**ERRORs*/
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



  /**The function to  Verify if this email and password exist in the DataBase( on the server created in Backend) */
  const checkUser = async (email, password) => {
    
    try {
      const response = await fetch(API_URL);
      const users = await response.json();
      const foundUser = users.find(user => user.email === email && user.password === password);/**The verificaton is here  */
      /**if its TRUE we navigate to an other page*/
      if (foundUser) {
        nomm= foundUser.nom;
        navigation.navigate('MyTabs')
            }
      /**if not return Alert*/
      else {
        Alert.alert(ERROR_MESSAGES.LOGIN);
      }
      console.log(foundUser);
      console.log(nomm);


      return foundUser;


      /** Catching Errors */
    } catch (error) {
      console.error('Erreur lors de la vérification de l utilisateur :', error);
      Alert.alert(ERROR_MESSAGES.LOGIN);
      return null;
    }
  };


  
  /** While Submiting */
  const handleSubmit = async () => {

    /**Verificate email */
    if (!isValidEmail(email)) {
      Alert.alert(ERROR_MESSAGES.EMAIL);
      return;
    }

   /**Verificate password */
    if (!isValidPassword(password)) {
      Alert.alert(ERROR_MESSAGES.PASSWORD);
      return;
    }
  
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
          style={styles.input}
          placeholder="Adresse e-mail"
          keyboardType="email-address"

          /**Initialize  email */
          value={email}
          onChangeText={handleEmailChange}
        />
        
        <TextInput
          style={styles.input}
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

LoginScreen.options = {
  headerShown: false
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
            const response = await fetch(API_URL2, {
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
            password: password
          };

          console.log(user);

          /**Add the new user at the DataBase */
          const createdUser = await createUser(user);

          /**if DONE navigate to page 2 */
          if (createdUser) {
            Alert.alert("Inscription réussie !");
            navigation.navigate('MyTabs')
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
InscriptionScreen.options = {
  headerShown: false
};






/**main Class (SCREENS) */


function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

export { nomm };
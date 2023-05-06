import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Keyboard} from 'react-native';

import {styles} from '../Styles'


import { Camera } from 'expo-camera';
import * as Permissions from 'expo-camera';
import * as Media_permission from 'expo-media-library'
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';


const SERVER_URL = 'http://192.168.1.188:5005/'

let photouri = null;
let photo_global = null;


export class Mycamera extends React.Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Initialisation des états
  state = {
    cameraPermission: null,
    takePicture: false,
    isPictureTaken: false,
    isPictureLoaded: false,
  };

  // Méthode :

  // Demande des permissions
  componentDidMount() {
    Permissions.requestCameraPermissionsAsync()
      .then(({ status }) =>
        this.setState({
          cameraPermission: status === 'granted'
        })
      );
    Media_permission.requestPermissionsAsync()
      .then(({ status }) =>
        this.setState({
          mediaPermission: status === 'granted'
        })
      );
  }

  // Changement d'état après avoir pris une photo
  takePicture = () => {
    this.setState({ takePicture: true });
  }

  // Envoi du signalement
  sendReport = () => {
    console.log('Input value:', this.state.inputValue);
    this.uploadReport()
      .then(() => console.log('Report uploaded successfully'))
      .catch((error) => console.log('Error uploading report: ', error));
    this.props.navigation.navigate('MyTabs');
  };

  // Upload sur le serveur le signalement
  uploadReport =  () => {
    return fetch(SERVER_URL, {
      body: JSON.stringify({
        comment: this.state.inputValue,
        image: photo_global.base64
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    //.then(response => response.json())            /!\ ME LOG UNE ERREUR CAR LE SERVEUR NE RENVOIE PAS UN JSON (NORMAL) /!\
  }

  // Récupère l'uri de la photo pour le placer dans la variable global afin qu'il soit accessible de partout dans le programme
  onPictureTaken = (photo) => {
    if (photo == null) return null;
    photouri = photo.uri;
    photo_global = photo;
    this.setState({ takePicture: false }); // i.e Retour à la page de signalement de risque
    this.setState({ isPictureTaken: true}); // i.e Appel de dispLink
  }

  // Affichage du "lien" vers l'image prise
  dispLink =() => {
  return (
    <TouchableOpacity style={styles.goto_image} onPress={() => {this.props.navigation.navigate('Photo', { photouri: photouri });}}>
      <EvilIcons style={{alignSelf: 'center', top: 40}}name="image" size={200} color="#bbb" />
      <Text style={styles.text_goto_image}>Cliquez ici pour voir l'image...</Text>
    </TouchableOpacity>
  )};

  // Ferme le clavier 
  handlePress = () => {
    Keyboard.dismiss();
  };

  // Gestion de l'input commentaire
  handleInputChange(text) {
    console.log(text);
    this.setState({ inputValue: text });
  }

  // Mise en page
  render() {
    const { cameraPermission, takePicture, isPictureTaken, inputValue } = this.state;
    return (
      // Demande de permission d'accés à la camera
      <View style={styles.container_camera}>
        {cameraPermission === null ? (
          <Text>En attente de la permission...</Text>
        ) : cameraPermission === false ? (
          <Text>
            La permission pour la caméra n'est pas accordée. Veuillez aller dans les paramètres de votre téléphone pour l'activer.
          </Text>
        // Si permission accordée :
        ) : (
          <View style={{ flex: 1, width: '100%' }}>
            {/* Affichage de la caméra */}
            {takePicture ? (
              <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                ref={cam => this.camera = cam}
              >
                {/* Bouton qui prend la photo */}
                <TouchableOpacity
                  style={styles.button_camera}
                  onPress={() => this.camera.takePictureAsync({
                    quality: 0.1,
                    base64: true,
                    exif: false
                  }).then(this.onPictureTaken)}
                >
                  <View style={styles.button_camera_round} />
                </TouchableOpacity>
              </Camera>
            ) : (
              // Mettre tout l'écran en "bouton" pour que le clavier s'enlève lorsqu'on appuie dessus
              <TouchableOpacity style={{position:'absolute', width:'100%', height: '100%'}} onPress={this.handlePress}>
                {/* Input pour l'envoie du commentaire */}
                <TextInput
                style={styles.input_risk}
                placeholder="Ajouter un commentaire..."
                multiline
                value={inputValue}
                inputMode='text'
                onChangeText={this.handleInputChange}
                />
                <View>
                  {isPictureTaken ?( 
                    <View>{this.dispLink()}</View>) : ( <View></View>
                    )}</View>
                {/* Bouton qui emmène vers la caméra */}
                <TouchableOpacity
                  style={styles.button_goto_camera}
                  onPress={this.takePicture}
                >
                  <MaterialIcons name="add-a-photo" size={54} color="white" />
                </TouchableOpacity>
                {/* Séparateur entre la page et le bouton d'envoie */}
                <View style={{
                  width: '100%', height : 1, backgroundColor: '#bbb',
                  position:'absolute',
                  bottom: 100,}}
                />
                {/* Bouton d'envoie */}
                <TouchableOpacity
                  style={styles.button_send_report}
                  onPress={this.sendReport}
                >
                  <Text style={styles.text_button_goto_camera}>Envoyer le signalement</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
}


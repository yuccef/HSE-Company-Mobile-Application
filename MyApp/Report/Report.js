  import React, {useState} from 'react';
  import {Text, View, TouchableOpacity, TextInput, Keyboard} from 'react-native';
  import {Picker} from '@react-native-picker/picker';

  import {styles} from '../Styles'


  import { Camera } from 'expo-camera';
  import * as Permissions from 'expo-camera';
  import * as Media_permission from 'expo-media-library'
  import { MaterialIcons, EvilIcons } from '@expo/vector-icons';

  import { nomm } from '../Screens/LoginScreen';
  import { prenomm } from '../Screens/LoginScreen';

  const SERVER_URL = 'https://59fa-37-170-28-157.ngrok-free.app/api/pictures'
  const SERVER_URL_COMMENTS = 'https://59fa-37-170-28-157.ngrok-free.app/api/worker/comments';


  let photouri = null;
  let photo_global = null;


  export class Mycamera extends React.Component {


    // Initialisation des états
    state = {
      cameraPermission: null,
      takePicture: false,
      isPictureTaken: false,
      isPictureLoaded: false,
      comment :'',
      categorie:'',

    };



    //////////////// PICTURE /////////////////////////
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
    setSelectedValue = (value) => {
      this.setState({ selectedValue: value });
    }

    // Récupère l'uri de la photo pour le placer dans la variable global afin qu'il soit accessible de partout dans le programme
    onPictureTaken = (photo) => {
      if (photo == null) return null;
      photouri = photo.uri;
      photo_global = photo;
      this.setState({ takePicture: false }); // i.e Retour à la page de signalement de risque
      this.setState({ isPictureTaken: true}); // i.e Appel de dispLink
    }



      // Récupère l'uri de la photo pour le placer dans la variable global afin qu'il soit accessible de partout dans le programme
      onPictureTaken = (photo) => {
        if (photo == null) return null;
        photouri = photo.uri;
        photo_global = photo;
        this.setState({ takePicture: false }); // i.e Retour à la page de signalement de risque
        this.setState({ isPictureTaken: true}); // i.e Appel de dispLink
      }

      

    // Envoi du signalement
    sendReport = async () => {
      console.log('Comment', this.state.comment);
      console.log('categorie', this.state.categorie);

      await this.uploadReport();
      this.handleSubmit();
      this.setSelectedValue();
      this.props.navigation.navigate('MyTabs');
    };
    
    // Upload sur le serveur le signalement
    uploadReport =  () => {
      return fetch(SERVER_URL, {
        body: JSON.stringify({
          image: photo_global
        }),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      
    //.then(response => response.json())            /!\ ME LOG UNE ERREUR CAR LE SERVEUR NE RENVOIE PAS UN JSON (NORMAL) /!\
    }



    // Ferme le clavier 
    handlePress = () => {
      Keyboard.dismiss();
    };





  // Gestion de l'input commentaire
  handleCommentChange = (comment) => {
    console.log(comment);
    this.setState({ comment });
  };

  handleCategorieChange = (categorie) => {
    console.log(categorie);
    this.setState({ categorie });
  };
      
  handleSubmit = () => {
    const  commentt = this.state.comment;
    const categoriee = this.state.categorie;
    const data = {
      nom: nomm,
      prenom:prenomm,
      comment: commentt,
      categorie: categoriee,
    };
    fetch(SERVER_URL_COMMENTS, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(() => console.log('Comment uploaded successfully'))
      .catch((error) => console.log('Error uploading comment: ', error));
  };




    // Affichage du "lien" vers l'image prise
    dispLink =() => {
      return (
        <TouchableOpacity style={styles.goto_image} onPress={() => {this.props.navigation.navigate('Photo', { photouri: photouri });}}>
          <EvilIcons style={{alignSelf: 'center', top: 10}}name="image" size={200} color="#bbb" />
          <Text style={styles.text_goto_image}>Cliquez ici pour voir l'image...</Text>
        </TouchableOpacity>
      )};
    
    // Mise en page
    render() {
      const { cameraPermission, takePicture, isPictureTaken, comment , selectedValue } = this.state;
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
                      exif: false
                    }).then(this.onPictureTaken)}
                  >
                    <View style={styles.button_camera_round} />
                  </TouchableOpacity>
                </Camera>
              ) : (
                // Mettre tout l'écran en "bouton" pour que le clavier s'enlève lorsqu'on appuie dessus
                <TouchableOpacity style={{position:'absolute', width:'100%', height: '100%'}} onPress={this.handlePress}>


<View>
<Picker
  selectedValue={this.state.categorie}
  onValueChange={(itemValue, itemIndex) => this.setState({ categorie: itemValue })}
>
                    <Picker.Item label="Risque physique" value="Risque physique" />
                    <Picker.Item label="Risque chimique" value="Risque chimique" />
                    <Picker.Item label="Risque biologique" value="Risque biologique" />
                    <Picker.Item label="Risque psychosociaux" value="Risque psychosociaux" />
                    <Picker.Item label="Risque lié à l'organisation du travail" value="Risque lié à l'organisation du travail" />
                    <Picker.Item label="Risque lié à l'environnement de travail" value="Risque lié à l'environnement de travail" />
                    <Picker.Item label="Autre précisez..." value="Autre" />
                  </Picker>
                </View>

                  {/* Input pour l'envoie du commentaire */}
                  <TextInput
                  style={styles.input_risk}
                  placeholder="Ajouter un commentaire..."
                  multiline
                  value={comment}
                  inputMode='text'
                  onChangeText={this.handleCommentChange}
                

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
                    bottom: 80,}}
                  />
                  {/* Bouton d'envoie */}
                  <TouchableOpacity 
    style={styles.button_send_report}
    onPress={this.sendReport}>

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


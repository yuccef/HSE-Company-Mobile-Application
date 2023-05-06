import React from 'react';
import {Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import {styles} from '../Styles'

// add this:
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-camera';

const PHOTO_INTERVAL = 5000;
const FOCUS_TIME = 3000;
const SERVER_URL = 'http://192.168.1.188:5005/'

export class Mycamera extends React.Component {
  // initialize state
  state = {
    cameraPermission: null,
    takePicture: false
  };

  // Demande la permission d'utiliser la caméra
  componentDidMount() {
    Permissions.requestCameraPermissionsAsync()
      .then(({ status }) =>
        this.setState({
          cameraPermission: status === 'granted'
        })
      );
  }

  takePicture = () => {
    this.setState({ takePicture: true });
  }

  uploadPicture = (photo) => {
    return fetch(SERVER_URL, {
      body: JSON.stringify({
        image: photo.base64
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
  }

  onPictureTaken = (photo) => {
    this.setState({ takePicture: false });
    this.uploadPicture(photo)
      .then(() => console.log('Picture uploaded successfully'))
      .catch((error) => console.log('Error uploading picture: ', error));
  }

  handlePress = () => {
    Keyboard.dismiss();
  };

  render() {
    const { cameraPermission, takePicture } = this.state;
    return (
      <View style={styles.container_camera}>
        {cameraPermission === null ? (
          <Text>Waiting for permission...</Text>
        ) : cameraPermission === false ? (
          <Text>Permission denied</Text>
        ) : (
          <View style={{ flex: 1, width: '100%' }}>
            {takePicture ? (
              <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                ref={cam => this.camera = cam}
                onPictureTaken={this.onPictureTaken}
              >
                
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
              <TouchableOpacity style={{position:'absolute', width:'100%', height: '100%'}} onPress={this.handlePress}>
                <TextInput
                style={styles.input_risk}
                placeholder="Ajouter un commentaire..."
                multiline
                inputMode='text'
              />
                <TouchableOpacity
                  style={styles.button_goto_camera}
                  onPress={this.takePicture}
                >
                  <Text style={styles.text_button_goto_camera}>Prendre en photo le risque</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
}


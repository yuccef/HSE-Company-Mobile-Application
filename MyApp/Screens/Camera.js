import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { styles } from '../Styles';
import { nomm } from './LoginScreen';

const SERVER_URL = 'https://4952-147-94-135-30.ngrok-free.app/api/pictures';
const SERVER_URL_COMMENTS = 'https://4952-147-94-135-30.ngrok-free.app/api/worker/comments';

export default function MyCamera() {

const [cameraPermission, setCameraPermission] = useState(null);
const [takePicture, setTakePicture] = useState(false);



//const [comment, setComment] = useState('');


const handlePress = () => {
Keyboard.dismiss();
};


const handleCommentChange = (comment) => {
setComment(comment);
};

const handleSubmit = () => {

const data = {
nom: nomm,
comment: handleCommentChange(),
};
fetch(SERVER_URL_COMMENTS, {
body: JSON.stringify(data),
headers: {
'content-type': 'application/json',
},
method: 'POST',
})
.then((response) => response.json())
.then(() => console.log('Comment uploaded successfully'))
.catch((error) => console.log('Error uploading comment: ', error));
};



useEffect(() => {
Permissions.requestCameraPermissionsAsync().then(({ status }) => {
setCameraPermission(status === 'granted');
});
}, []);

const uploadPicture = async (photo) => {
const response = await fetch(SERVER_URL, {
body: JSON.stringify({
image: photo.base64,
}),
headers: {
'content-type': 'application/json',
},
method: 'POST',
});
return response.json();
};

const onPictureTaken = async (photo) => {
const response = await uploadPicture(photo);
const imageId = response.imageId;
//const fileName = ${nomm}.jpg;
const data = {
image: photo.base64,
//fileName: fileName,
};
setTakePicture(false);
fetch(SERVER_URL, {
body: JSON.stringify(data),
headers: {
'content-type': 'application/json',
},
method: 'POST',
})
.then((response) => response.json())
.then(() => console.log('Picture uploaded successfully'))
.catch((error) => console.log('Error uploading picture: ', error));
};

const handleTakePicture = async () => {
if (cameraPermission) {
setTakePicture(true);
} else {
console.log('Camera permission not granted');
}
};

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
ref={(ref) => {
this.camera = ref;
}}
onPictureTaken={onPictureTaken}
>
<TouchableOpacity style={styles.button_camera} onPress={() => this.camera.takePictureAsync({ quality: 0.1, base64: true, exif: false })}>
<Text style={styles.text_camera}>Take picture</Text>
</TouchableOpacity>
</Camera>
) : (
<View style={{ flex: 1 }}>
<TextInput
style={styles.input_comment}
placeholder="Add a comment..."
onChangeText={handleCommentChange}
onSubmitEditing={handleSubmit}
value={comment}
/>
<TouchableOpacity style={styles.button_camera} onPress={handleTakePicture}>
<Text style={styles.text_camera}>Take picture</Text>
</TouchableOpacity>
</View>
)}
</View>
)}
</View>
);
}
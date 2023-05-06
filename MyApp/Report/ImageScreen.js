import React from 'react';
import {View, Image } from 'react-native';


export class ImageScreen extends React.Component {
  render() {
    const photouri = this.props.route.params.photouri;
    return (
      <View style={{ position:'absolute', flex: 1}}>
        <Image source={{ uri: photouri }}
        style={{ width: 390, height: 753 }} />
      </View>
    );
  }
}
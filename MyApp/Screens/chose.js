import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChoseScreen({ navigation }) {
  const handleAdminPress = () => {
    navigation.navigate('Login', { userType: 'admin' });
  };

  const handleWorkerPress = () => {
    navigation.navigate('Login', { userType: 'worker' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.adminButton} onPress={handleAdminPress}>
        <Text style={styles.buttonText}>Administrateur</Text>
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <TouchableOpacity style={styles.workerButton} onPress={handleWorkerPress}>
        <Text style={styles.buttonText}>Ouvrier</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  adminButton: {
    backgroundColor: '#2196f3',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  workerButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc',
    width: '80%',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

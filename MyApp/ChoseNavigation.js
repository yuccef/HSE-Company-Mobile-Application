import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChoseScreen({ navigation }) {
  const handleAdminPress = () => {
    navigation.navigate('LoginAdmin', { userType: 'admin' });
  };

  const handleWorkerPress = () => {
    navigation.navigate('LoginEmploye', { userType: 'worker' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.adminButton} onPress={handleAdminPress}>
        <Text style={styles.buttonText}>Administrateur</Text>
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <TouchableOpacity style={styles.workerButton} onPress={handleWorkerPress}>
        <Text style={styles.buttonText}>Employé</Text>
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
    backgroundColor: '#663399',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 10,
  },
  workerButton: {
    backgroundColor: '#008b8b',
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc',
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

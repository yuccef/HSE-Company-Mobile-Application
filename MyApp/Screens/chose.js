import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ChooseScreen({ navigation }) {
const handleAdminPress = () => {
navigation.navigate('Login', { userType: 'admin' });
};

const handleWorkerPress = () => {
navigation.navigate('Login', { userType: 'worker' });
};

return (
<View style={styles.container}>
<Text style={styles.title}>Choose Your Role</Text>
<View style={styles.buttonsContainer}>
<Button
       title="Admin"
       onPress={handleAdminPress}
       color="#2ECC71"
       style={styles.button}
     />
<Button
       title="Worker"
       onPress={handleWorkerPress}
       color="#3498DB"
       style={styles.button}
     />
</View>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#FFFFFF',
alignItems: 'center',
justifyContent: 'center',
},
title: {
fontSize: 28,
fontWeight: 'bold',
marginBottom: 40,
},
buttonsContainer: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
marginBottom: 20,
},
button: {
marginHorizontal: 10,
},
});
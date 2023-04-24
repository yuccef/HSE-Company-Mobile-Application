import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [showPageTwo, setShowPageTwo] = useState(false);

  const handleSubmit = () => {
    setShowPageTwo(true);
  };

  return (
    <View style={styles.container}>
      {showPageTwo ? (
        <View style={styles.pageTwo}>
          <Text style={styles.pageTwoText}>Page Two</Text>
        </View>
      ) : (
        <View style={styles.pageOne}>
          <TextInput
            style={styles.input}
            onChangeText={text => setInputValue(text)}
            value={inputValue}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageOne: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageTwo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTwoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

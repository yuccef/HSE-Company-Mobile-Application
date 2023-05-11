import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput , Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = "https://bbf0-185-109-254-166.ngrok-free.app/api/admin/answers";
import { nomm } from './LoginAdminScreen';
import { prenomm } from './LoginAdminScreen';
const OldReportScreen = ({ navigation }) => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('https://bbf0-185-109-254-166.ngrok-free.app/api/worker/report')
      .then(response => response.json())
      .then(data => setReportData(data))
      .catch(error => console.log(error));
  }, []);

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const handleCommentChange = (text) => {
    setNewComment(text);
  };

  const handleSendComment = (report) => {
    // envoyer le commentaire
    console.log("Envoyer le commentaire:", newComment, " pour le signalement: ", report);
    // remettre l'état initial
    setExpandedIndex(null);
    setNewComment("");
    const reportanswer = {
      nom: nomm,
      prenom: prenomm,
      answer: newComment,
      état: report.checked,
    };
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportanswer)  /**the body or the data to push is "user" */
    }).then(() => {
      // remove the report from the reportData array
      const updatedReportData = [...reportData];
      updatedReportData.splice(updatedReportData.indexOf(report), 1);
      setReportData(updatedReportData);
    });

  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A148C', '#7E57C2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.title}>Les signalements en attente de traitement :</Text>
      </LinearGradient>
      <ScrollView style={styles.scrollContainer}>
        {reportData.map((report, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.reportContainer,
              expandedIndex === index ? styles.expandedReportContainer : null,
            ]}
            onPress={() => handleExpand(index)}
          >
            <Text style={styles.reportName}>{report.nom} {report.prenom} </Text>
            <Text style={styles.reportCategorie}>{report.categorie}</Text>
            <Text style={styles.reportComment}>{report.comment}</Text>
            {report.image && report.image.uri && (
            <Image
              source={{ uri: report.image.uri }}
              style={{ width: '100%', height: 300 }}
            />
            )}
            {console.log(report.image)}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  report.checked ? styles.checkedButton : null,
                ]}
                onPress={() => {
                  const updatedReportData = [...reportData];
                  updatedReportData[index] = {
                    ...report,
                    checked: true,
                  };
                  setReportData(updatedReportData);
                }}
              >
                <Text style ={styles.buttonText}>
{report.checked ? "Terminé" : "En cours"}
</Text>
</TouchableOpacity>
{expandedIndex === index && (
<View style={styles.commentContainer}>
<TextInput
                 style={styles.commentInput}
                 placeholder="Ajouter un commentaire"
                 value={newComment}
                 onChangeText={handleCommentChange}
               />
<TouchableOpacity
style={styles.sendButton}
onPress={() => handleSendComment(report)}
>
<Text style={styles.sendButtonText}>Envoyer</Text>
</TouchableOpacity>
</View>
)}
</View>
</TouchableOpacity>
))}
</ScrollView>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
header: {
paddingTop: 60,
paddingBottom: 30,
paddingHorizontal: 20,
marginBottom: 20,
},
title: {
fontSize: 24,
fontWeight: "bold",
color: "white",
},
scrollContainer: {
paddingHorizontal: 20,
},
reportContainer: {
paddingVertical: 10,
borderBottomWidth: 1,
borderBottomColor: "lightgrey",
},
expandedReportContainer: {
borderBottomWidth: 0,
},
reportName: {
fontSize: 20,
fontWeight: "bold",
marginBottom: 5,
},
reportCategorie: {
fontStyle: "italic",
color: "#555",
},
buttonsContainer: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
marginTop: 10,
},
button: {
paddingHorizontal: 15,
paddingVertical: 5,
borderRadius: 5,
backgroundColor: "#f0f0f0",
},
checkedButton: {
backgroundColor: "#9ccc65",
},
buttonText: {
color: "#555",
fontWeight: "bold",
},
commentContainer: {
marginTop: 10,
},
commentInput: {
height: 40,
borderColor: "gray",
borderWidth: 1,
borderRadius: 5,
paddingHorizontal: 10,
marginBottom: 5,
},
sendButton: {
backgroundColor: "#4A148C",
paddingVertical: 5,
paddingHorizontal: 10,
borderRadius: 5,
},
sendButtonText: {
color: "white",
fontWeight: "bold",
},
});

export default OldReportScreen;
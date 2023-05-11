import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const API_URL = "https://bbf0-185-109-254-166.ngrok-free.app/api/admin/answers";
import { nomm } from './LoginAdminScreen';
import { prenomm } from './LoginAdminScreen';




const OldReportScreen = () => {
const [reportData, setReportData] = useState([]);

useEffect(() => {
fetch('https://bbf0-185-109-254-166.ngrok-free.app/api/worker/comments')
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
  }
  fetch(API_URL, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(reportanswer)  /**the body or the data to push is "user" */
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
{expandedIndex === index ? (
<View>
<Text style={styles.reportComment}>{report.comment}</Text>
<TextInput
               placeholder="Ajouter un commentaire"
               style={styles.commentInput}
               onChangeText={handleCommentChange}
               value={newComment}
             />
<TouchableOpacity
style={styles.sendButton}
onPress={() => handleSendComment(report)}
>
<Text style={styles.sendButtonText}>Envoyer</Text>
</TouchableOpacity>
</View>
) : null}
</TouchableOpacity>
))}
</ScrollView>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  reportContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  reportName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4A148C',
  },
  reportCategorie: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#7E57C2',
  },
  reportComment: {
    fontSize: 16,
    color: '#555555',
  },
});

export default OldReportScreen;

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const API_URL = "https://bbf0-185-109-254-166.ngrok-free.app/api/admin/answers";
const REPORT_URL = "https://bbf0-185-109-254-166.ngrok-free.app/api/worker/report";

const OldReportScreen = () => {
  const [reportData, setReportData] = useState([]);
  const [reportData1, setReportData1] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(REPORT_URL)
      .then(response => response.json())
      .then(data => setReportData(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setReportData1(data))
      .catch(error => console.log(error));
  }, []);

  const handlePendingClick = () => {
    setIsPending(true);
  };

  const handleProcessedClick = () => {
    setIsPending(false);
  };

  const reportDataToDisplay = isPending ? reportData : reportData1;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isPending && styles.activeButton]}
          onPress={handlePendingClick}
        >
          <Text style={[styles.buttonText, isPending && styles.activeButtonText]}>
            Signalements en attente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isPending && styles.activeButton]}
          onPress={handleProcessedClick}
        >
          <Text style={[styles.buttonText, !isPending && styles.activeButtonText]}>
            Signalements traités
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {reportDataToDisplay.map((report, index) => (
          <View key={index} style={styles.reportContainer}>
            {isPending ? (
              <>
                <Text style={styles.reportName}>
                  {report.nom} {report.prenom}
                </Text>
                <Text style={styles.reportCategorie}>{report.categorie}</Text>
                <Text style={styles.reportComment}>{report.comment}</Text>
                {report.image && report.image.uri && (
                  <Image source={{ uri: report.image.uri }} style={{ width: '100%', height: 300 }} />
                )}
              </>
            ) : (
              <>
                <Text style={styles.reportName}>
                  Administrateur : {report.nom} {report.prenom}
                </Text>
                <Text style={styles.reportNameWorker}>
                  Ouvrier : {report.nomWroker} {report.prenomWorker}
                </Text>
                <Text style={styles.reportCategorie}>
                  Categorie : {report.categorieWorker}
                </Text>
                <Text style={styles.reportComment}>
                  Commentaire de l'Ouvrier :{report.commentWorker}
                </Text>
                <Text style={styles.reportComment}>Réponse de l'administrateur :{report.answer}</Text>
                <Text style={styles.reportComment}>Statut :Vérifié</Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>
      
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  paddingHorizontal: 20,
  paddingTop: 30,
  },
  buttonContainer:

  {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,
  },
  button: {
  paddingHorizontal: 20,
  paddingVertical: 10,
  backgroundColor: '#fff',
  borderRadius: 20,
  marginHorizontal: 10,
  },
  activeButton: {
  backgroundColor: '#6495ed',
  },
  
  buttonText: {
  color: '#778899',
  fontWeight: 'bold',
  },
  activeButtonText: {
  color: '#fff',
  },
  scrollContainer: {
  marginTop: 20,
  },
  reportContainer: {
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  },
  reportName: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 5,
  color: '#483d8b',
  },
  
  
  reportNameWorker: {
  fontWeight: 'bold',
  fontSize: 15,
  marginBottom: 5,
  color: '#6495ed',
  },
  reportCategorie: {
  fontWeight: 'bold',
  fontSize: 14,
  marginBottom: 5,
  color:'#8fbc8f',
  },
  reportComment: {
  fontSize: 14,
  marginTop: 5,
  },
  });
  
  export default OldReportScreen;
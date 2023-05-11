import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OldReportScreen = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('https://bbf0-185-109-254-166.ngrok-free.app/api/worker/report')
      .then(response => response.json())
      .then(data => setReportData(data))
      .catch(error => console.log(error));
  }, []);

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
                   <View key={index} style={styles.reportContainer}>
                   <Text style={styles.reportName}>{report.nom} {report.prenom}</Text>
            <Text style={styles.reportCategorie}>{report.categorie}</Text>
            <Text style={styles.reportComment}>{report.comment}</Text>
            {report.image && report.image.uri && (
            <Image
              source={{ uri: report.image.uri }}
              style={{ width: '100%', height: 300 }}
            />
            )}
            {console.log(report.image)}
          </View>
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

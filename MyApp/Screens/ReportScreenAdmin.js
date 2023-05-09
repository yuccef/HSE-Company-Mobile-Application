import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

const ReportScreenAdmin = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('https://59fa-37-170-28-157.ngrok-free.app/api/worker/comments')
      .then(response => response.json())
      .then(data => setReportData(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Les signalements en attente de traitement :</Text>
      <ScrollView>
        {reportData.map((report, index) => (
          <View style={styles.reportContainer} key={index}>
            <Text style={styles.reportName}>{report.nom}</Text>
            <Text style={styles.reportComment}>{report.comment}</Text>
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
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reportContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
  },
  reportName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reportComment: {
    fontSize: 16,
  },
});

export default ReportScreenAdmin;

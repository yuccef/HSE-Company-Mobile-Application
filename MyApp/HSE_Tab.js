import {SectionList, StyleSheet, Text, View} from 'react-native';
import {styles} from './Styles/Styles'
import React from 'react';

export default function HSE() {
      return (
        <View style={styles.container1}>
          <SectionList
            sections={[
              {title: 'Risques physiques',
               data: [
                'Bruit : mise en place de zones calmes, port de bouchons d oreilles, isolation acoustique des machines, limitation des durées d exposition', 
                'Vibration : choix de machines moins vibrantes, port de gants anti-vibrations, formation des travailleurs', 
                'TMS (troubles musculo-squelettiques) : ergonomie des postes de travail, formation des travailleurs, rotation des tâches',
                'Chaleur : ventilation, climatisation, boissons fraîches, pauses régulières'
              ]},
              {
                title: 'Risques chimiques ',
                data: [
                  'Manipulation de produits dangereux : port d équipements de protection individuelle (gants, masques, lunettes), stockage dans des locaux ventilés, formations et sensibilisation des travailleurs, mise en place de plans d urgence',
                  'Poussières : aspiration à la source, port de masques respiratoires, nettoyage régulier des locaux et des machines',
            
                ],
              },
              {
                title: 'Risques biologiques ',
                data: [
                  'Contact avec des agents pathogènes : port d équipements de protection individuelle, mise en place de mesures d hygiène (lavage des mains, désinfection des surfaces), formation des travailleurs',
                ],
              },
              {
                title: 'Risques psychosociaux ',
                data: [
                  'Stress : aménagement des horaires de travail, formation des managers à la gestion du stress, accompagnement des travailleurs en cas de surcharge de travail',
                  'Harcèlement : mise en place d une politique de tolérance zéro, formation des travailleurs et des managers, accompagnement des victimes',
                ],
              },
            ]}
            renderItem={({item}) => <Text style={styles.item1}>{item}</Text>}
            renderSectionHeader={({section}) => (
              <Text style={styles.sectionHeader1}>{section.title}</Text>
            )}
            keyExtractor={item => `basicListEntry-${item}`}
          />
        </View>
      );
    
  }

  


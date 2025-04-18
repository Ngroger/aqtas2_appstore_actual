// AccordionScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/AccordionScreenStyles';

function AccordionScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { topic } = route.params;

  const [openAccordionIndex, setOpenAccordionIndex] = useState(-1);

  const handleToggleAccordion = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const isAccordionOpen = (index) => openAccordionIndex === index;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          <Text style={styles.title}>{topic.topic}</Text>
        </TouchableOpacity>
        <View>
          {topic.questions.map((item, index) => (
            <View style={{ marginTop: 16 }} key={index}>
              <TouchableOpacity
                style={[
                  isAccordionOpen(index) ? styles.openAccordion : styles.accordion,
                ]}
                onPress={() => handleToggleAccordion(index)}
              >
                <Text style={styles.accordionText}>{item.question}</Text>
                <MaterialIcons
                  name={isAccordionOpen(index) ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              {isAccordionOpen(index) && (
                <View
                  style={[
                    styles.description,
                    isAccordionOpen(index) ? styles.descriptionOpen : null,
                  ]}
                >
                  <Text style={styles.accordionText}>{item.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AccordionScreen;

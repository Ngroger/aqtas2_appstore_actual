import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/faqScreenStyle';

function FaqScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const navigateToAccordion = (topic) => {
        navigation.navigate('Accordion', { topic });
    };

    const topics = [
        {
            topic: t('topic-one'),
            questions: [
                {
                    question: t('question-one'),
                    answer: t('answer-one'),
                },
                {
                    question: t('question-two-one'),
                    answer: t('answer-two-one'),
                },
            ],
        },
        {
            topic: t('topic-two'),
            questions: [
                {
                    question: t('question-two'),
                    answer: t('answer-two'),
                },
                {
                    question: t('question-two-two'),
                    answer: t('answer-two-two'),
                },
            ],
        },
        {
            topic: t('topic-three'),
            questions: [
                {
                    question: t('question-three'),
                    answer: t('answer-three'),
                },
                {
                    question: t('question-two-three'),
                    answer: t('answer-two-three'),
                },
            ],
        },
        {
            topic: t('topic-four'),
            questions: [
                {
                    question: t('question-four'),
                    answer: t('answer-four'),
                },
                {
                    question: t('question-two-four'),
                    answer: t('answer-two-four'),
                },
                {
                    question: t('question-three-four'),
                    answer: t('answer-three-four'),
                },
                {
                    question: t('question-four-four'),
                    answer: t('answer-four-four'),
                },
            ],
        },
        {
            topic: t('topic-five'),
            questions: [
                {
                    question: t('question-five'),
                    answer: t('answer-five'),
                },
                {
                    question: t('question-two-five'),
                    answer: t('answer-two-five'),
                },
            ],
        },
    ];


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <TouchableOpacity style={[styles.titleContainer, { marginTop: Platform.OS === 'android' && 36 }]} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>{t('faq-title')}</Text>
                </TouchableOpacity>
                <View>
                    {topics.map((topic, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigateToAccordion(topic)}
                            style={styles.topic}
                        >
                            <Text style={styles.topicText}>{topic.topic}</Text>
                            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default FaqScreen;

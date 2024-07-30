import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../../../styles/faqScreenStyle';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function FaqScreen() {
    const navigation = useNavigation();
    const {t} = useTranslation();

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
                question: t('topic-four'),
                answer: t('topic-four'),
            },
            {
                question: t('topic-two-four'),
                answer: t('topic-two-four'),
            },
            {
                question: t('topic-three-four'),
                answer: t('topic-three-four'),
            },
            {
                question: t('topic-four-four'),
                answer: t('topic-four-four'),
            },
            ],
        },
        {
            topic: t('topic-five'),
            questions: [
            {
                question: t('topic-five'),
                answer: t('topic-five'),
            },
            {
                question: t('topic-two-five'),
                answer: t('topic-two-five'),
            },
            ],
        },
    ];

    return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
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
    );
}

export default FaqScreen;

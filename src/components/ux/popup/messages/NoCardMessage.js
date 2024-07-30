import React, { useState } from 'react';
import styles from '../../../../styles/NoCardMessageStyles';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';

function NoCardMessage() {
    const navigation = useNavigation();
    const {t} = useTranslation();
    
    const goToAddCard = () => {
        navigation.navigate('AddCard');
    }

    return (
        <BlurView intensity={10} tint="default" style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>{t('title-no-card-message')}</Text>
                <Text style={styles.subtitle}>{t('you-cant-buy-message')}</Text>
                <TouchableOpacity onPress={goToAddCard} style={styles.addCard}>
                    <Text style={styles.addCardText}>{t('add-card-button')}</Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    )
};

export default NoCardMessage
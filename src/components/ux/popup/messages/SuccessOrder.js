import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import styles from '../../../../styles/SuccessOrderStyles';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

function SuccessOrder({ onClose }) {
    const [animation] = useState(new Animated.Value(0));
    const navigation = useNavigation();
    const {t} = useTranslation();

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000, // 1000 миллисекунд (1 секунд) для эмуляции загрузки
            easing: Easing.linear,
            useNativeDriver: false, // обязательно установите false для анимации ширины
        }).start(() => {
            if (onClose) {
                onClose();
            }
        });
    }, [animation, onClose]);

    const loadingWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <BlurView intensity={10} tint="default" style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>{t('success-order-title')}</Text>
                <Text style={styles.subtitle}>{t('success-order-subtitle')}</Text>
                <Text style={[styles.subtitle, { fontSize: 16, textAlign: 'center' }]}>{t('this-modal-auto-close-message')}</Text>
                <View style={styles.loadContainer}>
                    <Animated.View style={[styles.load, { width: loadingWidth }]} />
                </View>
            </View>
        </BlurView>
    );
}

export default SuccessOrder;

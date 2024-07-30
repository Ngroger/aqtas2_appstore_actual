import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, Image, Easing, Animated, StatusBar } from 'react-native';
import styles from '../../styles/NoInternetScreenStyles';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';
import { hasToken } from '../../store/tokenManager';
import { useNavigation } from '@react-navigation/native';

function NoInternetMessage() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const spinValue = useRef(new Animated.Value(0)).current;

    const reloadInternetConnection = async () => {
        // Проверка наличия интернет-соединения
        const netInfoState = await NetInfo.fetch();
        const isConnected = netInfoState.isConnected;

        if (isConnected) {
            // Если есть интернет
            const tokenExists = await hasToken();
            if (tokenExists) {
                // Если есть токен, отправляем пользователя на главный стек навигации
                navigation.navigate('MainTabs');
            } else {
                // Если нет токена, отправляем пользователя на экран регистрации
                navigation.navigate('Registration');
            }
        } else {
            // Сбросить значение перед каждым запуском анимации
            spinValue.setValue(0);
            // Анимация поворота кнопки
            Animated.timing(
                spinValue,
                {
                    toValue: 3, // Прокрутить три раза
                    duration: 3000, // Продолжительность в миллисекундах
                    easing: Easing.linear, // Функция ускорения (линейное изменение угла)
                    useNativeDriver: true, // Использовать нативный драйвер анимации для оптимизации
                }
            ).start();
        }
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.background}>
            <Image style={styles.logotype} source={require('../../img/noInternetLogo.png')} />
            <Text style={styles.title}>Не удалось подключиться к интернету.</Text>
            <TouchableOpacity style={styles.button} onPress={reloadInternetConnection}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <AntDesign name="reload1" size={36} color="#95E5FF" />
                </Animated.View>
            </TouchableOpacity>
            <StatusBar backgroundColor="transparent" translucent={true}/>
        </View>
    );
}

export default NoInternetMessage;

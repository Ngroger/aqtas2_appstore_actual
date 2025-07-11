import { AntDesign } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/NoInternetScreenStyles';

function NoInternetMessage() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const spinValue = useRef(new Animated.Value(0)).current;

    const reloadInternetConnection = async () => {
        // Проверка наличия интернет-соединения
        const netInfoState = await NetInfo.fetch();
        const isConnected = netInfoState.isConnected;

        if (isConnected) {
            navigation.navigate('MainTabs');
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
                    <AntDesign name="reload1" size={24} color="#26CFFF" />
                </Animated.View>
            </TouchableOpacity>
            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    );
}

export default NoInternetMessage;

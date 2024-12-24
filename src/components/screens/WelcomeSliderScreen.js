import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/WelcomeSwiperStyle';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';
import { s, vs } from 'react-native-size-matters';

export default function WelcomeSliderScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const handleNext = () => {
        navigation.navigate('RegistrationScreen'); // Use navigation to navigate to 'RegistrationScreen'
    };

    return (
        <View style={styles.container}>
            <View style={{ width: vs(300), height: vs(350) }}>
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    paginationStyle={styles.pagination}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                >
                    <View style={styles.card}>
                        <Image style={styles.image} source={require('../../img/slider/security.png')} resizeMode="cover" />
                        <Text style={styles.text}>{t('first-slide-info')}</Text>
                    </View>
                    <View style={styles.card}>
                        <Image style={styles.image} source={require('../../img/slider/cart.png')} resizeMode="cover" />
                        <Text style={styles.text}>{t('second-slide-info')}</Text>
                    </View>
                    <View style={styles.card}>
                        <Image style={styles.image} source={require('../../img/slider/credit-card.png')} resizeMode="cover" />
                        <Text style={styles.text}>{t('third-slide-info')}</Text>
                    </View>
                    <View style={styles.card}>
                        <Image style={styles.image} source={require('../../img/slider/sales.png')} resizeMode="cover" />
                        <Text style={styles.text}>{t('fourth-slide-info')}</Text>
                    </View>
                </Swiper>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextText}>{t("button-next")}</Text>
                </TouchableOpacity>
            </View>
            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    );
}

import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../../../styles/HowWorkPayPalStyles';
import { useNavigation } from '@react-navigation/native';

function HowWorkPayPal({ onClose }) {
    const navigation = useNavigation();
    handleBack = () => {
        if(onClose) {
            onClose()
        }
    }
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Как это работает?</Text>
                <Text style={styles.text}>Индентификатор PayPal или же email счета можно получить в настройках самого PayPal. На него будут поступать все полученные деньги с Ваших заказов. Так же Вы можете вывести средства с Вашего счета PayPal в меню 
                    <TouchableOpacity onPress={() => navigation.navigate('Bussines')}>
                        <Text style={[styles.text, { color: '#95E5FF' }]}>Бизнес</Text>
                    </TouchableOpacity>
                </Text>
                <TouchableOpacity onPress={handleBack} style={styles.button}>
                    <Text style={styles.buttonText}>Понятно</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default HowWorkPayPal;
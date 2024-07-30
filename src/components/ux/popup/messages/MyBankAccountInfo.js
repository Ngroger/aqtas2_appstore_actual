import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../../../styles/HowWorkPayPalStyles';
import { useNavigation } from '@react-navigation/native';

function MyBankAccountInfo({ onClose }) {
    const navigation = useNavigation();
    handleBack = () => {
        if(onClose) {
            onClose()
        }
    }
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Мой счёт</Text>
                <Text style={styles.text}>По правилам конфидициальности мы не можем использовать такие личные данные, как пароль и логин и лишь храним Ваш email индентификатор для оплаты заказов. Для того, чтоб авторизоваться в свой счёт, Вам нужно ввести свои данные. В дальнейшем это не потребуется</Text>
                <TouchableOpacity onPress={handleBack} style={styles.button}>
                    <Text style={styles.buttonText}>Понятно</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default MyBankAccountInfo;
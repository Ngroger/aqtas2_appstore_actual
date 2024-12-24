import { useNavigation } from '@react-navigation/native';
import { Text, View, FlatList, TouchableOpacity, StatusBar, Image } from 'react-native';
import styles from '../../styles/AddPaymentsMethod';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddPaypal from '../ux/popup/AddPaypal';
import { getUserData } from '../../store/userDataManager';
import axios from 'axios';

function AddPaymentsMethod() {
    const { t } = useTranslation();
    const [showAddPayPal, setShowAddPayPal] = useState(false);
    const [userData, setUserData] = useState({});
    const [isPaypal, setIsPaypal] = useState(false);

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const AddPaypalMethod = async () => {
        try {
            const apiUrl = `https://aqtas.garcom.kz/api/isEmailPaypal/${userData.userId}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const responseData = await response.json();

            // Получаем результат из ответа
            const isPaypalValue = responseData.hasEmailPaypal;

            // Обновляем состояние isPaypal
            setIsPaypal(isPaypalValue);

            // Если isPaypal true, тогда выполняем setShowAddPayPal(!showAddPayPal)
            if (!isPaypalValue) {
                setShowAddPayPal(!showAddPayPal);
            } else {
                alert('PayPal уже успешно добавлен')
            }
        } catch (error) {
            // Обработка ошибок, если это необходимо
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    }

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>{t('add-paypal')}</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={AddPaypalMethod} style={styles.card}>
                        <Image style={{ width: 200, height: 100 }} source={require('../../img/paypal.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert(`${t('this-method-under-development')}`)} style={styles.card}>
                        <Image style={{ width: 200, height: 100, resizeMode: 'contain' }} source={require('../../img/qiwi.png')} />
                        <View style={styles.unavailable} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert(`${t('this-method-under-development')}`)} style={styles.card}>
                        <Image style={{ width: 250, height: 100 }} source={require('../../img/yandex.png')} />
                        <View style={styles.unavailable} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert(`${t('this-method-under-development')}`)} style={styles.card}>
                        <Image style={{ width: 250, height: 100, resizeMode: 'contain' }} source={require('../../img/kaspi.png')} />
                        <View style={styles.unavailable} />
                    </TouchableOpacity>
                </View>
                <StatusBar backgroundColor="transparent" translucent={true} />
            </View>
            {showAddPayPal && <AddPaypal onClose={AddPaypalMethod} />}
        </View>
    )

};

export default AddPaymentsMethod;
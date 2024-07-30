import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from '../../../styles/PaymentMethodStyles';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserData } from '../../../store/userDataManager';
import axios from 'axios';

function PaymentMethod({ payments, onClose, productName, customerId, size, success }) {
    const [selectedPayment, setSelectedPayment] = useState('');
    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [userPhoto, setUserPhoto] = useState();
    
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    function formatCardNumber(cardNumber) {  
        const visibleDigits = 4; // Количество видимых цифр в каждой группе
        const separator = ' '; // Разделитель
        
        // Заменяем все символы, кроме цифр, на пустую строку
        const cleanNumber = cardNumber.toString().replace(/\D/g, '');
        
        // Разделяем номер на первые 12 символов и последние 4 символа
        const hiddenPart = '**** **** **** ' + cleanNumber.slice(-4);
        
        return hiddenPart;
    }

    const createOrder = async (bankCard) => {
        const requestData = {
            name: userData.fullname,
            nameProduct: productName,
            address: userData.address,
            photoUser: await getUserPhoto(),
            count: 1, // Пустое поле, будет установлено значение по умолчанию (1)
            userID: customerId,
            size: size, // Пустое поле, будет установлено значение по умолчанию (NULL)
            bankCard: bankCard
        };
        
        try {
            const response = await axios.post('https://aqtas.ru/createOrder', requestData);
            if (response.data.success) {
                success();
            }

        } catch (error) {
            e.error('Error:', error);
        }
    };


    const getUserPhoto = async () => {
        try {
            const response = await fetch(`https://aqtas.ru/getUserImage/${userData.userId}`);
            if (response.ok) {
                const data = await response.json();
                return data.photo
            } else {
            }
        } catch (error) {
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
    };


    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name='close' size={24} color='#000'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('title-payment-method')}</Text>
                </View>
                <FlatList
                    data={payments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => createOrder(item.number)} style={styles.cardContainer}>
                            <Image
                                style={styles.miniBankIcon}
                                source={
                                item.bankName === 'Visa'
                                    ? require('../../../img/cards/visa.png')
                                    : item.bankName === 'MasterCard'
                                    ? require('../../../img/cards/mastercard.png')
                                    : null // Здесь можно добавить иконку по умолчанию
                                }
                            />
                            <Text style={styles.number}>{formatCardNumber(item.number)}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
};

export default PaymentMethod;
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/AddPaypalStyles';
import HowWorkPayPal from './messages/HowWorkPayPal';

function AddPaypal({ onClose }) {
    const [isShowHowItWork, setShowHowItWork] = useState(false);
    const [email, onChangeEmail] = useState('');
    const [userData, setUserData] = useState({});

    const toggleOpenHowItWork = () => {
        setShowHowItWork(!isShowHowItWork)
    }

    handleBack = () => {
        if (onClose) {
            onClose()
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    }

    const addPayPal = async () => {
        try {
            const response = await fetch('https://aqtas.garcom.kz/api/addPaypal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userData.userId, // Передайте userId из сохраненных данных пользователя
                    email: email,
                }),
            });

            if (!response.ok) {

                // Обработка ошибки, например, показ сообщения пользователю
            } else {
                // Обработка успешного запроса, например, закрытие модального окна
                if (onClose) {
                    onClose();
                }
            }
        } catch (error) {

            // Обработка ошибки, например, показ сообщения пользователю
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="close" size={36} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Добавить PayPal</Text>
                    <TouchableOpacity onPress={toggleOpenHowItWork} style={styles.infoContainer}>
                        <AntDesign name="question" size={24} color="#26CFFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <Text style={styles.formTitle}>PayPal индентификатор</Text>
                    <TextInput value={email} onChangeText={onChangeEmail} style={styles.formInput} placeholder='Введите Email' />
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.link}>Нет аккаунте?</Text>
                    <TouchableOpacity>
                        <Text style={[styles.link, { color: '#26CFFF', marginLeft: 4 }]}>Создайте</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={addPayPal} style={styles.addPayPal}>
                    <Text style={styles.addPayPalText}>Добавить</Text>
                </TouchableOpacity>
            </View>
            {isShowHowItWork && <HowWorkPayPal onClose={toggleOpenHowItWork} />}
        </View>
    )
};

export default AddPaypal;
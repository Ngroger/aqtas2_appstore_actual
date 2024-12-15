import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, TextInput, Text, Platform } from 'react-native';
import styles from '../../styles/RegistrationScreenStyle';
import { useNavigation } from '@react-navigation/native';
import { storeToken, hasToken } from '../../store/tokenManager';
import axios from 'axios';
import { storeUserData } from '../../store/userDataManager';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

function ConfirmPassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { t } = useTranslation();
    const [errors, setErrors] = useState({
        password: false,
        confirmPassword: false,
    });
    const [showErrorText, setShowErrorText] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [message, setMessage] = useState();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [expoPushToken]); // Include expoPushToken in the dependency array to use its updated value

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Сообщение",
                body: `Добро пожаловать в AQTas!`,
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    const updateErrors = () => {
        const updatedErrors = {
            password: password.length < 6,
            confirmPassword: confirmPassword.length < 6 || password !== confirmPassword,
        };

        const hasErrors = Object.values(updatedErrors).some((error) => error);
        setErrors(updatedErrors);
        setShowErrorText(hasErrors);
    };

    const navigation = useNavigation();

    const goToMain = () => {
        navigation.navigate('MainTabs');
    };

    const updateUserData = (field, value) => {
        const updatedUserData = { ...props.userData, [field]: value };
        props.updateUserDetails(updatedUserData);
    };

    const sendDataToServer = () => {
        if (password === confirmPassword) {
            // Construct a user object to send to the server
            const user = {
                fullname: props.userData.fullname,
                surname: props.userData.surname,
                phoneNumber: props.userData.phoneNumber,
                email: props.userData.email,
                password: props.userData.password,
                isBussinesAccount: props.userData.isBussinesAccount,
                pushID: expoPushToken
            };

            storeUserData(props.userData);

            // Send data to the server using Axios
            axios.post('https://aqtas.garcom.kz/register', user)
                .then((response) => {
                    const authToken = response.data.authToken;
                    const userId = response.data.userId; // Извлекаем ID пользователя

                    // Сохраняем authToken и userId в локальном хранилище
                    storeToken(authToken);
                    storeUserData({ ...props.userData, userId, photoUser: 'withoutPhoto.png', sex: 'Не укаказано', birthday: 'Не указано', address: 'Не указано' });

                    hasToken();

                    // Handle the response here, for example, navigate to the next screen
                    schedulePushNotification();
                    goToMain();
                    setShowErrorText(false)
                })
                .catch((error) => {

                    // Handle the error, show an error message, or take appropriate action
                });
        } else {

        }
    };

    return (
        <View style={{ width: '100%' }}>
            <Text style={styles.titleReg}>{t('registration-title')}</Text>
            <Text style={styles.description}>{t('reg-subtitle')}</Text>
            <View style={{ marginTop: 16 }}>
                <Text style={errors.password ? styles.inputTitleError : styles.inputTitle}>{t('password')}</Text>
                <View style={styles.fieldContainr}>
                    <TextInput
                        style={[styles.input, errors.password && styles.inputError]}
                        onChangeText={(text) => {
                            setPassword(text);
                            updateUserData('password', text);
                        }}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={{ marginTop: 16 }}>
                <Text style={errors.confirmPassword ? styles.inputTitleError : styles.inputTitle}>{t('confirm-password')}</Text>
                <TextInput
                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                    }}
                    secureTextEntry={true}
                />
            </View>
            <View style={{ marginTop: 16 }}>
                {showErrorText && (
                    <Text style={styles.error}>
                        {errors.password
                            ? `${t('password-minimum-six-symbol-message')}`
                            : `${t('password-does-not-match')}`
                        }
                    </Text>
                )}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={async () => {
                        updateErrors();
                        const hasErrors = Object.values(errors).some((error) => error);

                        if (!hasErrors) {
                            sendDataToServer();
                        }
                    }}
                >
                    <Text style={styles.nextText}>{t('button-next')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ConfirmPassword;

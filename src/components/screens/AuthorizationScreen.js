import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import styles from '../../styles/RegistrationScreenStyle';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { storeUserData } from '../../store/userDataManager';
import { getToken, storeToken, hasToken } from '../../store/tokenManager';

function AuthorizationScreen(props) {
    const navigation = useNavigation();
    const [state, setState] = useState({
        login: '',
        password: '',
        errors: {
            login: false,
            password: false,
        },
        showErrorText: false,
    });
    const { t } = useTranslation();
    const [serverMessage, setServerMessage] = useState();

    const updateErrors = () => {
        const { login, password, errors } = state;

        errors.login = login.length < 1;
        errors.password = password.length < 1;

        const hasErrors = Object.values(errors).some((error) => error);

        setState({ ...state, errors, showErrorText: hasErrors });

        return hasErrors; // Возвращаем true, если есть ошибки, иначе false
    };

    const goToRegistration = () => {
        navigation.navigate('RegistrationScreen');
    };

    const goToMain = () => {
        navigation.navigate('MainTabs');
    };

    const auth = async () => {
        // Перед отправкой запроса вызываем updateErrors
        const hasErrors = updateErrors();

        if (hasErrors) {
            return;
        } else {
            setState(prevState => ({
                ...prevState,
                errors: {
                    login: false,
                    password: false
                },
                showErrorText: false
            }));

            try {
                const response = await fetch(`https://aqtas.garcom.kz/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: state.login,
                        password: state.password
                    })
                });

                const responseJson = await response.json();

                if (responseJson.success) {
                    setServerMessage();

                    // Save authToken and userId to local storage
                    storeToken(responseJson.authToken);

                    const userData = {
                        userId: responseJson.userData.userId,
                        fullname: responseJson.userData.fullname || 'Не указано',
                        surname: responseJson.userData.surname || 'Не указано',
                        phoneNumber: responseJson.userData.phoneNumber || 'Не указано',
                        photoUser: responseJson.userData.photo || 'withoutPhoto.png',
                        sex: responseJson.userData.sex || 'Не указано',
                        birthday: responseJson.userData.birthday || 'Не указано',
                        address: responseJson.userData.address || 'Не указано',
                    };

                    storeUserData(userData);

                    hasToken();

                    goToMain();
                } else {
                    setServerMessage(responseJson.message);
                }
            } catch (error) {
                console.log("auth error: ", error);
            }
        }
    };


    return (
        <View style={{ width: '100%', padding: 30, backgroundColor: '#95E5FF', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.logo} source={require('../../img/logo.png')} />
            <Text style={styles.titleReg}>{t('auth-title')}</Text>
            <Text style={styles.description}>{t('reg-subtitle')}</Text>
            <View style={{ marginTop: 40, width: '100%' }}>
                <Text style={state.errors.login ? styles.inputTitleError : styles.inputTitle}>{t('email-or-phone-title')}</Text>
                <TextInput
                    style={[styles.input, state.errors.login && styles.inputError]}
                    onChangeText={(text) => {
                        setState({ ...state, login: text });
                    }}
                />
            </View>
            <View style={{ marginTop: 20, width: '100%' }}>
                <Text style={state.errors.password ? styles.inputTitleError : styles.inputTitle}>{t('password')}</Text>
                <TextInput
                    secureTextEntry={true}
                    style={[styles.input, state.errors.password && styles.inputError]}
                    onChangeText={(text) => {
                        setState({ ...state, password: text });
                    }}
                />
            </View>
            <TouchableOpacity onPress={goToRegistration}>
                <Text style={styles.logInText}>{t('is-account-reg')}</Text>
            </TouchableOpacity>
            <View style={{ top: 24, width: '100%' }}>
                {state.showErrorText && (
                    <Text style={styles.error}>{t('all-field-need-to-complete')}</Text>
                )}
                {serverMessage && <Text style={styles.error}>{t(serverMessage)}</Text>}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={auth}
                >
                    <Text style={styles.nextText}>{t('button-next')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AuthorizationScreen;

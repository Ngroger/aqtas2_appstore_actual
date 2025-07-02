import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Keyboard, Animated, Easing } from 'react-native';
import { s } from 'react-native-size-matters';
import { toggleIsNewUser } from '../../store/NewUserStorage';
import { hasToken, storeToken } from '../../store/tokenManager';
import { storeUserData } from '../../store/userDataManager';
import styles from '../../styles/RegistrationScreenStyle';

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
    const [isShowPass, setIsShowPass] = useState(true);
    const keyboardHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
            Animated.timing(keyboardHeight, {
                toValue: e.endCoordinates.height,
                duration: 10,
                useNativeDriver: false,
                easing: Easing.out(Easing.poly(5))
            }).start();
        });
        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(keyboardHeight, {
                toValue: 0,
                duration: 10,
                useNativeDriver: false,
                easing: Easing.out(Easing.poly(5))
            }).start();
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

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
                const response = await fetch(`https://aqtas.garcom.kz/api/login`, {
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

                    toggleIsNewUser(false);

                    goToMain();
                } else {
                    setServerMessage(responseJson.message);
                }
            } catch (error) {
                console.log("auth error: ", error);
            }
        }
    };

    const skip = async () => {
        await toggleIsNewUser(false);
        navigation.navigate('MainTabs')
    };

    return (
        <Animated.View style={{ width: '100%', padding: s(18), backgroundColor: '#26CFFF', height: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: keyboardHeight }}>
            <Image style={styles.logo} source={require('../../img/logo_white.png')} />
            <Text style={styles.titleReg}>{t('auth-title')}</Text>
            <Text style={styles.description}>{t('reg-subtitle')}</Text>
            <TouchableOpacity onPress={() => skip()} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Пропустить</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#FFF" />
            </TouchableOpacity>
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
                <View style={styles.fieldContainr}>
                    <TextInput
                        secureTextEntry={isShowPass}
                        style={[styles.input, state.errors.password && styles.inputError]}
                        onChangeText={(text) => {
                            setState({ ...state, password: text });
                        }}
                    />
                    <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)} style={{ position: 'absolute', zIndex: 10, right: 12 }}>
                        <Ionicons name={isShowPass ? "eye-outline" : "eye-off-outline"} size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={goToRegistration}>
                <Text style={styles.logInText}>{t('is-account-reg')}</Text>
            </TouchableOpacity>
            <View style={{ width: '100%' }}>
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
        </Animated.View>
    );
}

export default AuthorizationScreen;

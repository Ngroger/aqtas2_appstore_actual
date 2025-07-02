import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Animated, Easing, Keyboard, View } from 'react-native';
import { toggleIsNewUser } from '../../store/NewUserStorage';
import styles from '../../styles/RegistrationScreenStyle';
import CodeConfrim from '../ux/CodeConfrim';
import ConfrimPassword from '../ux/ConfrimPassword';
import Registration from '../ux/Registration';
import SelectLanguage from '../ux/selectLanguage';

function RegistrationScreen() {
    const [userData, setUserData] = useState({
        fullname: '',
        surname: '',
        phoneNumber: '',
        email: '',
        password: '',
        isBussinesAccount: false,
    });
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
    const [currentStep, setCurrentStep] = useState('SelectLanguage');
    const navigation = useNavigation();
    const { t } = useTranslation();

    const updateUserDetails = (newUserData) => {
        setUserData(newUserData);
    };

    const goToNextStep = (nextStep) => {
        setCurrentStep(nextStep);
    };

    const skip = async () => {
        await toggleIsNewUser(false);
        navigation.navigate('MainTabs')
    };



    return (
        <Animated.View
            style={[styles.container, { paddingBottom: keyboardHeight }]}
        >
            <Image style={styles.logo} source={require('../../img/logo_white.png')} />
            <TouchableOpacity onPress={() => skip()} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Пропустить</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#FFF" />
            </TouchableOpacity>
            {currentStep === 'SelectLanguage' && (
                <SelectLanguage onNextStep={() => goToNextStep('Registration')} />
            )}
            {currentStep === 'Registration' && (
                <Registration
                    userData={userData}
                    updateUserDetails={updateUserDetails}
                    onNextStep={() => goToNextStep('ConfirmPassword')}
                />
            )}
            {currentStep === 'ConfirmPassword' && (
                <ConfrimPassword
                    userData={userData}
                    updateUserDetails={updateUserDetails}
                    onNextStep={() => goToNextStep('CodeConfirm')}

                />
            )}
            {currentStep === 'CodeConfirm' && (
                <CodeConfrim
                    userData={userData}
                />
            )}
            <StatusBar style='dark' />
        </Animated.View>
    );
};

export default RegistrationScreen;

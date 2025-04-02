import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <Image style={styles.logo} source={require('../../img/logo.png')} />
            <TouchableOpacity onPress={() => skip()} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Пропустить</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
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
            <StatusBar translucent={true} backgroundColor='transparent' />
        </KeyboardAvoidingView>
    );
};

export default RegistrationScreen;

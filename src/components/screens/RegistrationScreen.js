import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/RegistrationScreenStyle';
import SelectLanguage from '../ux/selectLanguage';
import Registration from '../ux/Registration';
import ConfrimPassword from '../ux/ConfrimPassword';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { toggleIsNewUser } from '../../store/NewUserStorage'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

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
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../img/logo.png')} />
            <TouchableOpacity onPress={() => skip()} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Пропустить</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
            {currentStep === 'SelectLanguage' ? (
                <SelectLanguage onNextStep={() => goToNextStep('Registration')} />
            ) : currentStep === 'Registration' ? (
                <Registration
                    userData={userData}
                    updateUserDetails={updateUserDetails}
                    onNextStep={() => goToNextStep('ConfirmPassword')}
                />
            ) : (
                <ConfrimPassword
                    userData={userData}
                    updateUserDetails={updateUserDetails}
                />
            )}
            <StatusBar translucent={true} backgroundColor='transparent' />
        </View>
    );
};

export default RegistrationScreen;

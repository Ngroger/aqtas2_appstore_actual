import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/RegistrationScreenStyle';
import SelectLanguage from '../ux/selectLanguage';
import Registration from '../ux/Registration';
import ConfrimPassword from '../ux/ConfrimPassword';
import { StatusBar } from 'expo-status-bar';

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

    const updateUserDetails = (newUserData) => {
        setUserData(newUserData);
    };

    const goToNextStep = (nextStep) => {
        setCurrentStep(nextStep);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../img/logo.png')} />
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
            <StatusBar translucent={true} backgroundColor='transparent'/>
        </View>
    );
};

export default RegistrationScreen;

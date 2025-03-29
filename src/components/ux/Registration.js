import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/RegistrationScreenStyle';

function Registration(props) {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [state, setState] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        email: '',
        errors: {
            name: false,
            surname: false,
            phoneNumber: false,
            email: false,
        },
        showErrorText: false,
    });

    const updateErrors = () => {
        const { name, surname, phoneNumber, email, errors } = state;

        errors.name = name.length < 2;
        errors.surname = surname.length < 2;
        errors.phoneNumber = phoneNumber.length !== 11;
        errors.email = email.length < 6 || !email.includes('@');

        const hasErrors = Object.values(errors).some((error) => error);

        setState({ ...state, errors, showErrorText: hasErrors });
    };

    const navigateToNextStep = () => {
        updateErrors();
        const { errors } = state;
        const hasErrors = Object.values(errors).some((error) => error);
        if (!hasErrors) {
            if (props.onNextStep) {
                props.onNextStep();
            }
        }
    };

    const updateUserData = (field, value) => {
        const updatedUserData = { ...props.userData, [field]: value };
        props.updateUserDetails(updatedUserData);
    };

    const goToRegistration = () => {
        navigation.navigate('Authorization');
    };


    return (
        <View style={{ width: '100%' }}>
            <Text style={styles.titleReg}>{t('registration-title')}</Text>
            <Text style={styles.description}>{t('reg-subtitle')}</Text>
            <View style={styles.inputContainer}>
                <View style={[styles.field, { width: '48%' }]}>
                    <Text style={state.errors.name ? styles.inputTitleError : styles.inputTitle}>{t('name')}</Text>
                    <TextInput
                        style={[styles.input, state.errors.name && styles.inputError]}
                        onChangeText={(text) => {
                            setState({ ...state, name: text });
                            updateUserData('fullname', text);
                        }}
                    />
                </View>
                <View style={[styles.field, { width: '48%' }]}>
                    <Text style={state.errors.surname ? styles.inputTitleError : styles.inputTitle}>{t('surname')}</Text>
                    <TextInput
                        style={[styles.input, state.errors.surname && styles.inputError]}
                        onChangeText={(text) => {
                            setState({ ...state, surname: text });
                            updateUserData('surname', text);
                        }}
                    />
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={state.errors.phoneNumber ? styles.inputTitleError : styles.inputTitle}>{t('phone-number')}</Text>
                <TextInput
                    style={[styles.input, state.errors.phoneNumber && styles.inputError]}
                    onChangeText={(text) => {
                        setState({ ...state, phoneNumber: text });
                        updateUserData('phoneNumber', text);
                    }}
                    keyboardType="numeric"
                    maxLength={11}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={state.errors.email ? styles.inputTitleError : styles.inputTitle}>Email</Text>
                <TextInput
                    style={[styles.input, state.errors.email && styles.inputError]}
                    onChangeText={(text) => {
                        setState({ ...state, email: text });
                        updateUserData('email', text);
                    }}
                />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={goToRegistration}>
                    <Text style={styles.logInText}>{t('is-account-auth')}</Text>
                </TouchableOpacity>
            </View>
            <View>
                {state.showErrorText && <Text style={styles.error}>{t('all-field-need-to-complete')}</Text>}
                <TouchableOpacity style={styles.nextButton} onPress={navigateToNextStep}>
                    <Text style={styles.nextText}>{t('button-next')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Registration;
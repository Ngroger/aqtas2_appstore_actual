import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/RegistrationScreenStyle';

function ConfirmPassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { t } = useTranslation();
    const [errors, setErrors] = useState({
        password: false,
        confirmPassword: false,
    });
    const [showErrorText, setShowErrorText] = useState(false);
    const [isShowPass, setIsShowPass] = useState(true);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(true);

    const updateErrors = () => {
        const updatedErrors = {
            password: password.length < 6,
            confirmPassword: confirmPassword.length < 6 || password !== confirmPassword,
        };

        const hasErrors = Object.values(updatedErrors).some((error) => error);
        setErrors(updatedErrors);
        setShowErrorText(hasErrors);
    };

    const updateUserData = (field, value) => {
        const updatedUserData = { ...props.userData, [field]: value };
        props.updateUserDetails(updatedUserData);
    };

    const sendSms = async () => {
        try {
            const response = await fetch('https://aqtas.garcom.kz/api/sendSMS', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: props.userData.phoneNumber
                })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                props.onNextStep();
            };

        } catch (error) {
            console.log("send sms error: ", error);
        }
    }

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
                        secureTextEntry={isShowPass}
                    />
                    <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)} style={{ position: 'absolute', zIndex: 10, right: 12 }}>
                        <Ionicons name={isShowPass ? "eye-outline" : "eye-off-outline"} size={20} color="#141414" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 16 }}>
                <Text style={errors.confirmPassword ? styles.inputTitleError : styles.inputTitle}>{t('confirm-password')}</Text>
                <View style={styles.fieldContainr}>
                    <TextInput
                        style={[styles.input, errors.confirmPassword && styles.inputError]}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                        }}
                        secureTextEntry={isShowConfirmPass}
                    />
                    <TouchableOpacity onPress={() => setIsShowConfirmPass(!isShowConfirmPass)} style={{ position: 'absolute', zIndex: 10, right: 12 }}>
                        <Ionicons name={isShowConfirmPass ? "eye-outline" : "eye-off-outline"} size={20} color="#141414" />
                    </TouchableOpacity>
                </View>
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
                            sendSms();
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

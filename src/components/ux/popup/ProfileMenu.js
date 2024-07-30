import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../../styles/ProfileMenuStyle';
import { useNavigation } from '@react-navigation/native';
import { removeUserData } from '../../../store/userDataManager';
import { removeToken } from '../../../store/tokenManager';
import { useTranslation } from 'react-i18next';

function ProfileMenu({ onClose }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };
    const navigation = useNavigation();
    const {t} = useTranslation();

    const handleNext = () => {
        navigation.navigate('RegistrationScreen'); // Use navigation to navigate to 'RegistrationScreen'
    };

    const handleDelete = () => {
        // Удаление данных пользователя из UserManager
        removeUserData();
        removeToken();

        // Переадресация на экран "Registration"
        handleNext();
    }

    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={handleClose} style={styles.goBack}/>
            <View style={styles.addCardContainer}>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.exitButton}>{t('exit-account-button')}</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity onPress={handleDelete}>
                    <Text style={styles.deleteButton}>{t('delete-account-button')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default ProfileMenu;

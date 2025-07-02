import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/ProfileMenuStyle';

function ProfileMenu({ onClose }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };
    const navigation = useNavigation();
    const { t } = useTranslation();

    const handleNext = () => {
        navigation.navigate('RegistrationScreen');
    };

    const deleteUser = async _ => {
        try {
            const userData = await getUserData();

            if (userData) {
                const resposne = await fetch(`https://aqtas.garcom.kz/api/deleteUser/${userData.userId}`, {
                    method: 'DELETE'
                });

                const responseJson = await resposne.json();

                console.log("responseJson", responseJson);
            }
        } catch (error) {
            console.log("Delete User Error: ", error);
        }
    };

    const handleDelete = async () => {
        await deleteUser();
        removeUserData();
        removeToken();

        //  Переадресация на экран "Registration"
        handleNext();
    }

    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={handleClose} style={styles.goBack} />
            <View style={styles.addCardContainer}>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.exitButton}>{t('exit-account-button')}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity onPress={handleDelete}>
                    <Text style={styles.deleteButton}>{t('delete-account-button')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default ProfileMenu;

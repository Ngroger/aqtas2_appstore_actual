import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../../styles/ChangePasswordStyles';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ChangePassword({ onClose, userId }) {
    const [isFocusOldPass, setFocusOldPass] = useState(false);
    const [isFocusNewPass, setFocusNewPass] = useState(false);
    const [isFocusConfrimPass, setFocusConfrimPass] = useState(false);

    const [oldPassword, onChangeOldPassword] = useState();
    const [newPassword, onChangeNewPassword] = useState();
    const [confirmPassword, onChangeConfirmPassword] = useState();
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { t } = useTranslation();

    const handleChangePassword = () => {
        setErrorMessage(''); // Сброс ошибки перед проверкой

        // Проверка на соответствие паролей
        if (newPassword !== confirmPassword) {
            setErrorMessage(t('change-password-modal.passwords-do-not-match'));
            return;
        }

        // Проверка на длину нового пароля
        if (newPassword.length <= 10) {
            setErrorMessage(t('change-password-modal.password-must-be-greater'));
            return;
        }

        // Если все проверки пройдены, делаем запрос на сервер
        const requestData = {
            userId: userId,
            oldPassword: oldPassword,
            newPassword: newPassword,
        };

        fetch('https://aqtas.garcom.kz/api/passwordChange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setErrorMessage();
                    handleClose();
                } else {
                    setErrorMessage(t(`change-password-modal.${data.message}`));
                }
            })
            .catch((error) => {
                setMessage('Ошибка при выполнении запроса: ' + error.message);
            });
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('change-password-modal.title')}</Text>
                </View>
                <View style={isFocusOldPass ? styles.field : [styles.field, { borderColor: 'rgba(0, 0, 0, 0.5)' }]}>
                    <Text style={isFocusOldPass ? styles.fieldTitle : [styles.fieldTitle, { color: 'rgba(0, 0, 0, 0.5)' }]}>
                        {t('change-password-modal.old-pass-title')}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('change-password-modal.old-pass-place')}
                        onFocus={() => setFocusOldPass(true)}
                        onBlur={() => setFocusOldPass(false)}
                        secureTextEntry={true}
                        value={oldPassword}
                        onChangeText={onChangeOldPassword}
                    />
                </View>
                <View style={isFocusNewPass ? styles.field : [styles.field, { borderColor: 'rgba(0, 0, 0, 0.5)' }]}>
                    <Text style={isFocusNewPass ? styles.fieldTitle : [styles.fieldTitle, { color: 'rgba(0, 0, 0, 0.5)' }]}>
                        {t('change-password-modal.new-pass-title')}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('change-password-modal.new-pass-place')}
                        onFocus={() => setFocusNewPass(true)}
                        onBlur={() => setFocusNewPass(false)}
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={onChangeNewPassword}
                    />
                </View>
                <View style={isFocusConfrimPass ? styles.field : [styles.field, { borderColor: 'rgba(0, 0, 0, 0.5)' }]}>
                    <Text style={isFocusConfrimPass ? styles.fieldTitle : [styles.fieldTitle, { color: 'rgba(0, 0, 0, 0.5)' }]}>
                        {t('change-password-modal.confirm-pass-title')}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('change-password-modal.confirm-pass-place')}
                        onFocus={() => setFocusConfrimPass(true)}
                        onBlur={() => setFocusConfrimPass(false)}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={onChangeConfirmPassword}
                    />
                </View>

                {/* Отображение ошибки */}
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                <TouchableOpacity
                    disabled={!oldPassword || !newPassword || !confirmPassword}
                    onPress={handleChangePassword}
                    style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>

                {/* Отображение сообщения о результате */}
                {message ? <Text style={styles.message}>{message}</Text> : null}
            </View>
        </View>
    );
};

export default ChangePassword;

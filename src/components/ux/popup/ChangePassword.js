import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../../styles/ChangePasswordStyles';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

function ChangePassword({ onClose, userId }) {
    const [isFocusOldPass, setFocusOldPass] = useState(false);
    const [isFocusNewPass, setFocusNewPass] = useState(false);
    const [isFocusConfrimPass, setFocusConfrimPass] = useState(false);

    const [oldPassword, onChangeOldPassword] = useState();
    const [newPassword, onChangeNewPassword] = useState();
    const [confirmPassword, onChangeConfirmPassword] = useState();
    const [message, setMessage] = useState('');

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            // Здесь вы можете выполнить запрос к /passwordConfirm на сервере с использованием fetch
            const requestData = {
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
            };

            handleClose();
            fetch('https://aqtas.ru/passwordChange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message || data.error);
            })
            .catch((error) => {
                setMessage('Ошибка при выполнении запроса: ' + error.message);
            });
        } else {
            setMessage('Пароли не совпадают');
        }
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
                    <Text style={styles.title}>Изменить пароль</Text>
                </View>
                <View style={ isFocusOldPass ? styles.field : [styles.field, { borderColor: 'rgba(0, 0, 0, 0.5)' }] }>
                    <Text style={ isFocusOldPass ? styles.fieldTitle : [styles.fieldTitle, { color: 'rgba(0, 0, 0, 0.5)' }] }>Старый пароль</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Введите старый пароль'
                        onFocus={() => setFocusOldPass(true)}
                        onBlur={() => setFocusOldPass(false)}
                        secureTextEntry={true}
                        value={oldPassword}
                        onChangeText={onChangeOldPassword}
                    />
                </View>
                <View style={ isFocusNewPass ? styles.field : [styles.field, { borderColor: 'rgba(0, 0, 0, 0.5)' }] }>
                    <Text style={ isFocusNewPass ? styles.fieldTitle : [styles.fieldTitle, { color: 'rgba(0, 0, 0, 0.5)' }] }>Новый пароль</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Введите новый пароль'
                        onFocus={() => setFocusNewPass(true)}
                        onBlur={() => setFocusNewPass(false)}
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={onChangeNewPassword}
                    />
                </View>
                <View style={ isFocusConfrimPass ? styles.field : [styles.field, { borderColor: 'rgba(0, 0, 0, 0.5)' }] }>
                    <Text style={ isFocusConfrimPass ? styles.fieldTitle : [styles.fieldTitle, { color: 'rgba(0, 0, 0, 0.5)' }] }>Подтвердите пароль</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Повторите пароль'
                        onFocus={() => setFocusConfrimPass(true)}
                        onBlur={() => setFocusConfrimPass(false)}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={onChangeConfirmPassword}
                    />
                </View>
                <TouchableOpacity onPress={handleChangePassword} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default ChangePassword;
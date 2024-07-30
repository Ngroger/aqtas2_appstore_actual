import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../styles/ChangeSexStyle';
import { AntDesign } from '@expo/vector-icons';
import { updateUserData } from '../../../store/userDataManager';

function ChangeSex({ onClose, userId }) {
    const [selectedSex, setSelectedSex] = useState(''); // Состояние для выбора пола

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleSexChange = (sex) => {
        setSelectedSex(sex); // Обновляем выбранный пол в состоянии
    };

    const handleSaveSex = () => {
        if (!selectedSex) {
            return;
        }

        // Отправить запрос на сервер для обновления пола
        fetch('https://aqtas.ru/changeUserSex', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, sex: selectedSex }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.success) {
                    const updatedUserData = await updateUserData({ sex: selectedSex });
                    handleClose();
                } else {

                }
            })
            .catch((error) => {

            });
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Изменить пол</Text>
                </View>
                <TouchableOpacity
                    style={ selectedSex === 'Не указано' ? [styles.button, { opacity: 0.4 }] : styles.button }
                    onPress={() => handleSexChange('Не указано')}
                >
                    <Text style={styles.buttonText}>Не указано</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ selectedSex === 'Женщина' ? [styles.button, { opacity: 0.4 }] : styles.button }
                    onPress={() => handleSexChange('Женщина')}
                >
                    <Text style={styles.buttonText}>Женщина</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ selectedSex === 'Мужчина' ? [styles.button, { opacity: 0.4 }] : styles.button }
                    onPress={() => handleSexChange('Мужчина')}
                >
                    <Text style={styles.buttonText}>Мужчина</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveSex}>
                    <Text style={styles.buttonText}>Сохранить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ChangeSex;

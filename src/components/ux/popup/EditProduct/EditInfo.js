import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import styles from '../../../../styles/EditInfoStyles';
import { useState, useEffect } from 'react';
import { getUserData } from '../../../../store/userDataManager';

function EditInfo({ onClose, productId }) {
    const [cost, onChangeCost] = useState('');
    const [oldCost, onChangeOldCost] = useState('');
    const [name, onChangeName] = useState('');
    const [description, onChangeDescription] = useState('');
    const [userData, setUserData] = useState({});

    useEffect(() => {

    }, [])

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const saveChanges = () => {
        // Проверка и замена пустых значений на NULL
        const postData = {
            cost: cost !== '' ? cost : null,
            oldCost: oldCost !== '' ? oldCost : null,
            name: name !== '' ? name : null,
            description: description !== '' ? description : null,
        };

        // Отправка данных на сервер
        fetch(`https://aqtas.ru/updateProduct/${userData.userId}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data => {
                // Можно добавить обработку успешного обновления
            })
            .catch(error => {
            });
    };

    return (
        <View  style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.title}>Изменение данных</Text>
                    <Text style={styles.subtitle}>В этом поле вы можете изменить начальную информацию о вашем продукте</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <View>
                        <View style={[styles.field, { width: 160 }]}>
                            <Text style={styles.titleField}>Новая цена</Text>
                            <TextInput value={cost} onChangeText={onChangeCost} keyboardType='numeric' style={[styles.input, { width: 80 }]}  placeholder='10000'/>
                            <Text style={styles.currency}>тнг</Text>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.field, { width: 160 }]}>
                            <Text style={styles.titleField}>Cтарая цена цена</Text>
                            <TextInput value={oldCost} onChangeText={onChangeOldCost} keyboardType='numeric' style={[styles.input, { width: 80 }]} placeholder='25000'/>
                            <Text style={styles.currency}>тнг</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>Название</Text>
                        <TextInput value={name} onChangeText={onChangeName} style={styles.input} placeholder='Название продукта'/>
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>Описание</Text>
                        <TextInput value={description} onChangeText={onChangeDescription} style={styles.input} placeholder='Описание продукта'/>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Сохранить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Отмена</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default EditInfo;
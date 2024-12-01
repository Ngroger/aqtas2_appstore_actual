import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import styles from '../../../../styles/EditAdditionalInfoStyle';
import { MaterialIcons } from '@expo/vector-icons';
import EditDelivery from './EditDelivery';
import { useState, useEffect } from 'react';
import EditCategory from './EditCategory';
import ChangeColor from '../ChangeColor';
import { getUserData } from '../../../../store/userDataManager';

function EditAdditionalInfo({ onClose, productId }) {
    const [isChangeDelivery, setChangeDelivery] = useState(false);
    const [isChangeCategory, setChangeCategory] = useState(false);
    const [isChangeColor, setChangeColor] = useState(false);
    const [manufacturer, onChangeManufacturer] = useState();
    const [color, setColor] = useState();
    const [brend, onChangeBrend] = useState();
    const [category, setCategory] = useState();
    const [delivery, setDelivery] = useState();
    const [userData, setUserData] = useState({});

    const toggleChangeDelivery = () => {
        setChangeDelivery(!isChangeDelivery);
    }

    const toggleChangeCategory = () => {
        setChangeCategory(!isChangeCategory);
    }

    const toggleChangeColor = () => {
        setChangeColor(!isChangeColor);
    }

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handleDeliverySelect = (selectedDelivery) => {
        setDelivery(selectedDelivery);
    };

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor);
    };

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const saveChanges = () => {
        // Проверка и замена пустых значений на NULL
        const postData = {
            manufacturer: manufacturer !== '' ? manufacturer : null,
            color: color !== '' ? color : null,
            brend: brend !== '' ? brend : null,
            category: category !== '' ? category : null,
            delivery: delivery !== '' ? delivery : null
        };

        // Отправка данных на сервер
        fetch(`https://aqtas.garcom.kz/updateAdditionalProduct/${userData.userId}/${productId}`, {
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
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.title}>Изменение данных</Text>
                    <Text style={styles.subtitle}>В этом поле вы можете изменить дополнительную информацию о вашем продукте</Text>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>Прозводитель </Text>
                        <TextInput value={manufacturer} onChangeText={onChangeManufacturer} style={styles.input} placeholder='Название производителя' />
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>Цвет</Text>
                        <Text style={styles.input}>{color}</Text>
                        <TouchableOpacity onPress={toggleChangeColor}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>Бренд</Text>
                        <TextInput value={brend} onChangeText={onChangeBrend} style={styles.input} placeholder='Бренд' />
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>Категория</Text>
                        <Text style={styles.input}>{category}</Text>
                        <TouchableOpacity onPress={toggleChangeCategory}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>Доставка</Text>
                        <Text style={styles.input}>{delivery}</Text>
                        <TouchableOpacity onPress={toggleChangeDelivery}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                        </TouchableOpacity>
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
            {isChangeDelivery && <EditDelivery onDeliverySelect={handleDeliverySelect} onClose={toggleChangeDelivery} />}
            {isChangeCategory && <EditCategory onCategorySelect={handleCategorySelect} onClose={toggleChangeCategory} />}
            {isChangeColor && <ChangeColor onColorSelect={handleColorSelect} onClose={toggleChangeColor} />}
        </View>
    )
};

export default EditAdditionalInfo;
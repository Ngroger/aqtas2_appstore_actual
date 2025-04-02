import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../../store/userDataManager';
import styles from '../../../../styles/EditAdditionalInfoStyle';
import ChangeColor from '../ChangeColor';
import EditCategory from './EditCategory';
import EditDelivery from './EditDelivery';

function EditAdditionalInfo({ data, onClose, productId }) {
    const [isChangeDelivery, setChangeDelivery] = useState(false);
    const [isChangeCategory, setChangeCategory] = useState(false);
    const [isChangeColor, setChangeColor] = useState(false);
    const [manufacturer, onChangeManufacturer] = useState(data.manufacturer);
    const [color, setColor] = useState(data.color);
    const [brend, onChangeBrend] = useState(data.brend);
    const [category, setCategory] = useState(data.category);
    const [delivery, setDelivery] = useState();
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState();
    const { t } = useTranslation();

    console.log(data.color)

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
        // Проверка на заполненность полей
        if (!manufacturer || !color || !brend || !category) {
            setMessage(t("edit-info.all-fields"));
            return;
        }

        setMessage("");

        const postData = {
            manufacturer: manufacturer !== '' ? manufacturer : null,
            color: color !== '' ? color : null,
            brend: brend !== '' ? brend : null,
            category: category !== '' ? category : null,
            delivery: delivery !== '' ? delivery : null,
        };

        fetch(`https://aqtas.garcom.kz/api/updateAdditionalProduct/${userData.userId}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data => {
                setMessage("");
                alert(t("edit-info.success"))
                onClose();
            })
            .catch(error => {
                console.log("Ошибка при сохранении изменений:", error);
                setMessage(t("edit-info.server-error"));
            });
    };




    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.title}>{t("edit-info.title")}</Text>
                    <Text style={styles.subtitle}>{t("edit-info.description-second")}</Text>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>{t("edit-info.manufacturer-title")}</Text>
                        <TextInput
                            value={manufacturer}
                            onChangeText={onChangeManufacturer}
                            style={styles.input}
                            placeholder={t("edit-info.manufacturer-placeholder")}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>{t("edit-info.color-title")}</Text>
                        <TextInput
                            value={color}
                            editable={false}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={toggleChangeColor}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>{t("edit-info.brend-title")}</Text>
                        <TextInput
                            value={brend}
                            onChangeText={onChangeBrend}
                            style={styles.input}
                            placeholder={t("edit-info.brend-placeholder")}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>{t("edit-info.category-title")}</Text>
                        <TextInput
                            value={category}
                            editable={false}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={toggleChangeCategory}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View>
                    <View style={styles.field}>
                        <Text style={styles.titleField}>Доставка</Text>
                        <Text style={styles.input}>{delivery}</Text>
                        <TouchableOpacity onPress={toggleChangeDelivery}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                        </TouchableOpacity>
                    </View>
                </View> */}
                <Text style={styles.error}>{message}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>{t("edit-info.save-btn")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>{t("edit-info.cancel-btn")}</Text>
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
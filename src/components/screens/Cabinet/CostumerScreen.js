import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import styles from '../../../styles/CustomerScreenStyle';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getUserData } from '../../../store/userDataManager';
import { useEffect } from 'react';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import CategoryShop from '../../ux/popup/CategoryShop';
import SuccessCreatedShop from '../../ux/popup/messages/SuccessCreatedShop';

function CustomerScreen() {
    const navigation = useNavigation();

    const [name, changeName] = useState('');
    const [isFocusName, setFocusName] = useState(false);
    const [isNameError, setNameError] = useState(false);

    const [category, setCategory] = useState(`Выберите категорию`);
    const [isCategoryShopModal, setIsCategoryShopModal] = useState(false);
    const [isCategoryError, setIsCategoryError] = useState(false);

    const [phone, changePhone] = useState('');
    const [isFocusPhone, setFocusPhone] = useState(false);
    const [isPhoneError, setIsPhoneError] = useState(false);

    const [adress, changeAdress] = useState('');
    const [isFocusAdress, setFocusAdress] = useState(false);
    const [isAdressError, setIsAdressError] = useState(false);

    const [isChoiseImage, setChoiseImage] = useState(false);

    const [bin, changeBin] = useState('');
    const [isFocusBin, setFocusBin] = useState(false);
    const [isBinError, setIsBinError] = useState(false);

    const [iin, changeIin] = useState('');
    const [isFocusIin, setFocusIin] = useState(false);
    const [isIinError, setIsIinError] = useState(false);

    const [userData, setUserData] = useState({});

    const [image, setImage] = useState(null);
    const [isImageError, setIsImageError] = useState(false);

    const [isMessage, setMessage] = useState(false);

    const [isErrorMessage, setIsErrorMessage] = useState(false);

    useEffect(() => {
        loadUserData();
    }, []);

    const toggleCategoryModal = () => {
        setIsCategoryShopModal(!isCategoryShopModal);
    };

    const handleCategoryShopySelect = (selectedDelivery) => {
        setCategory(selectedDelivery);
    };

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData); // Установка данных пользователя в состояние
        }
    };

    const toggleSetMessage = () => {
        setMessage(!isMessage);
    }

    const createShop = async () => {
        if (!name || !phone || !adress || !image || !category || !bin || !iin) {
            setIsErrorMessage(true);
            setNameError(name.length <= 2);
            setIsPhoneError(phone.length !== 11);
            setIsAdressError(adress.length <= 2);
            setIsImageError(image === null);
            setIsCategoryError(category === 'Выберите категорию');
            setIsBinError(bin.length !== 12);
            setIsIinError(iin.length !== 12);
        } else {
            setIsErrorMessage(false);
            // Создайте объект Date для получения текущей даты и времени
            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            const formData = new FormData();
            formData.append('nameShop', name);
            formData.append('adress', adress);
            formData.append('phone', phone);
            formData.append('costumer', userData.fullname + ' ' + userData.surname);
            formData.append('category', category);
            formData.append('userId', userData.userId);
            formData.append('bin', bin);
            formData.append('iin', iin);
            formData.append('timeRegistration', formattedDate);
            if (image) {
                formData.append('imageSale', {
                    uri: image,
                    name: 'image.jpg',
                    type: 'image/jpeg',
                });
            }

            try {
                const response = await fetch('https://aqtas.garcom.kz/addShop', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    toggleSetMessage()
                } else {
                    // Обработка ошибки
                    const errorData = await response.json();
                }
            } catch (error) {
            }
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Разрешение на доступ к галерее не предоставлено');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Обновленный способ доступа к URI
        }
    };

    const takeImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Разрешение на использование камеры не предоставлено');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Обновленный способ доступа к URI
        }
    };

    const toggleChoiseImageModal = () => {
        setChoiseImage(!isChoiseImage)
    }

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        <Text style={styles.title}>Стать продавцом</Text>
                    </TouchableOpacity>
                    <View style={styles.photoContainer}>
                        <Text style={styles.fieldTitle}>Фото магазина</Text>
                        <View style={image === null ? styles.photoBorder : { ...styles.photoBorder, borderWidth: 0 }}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.photo} />
                            ) : (
                                <Image resizeMode='cover' style={styles.photo} />
                            )}
                            {image === null ? (
                                <TouchableOpacity onPress={toggleChoiseImageModal} style={styles.photoButton}>
                                    <Feather name="camera" size={30} color="#95E5FF" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={toggleChoiseImageModal} style={styles.photoButton}>
                                    <AntDesign name="close" size={30} color="#95E5FF" />
                                </TouchableOpacity>
                            )}
                        </View>
                        {isImageError && <Text style={[styles.error, { width: 250 }]}>Фото обязательно должно быть выбрано</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusName ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>Название</Text>
                        <View style={isNameError ? styles.errorField : styles.field}>
                            <Text style={isFocusName ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>Название</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Введите название...'
                                onFocus={() => setFocusName(true)}
                                onBlur={() => setFocusName(false)}
                                value={name}
                                onChangeText={changeName}
                            />
                        </View>
                        {isNameError && <Text style={styles.error}>Название должно быть свыше 2 символов</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusPhone ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>Контактный номер</Text>
                        <View style={isPhoneError ? styles.errorField : styles.field}>
                            <Text style={isFocusPhone ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>Контактный номер</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Введите контактный номер...'
                                keyboardType='numeric'
                                maxLength={11}
                                onFocus={() => setFocusPhone(true)}
                                onBlur={() => setFocusPhone(false)}
                                value={phone}
                                onChangeText={changePhone}
                            />
                        </View>
                        {isPhoneError && <Text style={styles.error}>Телефон должен быть 11 символов</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusAdress ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>Адрес</Text>
                        <View style={isAdressError ? styles.errorField : styles.field}>
                            <Text style={isFocusAdress ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>Адрес</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Введите адрес...'
                                onFocus={() => setFocusAdress(true)}
                                onBlur={() => setFocusAdress(false)}
                                value={adress}
                                onChangeText={changeAdress}
                            />
                        </View>
                        {isAdressError && <Text style={styles.error}>Адрес должен быть свыше 2 символов</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusName ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>Выберите категорию</Text>
                        <View style={isCategoryError ? styles.errorField : styles.field}>
                            <Text style={styles.input}>{category}</Text>
                            <TouchableOpacity onPress={toggleCategoryModal}>
                                <AntDesign name="right" size={24} color="#95E5FF" />
                            </TouchableOpacity>
                        </View>
                        {isCategoryError && <Text style={styles.error}>Вы должна выбрать категорию</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusBin ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>БИН</Text>
                        <View style={isBinError ? styles.errorField : styles.field}>
                            <Text style={isFocusBin ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>БИН</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Введите БИН'
                                keyboardType='numeric'
                                maxLength={12}
                                onFocus={() => setFocusBin(true)}
                                onBlur={() => setFocusBin(false)}
                                value={bin}
                                onChangeText={changeBin}
                            />
                        </View>
                        {isBinError && <Text style={styles.error}>БИН должен быть 12 символов</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusIin ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>ИИН</Text>
                        <View style={isIinError ? styles.errorField : styles.field}>
                            <Text style={isFocusIin ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>ИИН</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите ИИН..."
                                keyboardType='numeric'
                                maxLength={12}
                                onFocus={() => setFocusIin(true)}
                                onBlur={() => setFocusIin(false)}
                                value={iin}
                                onChangeText={changeIin}
                            />
                        </View>
                        {isIinError && <Text style={styles.error}>ИИН должен быть 12 символов</Text>}
                    </View>
                    <View style={{ marginTop: 40 }}>
                        {isErrorMessage && <Text style={styles.error}>Все поля обязательны к заполнению</Text>}
                        <TouchableOpacity onPress={createShop} style={styles.createButton}>
                            <Text style={styles.createButtonText}>Создать магазин</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {isChoiseImage &&
                <View style={styles.background}>
                    <View style={styles.containerChoiseImage}>
                        <TouchableOpacity onPress={toggleChoiseImageModal}>
                            <AntDesign name="close" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takeImage} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>Сделать фото</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>Выбрать фото</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {isCategoryShopModal && <CategoryShop onCategorySelect={handleCategoryShopySelect} onClose={toggleCategoryModal} />}
            {isMessage && <SuccessCreatedShop onClose={toggleSetMessage} />}
        </View>
    )
};

export default CustomerScreen;
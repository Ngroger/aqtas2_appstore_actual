import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/CustomerScreenStyle';
import CategoryShop from '../../ux/popup/CategoryShop';
import SuccessCreatedShop from '../../ux/popup/messages/SuccessCreatedShop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomerScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();

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

    const [isLoad, setIsLoad] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    const insets = useSafeAreaInsets();

    const getBtnTxt = _ => {
        if (isSuccess) return "success-btn"
        else if (isFailure) return "failure-btn"
        else if (isLoad) return "in-proccess-btn"
        else return "create-shop-btn"
    };

    const getBtnStyles = _ => {
        if (isSuccess) return "#61c427"
        else if (isFailure) return "#FF0000"
        else if (isLoad) return "#26CFFF"
        else return "#26CFFF"
    };

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
        setIsLoad(true);
        if (!name || !phone || !adress || !image || !category || !bin || !iin) {
            setIsLoad(false);
            setIsFailure(true);
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
                const response = await fetch('https://aqtas.garcom.kz/api/addShop', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const responseJson = await response.json();

                if (responseJson.success) {
                    toggleSetMessage();
                    setIsLoad(false);
                    setSuccess(true);
                } else {
                    toggleSetMessage();
                    setIsFailure(true);
                    setIsLoad(false);
                };

            } catch (error) {
                setIsLoad(false);
                setIsFailure(false);
            } finally {
                setIsLoad(false);
                setSuccess(false);
                setIsFailure(false);
            }
        }
    };

    const handleBtn = _ => {
        if (isSuccess) return handleGoBack();
        else return createShop();
    }

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
        <View style={{ backgroundColor: '#FFF' }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                <ScrollView style={styles.container}>
                    <TouchableOpacity style={[styles.titleContainer, { marginTop: 38 }]} onPress={handleGoBack}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        <Text style={styles.title}>{t("customer-screen.title")}</Text>
                    </TouchableOpacity>
                    <View style={styles.photoContainer}>
                        <Text style={styles.fieldTitle}>{t("customer-screen.photo-shop")}</Text>
                        <View style={image === null ? styles.photoBorder : { ...styles.photoBorder, borderWidth: 0 }}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.photo} />
                            ) : (
                                <Image resizeMode='cover' style={styles.photo} />
                            )}
                            {image === null ? (
                                <TouchableOpacity onPress={toggleChoiseImageModal} style={styles.photoButton}>
                                    <Feather name="camera" size={30} color="#26CFFF" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={toggleChoiseImageModal} style={styles.photoButton}>
                                    <AntDesign name="close" size={30} color="#26CFFF" />
                                </TouchableOpacity>
                            )}
                        </View>
                        {isImageError && <Text style={[styles.error, { width: 250 }]}>{t("customer-screen.no-photo")}</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusName ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>{t("customer-screen.name-title")}</Text>
                        <View style={isNameError ? styles.errorField : styles.field}>
                            <Text style={isFocusName ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>{t("customer-screen.name-title")}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("customer-screen.name-placeholder")}
                                onFocus={() => setFocusName(true)}
                                onBlur={() => setFocusName(false)}
                                value={name}
                                onChangeText={changeName}
                            />
                        </View>
                        {isNameError && <Text style={styles.error}>{t("customer-screen.name-limit")}</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusPhone ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>
                            {t("customer-screen.phone-title")}
                        </Text>
                        <View style={isPhoneError ? styles.errorField : styles.field}>
                            <Text style={isFocusPhone ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>{t("customer-screen.phone-title")}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("customer-screen.phone-placeholder")}
                                keyboardType='numeric'
                                maxLength={11}
                                onFocus={() => setFocusPhone(true)}
                                onBlur={() => setFocusPhone(false)}
                                value={phone}
                                onChangeText={changePhone}
                            />
                        </View>
                        {isPhoneError && <Text style={styles.error}>{t("customer-screen.phone-limit")}</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusAdress ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>Адрес</Text>
                        <View style={isAdressError ? styles.errorField : styles.field}>
                            <Text style={isFocusAdress ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>{t("customer-screen.address-title")}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("customer-screen.address-placeholder")}
                                onFocus={() => setFocusAdress(true)}
                                onBlur={() => setFocusAdress(false)}
                                value={adress}
                                onChangeText={changeAdress}
                            />
                        </View>
                        {isAdressError && <Text style={styles.error}>{t("customer-screen.address-limit")}</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusName ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>
                            {t("customer-screen.category-title")}
                        </Text>
                        <View style={isCategoryError ? styles.errorField : styles.field}>
                            <TextInput value={category} style={styles.input} readOnly={true} />
                            <TouchableOpacity onPress={toggleCategoryModal}>
                                <AntDesign name="right" size={24} color="#26CFFF" />
                            </TouchableOpacity>
                        </View>
                        {isCategoryError && <Text style={styles.error}>{t("customer-screen.category-request")}</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusBin ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>
                            {t("customer-screen.bin-title")}
                        </Text>
                        <View style={isBinError ? styles.errorField : styles.field}>
                            <Text style={isFocusBin ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>
                                {t("customer-screen.bin-title")}
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("customer-screen.bin-placeholder")}
                                keyboardType='numeric'
                                maxLength={12}
                                onFocus={() => setFocusBin(true)}
                                onBlur={() => setFocusBin(false)}
                                value={bin}
                                onChangeText={changeBin}
                            />
                        </View>
                        {isBinError && <Text style={styles.error}>{t("customer-screen.bin-limit")}</Text>}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={isFocusIin ? [styles.fieldTitle, { display: 'none' }] : styles.fieldTitle}>
                            {t("customer-screen.iin-title")}
                        </Text>
                        <View style={isIinError ? styles.errorField : styles.field}>
                            <Text style={isFocusIin ? styles.activeFieldTitle : [styles.activeFieldTitle, { display: 'none' }]}>
                                {t("customer-screen.iin-title")}
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("customer-screen.iin-placeholder")}
                                keyboardType='numeric'
                                maxLength={12}
                                onFocus={() => setFocusIin(true)}
                                onBlur={() => setFocusIin(false)}
                                value={iin}
                                onChangeText={changeIin}
                            />
                        </View>
                        {isIinError &&
                            <Text style={styles.error}>
                                {t("customer-screen.bin-limit")}
                            </Text>
                        }
                    </View>
                    <View style={{ marginTop: 16, marginBottom: 16 }}>
                        {isErrorMessage && <Text style={styles.error}>
                            {t("customer-screen.all-fields-request")}
                        </Text>}
                        <TouchableOpacity disabled={isLoad} onPress={() => handleBtn()} style={[styles.createButton, { backgroundColor: getBtnStyles(), marginBottom: insets.bottom }]}>
                            <Text style={styles.createButtonText}>
                                {t(`customer-screen.${getBtnTxt()}`)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {isChoiseImage &&
                <View style={styles.background}>
                    <View style={[styles.containerChoiseImage, { paddingBottom: insets.bottom }]}>
                        <TouchableOpacity onPress={toggleChoiseImageModal}>
                            <AntDesign name="close" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takeImage} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>{t("take-photo-button")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>{t("pick-photo-button")}</Text>
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
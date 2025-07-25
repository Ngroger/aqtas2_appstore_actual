import { AntDesign, EvilIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { updateUserData } from '../../../store/userDataManager';
import styles from '../../../styles/PersonalScreenStyle';
import ChangePassword from '../../ux/popup/ChangePassword';
import ChangePhone from '../../ux/popup/changePhone';
import ChangeSex from '../../ux/popup/ChangeSex';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function PersonalDate() {
    const navigation = useNavigation();
    const route = useRoute();
    const userData = route.params.userData;
    const [name, onChangeName] = useState(userData.fullname);
    const [isNameChanged, setIsNameChanged] = useState(false);
    const [showErrorName, setShowErrorName] = useState(false);

    const [surname, onChangeSurname] = useState(userData.surname);
    const [isSurnameChanged, setIsSurnameChanged] = useState(false);
    const [showErrorSurname, setShowErrorSurname] = useState(false);

    const [phone, onChangePhone] = useState(userData.phoneNumber);
    const [isPhoneChanged, setIsPhoneChanged] = useState(false);
    const [showErrorPhone, setShowErrorPhone] = useState(false);

    const [isChangePhoneModal, setChangePhoneModal] = useState(false);
    const [isPasswordModal, setPasswordModal] = useState(false);
    const [isSexModal, setSexModal] = useState(false);

    const [sex, onChangeSex] = useState(userData.sex);

    const [birthday, onChangeBirthday] = useState(userData.birthday)
    const [isBirthdayChanged, setIsBirthdayChanged] = useState(false);
    const [showErrorBirthday, setShowErrorBirthday] = useState(false);

    const [address, onChangeAddress] = useState(userData.address);
    const [isAddressChanged, setIsAddressChanged] = useState(false);
    const [showErrorAddress, setShowErrorAddress] = useState(false);

    const [isChoiseImage, setChoiseImage] = useState(false);

    const insets = useSafeAreaInsets();

    const { t } = useTranslation();

    const toggleChoiseImage = () => {
        setChoiseImage(!isChoiseImage)
    }

    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            uploadImage(result.assets[0].uri);
            setChoiseImage(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Отправка изображения на сервер
            uploadImage(result.assets[0].uri);
            setChoiseImage(false);
        }
    };

    const generateRandomId = () => {
        return Math.random().toString().slice(2, 20);
    };

    const uploadImage = async (imageUri) => {
        const userId = userData.userId;

        const formData = new FormData();
        const uniqueId = generateRandomId();
        const imageName = `photoUser${userId}_${uniqueId}.png`;

        formData.append('userId', userId);
        formData.append('image', {
            uri: imageUri,
            type: 'image/png',
            name: imageName,
        });

        // Use the fetch API to send the image to the server for upload
        fetch('https://aqtas.garcom.kz/api/uploadImage', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.success) {
                    // Update the user's image in your local state or storage
                    console.log("data.image", data.image)
                    await updateUserData({ photoUser: data.image });

                    alert(t("avatar-updated"));

                }
            })
            .catch((error) => {

            });
    };

    // Функция для обработки нажатия кнопки "назад"
    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const handleNameChange = (text) => {
        onChangeName(text);
        setIsNameChanged(true);
        if (text.length < 2) {
            setShowErrorName(true);
        } else {
            setShowErrorName(false);
        }
    };

    const handleSavePressName = () => {
        if (name.length < 2) {
            setShowErrorName(true);
        } else {
            // Сохранить имя и выполнить соответствующие действия
            setIsNameChanged(false);
            setShowErrorName(false);
            const userID = userData.userId;
            fetch('https://aqtas.garcom.kz/api/changeName', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: userID, fullname: name }), // Используйте newName вместо fullname
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.success) {
                        // Обновите имя в UserManager или локальном хранилище
                        await updateUserData({ fullname: name });
                    } else {

                    }
                })
                .catch((error) => {

                });
        }
    };

    const handleSurnameChange = (text) => {
        onChangeSurname(text);
        setIsSurnameChanged(true);
        if (text.length < 2) {
            setShowErrorSurname(true);
        } else {
            setShowErrorSurname(false);
        }
    };

    const handleSavePressSurname = () => {
        if (surname.length < 2) {
            setShowErrorSurname(true);
        } else {
            // Сохранить имя и выполнить соответствующие действия
            setIsSurnameChanged(false);
            setShowErrorSurname(false);
            const userID = userData.userId;
            fetch('https://aqtas.garcom.kz/api/changeSurname', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, surname: surname }),
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.success) {
                        await updateUserData({ surname: surname });
                    }
                })
                .catch((error) => {

                });
        }
    };
    const handlePhoneChange = (text) => {
        onChangePhone(text);
        setIsPhoneChanged(true);
        if (text.length < 2) {
            setShowErrorPhone(true);
        } else {
            setShowErrorPhone(false);
        }
    };

    const handleSavePressPhone = () => {
        if (phone.length < 10) {
            setShowErrorPhone(true);
        } else {
            const userID = userData.userId;
            setShowErrorPhone(false);
            setIsPhoneChanged(false);
            fetch('https://aqtas.garcom.kz/api/changePhone', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: userID, phone: phone }),
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.success) {
                        await updateUserData({ phoneNumber: phone });
                    }
                })
                .catch((error) => {

                });
        }
    };

    const handleBirthdayChange = (text) => {
        let formattedText = text.replace(/[^0-9]/g, ''); // Убираем все символы, кроме цифр

        if (formattedText.length > 2) {
            formattedText = `${formattedText.slice(0, 2)}.${formattedText.slice(2)}`;
        }
        if (formattedText.length > 5) {
            formattedText = `${formattedText.slice(0, 5)}.${formattedText.slice(5)}`;
        }

        onChangeBirthday(formattedText);
        setIsBirthdayChanged(true);

        if (formattedText.length < 10) {
            setShowErrorBirthday(true);
        } else {
            setShowErrorBirthday(false);
        }
    };

    const handleSavePressBirthday = () => {
        // Функция для проверки корректности формата даты
        const isValidDate = (dateString) => {
            const regex = /^\d{2}\.\d{2}\.\d{4}$/;
            if (!regex.test(dateString)) return false;

            const [day, month, year] = dateString.split('.').map(Number);
            const date = new Date(year, month - 1, day);

            return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        };

        if (!isValidDate(birthday)) {
            setShowErrorBirthday(true);
        } else {
            // Сохранить дату рождения и выполнить соответствующие действия
            setIsBirthdayChanged(false);
            setShowErrorBirthday(false);
            fetch('https://aqtas.garcom.kz/api/updateUserBirthday', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userData.userId, date: birthday }),
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.message) {
                        const updatedUserData = await updateUserData({ birthday: birthday });
                    } else {
                        // Обработка ошибки
                    }
                })
                .catch((error) => {
                    // Обработка ошибки
                });
        }
    };


    const handleAddressChange = (text) => {
        onChangeAddress(text);
        setIsAddressChanged(true);
        if (text.length < 5) {
            setShowErrorAddress(true);
        } else {
            setShowErrorAddress(false);
        }
    };

    const toggleChangePhoneModal = () => {
        setChangePhoneModal(!isChangePhoneModal);
    };

    const togglePasswordModal = () => {
        setPasswordModal(!isPasswordModal);
    };

    const toggleSexModal = () => {
        setSexModal(!isSexModal);
    };

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: '#FFF', }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={{ flex: 1, marginTop: Platform.OS === 'android' && 36 }}>
                <ScrollView style={styles.container}>
                    <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        <Text style={styles.title}>{t('personal-data-profile-button')}</Text>
                    </TouchableOpacity>
                    <View style={styles.photoContainer}>
                        <View>
                            <Image
                                source={{ uri: `https://aqtas.garcom.kz/api/images/photoUsers/${userData.photoUser}` }}
                                style={styles.photo}
                            />
                            {image === null ? (
                                <>
                                    <TouchableOpacity onPress={toggleChoiseImage} style={styles.addPhoto}>
                                        <EvilIcons name="camera" size={18} color="black" />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity onPress={() => (setImage(null))} style={styles.addPhoto}>
                                        <AntDesign name="delete" size={18} color="#FF0000" />
                                    </TouchableOpacity>
                                </>
                            )
                            }
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.firstInfo}>{t('name')}:</Text>
                            <TextInput value={name} onChangeText={handleNameChange} style={styles.secondInfo} />
                            {showErrorName && (
                                <Text style={styles.error}>{t('above-two-symbol-message')}</Text>
                            )}
                        </View>
                        {isNameChanged && (
                            <TouchableOpacity onPress={handleSavePressName} >
                                <AntDesign name="save" size={24} color="black" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.firstInfo}>{t('surname')}:</Text>
                            <TextInput value={surname} onChangeText={handleSurnameChange} style={styles.secondInfo} />
                            {showErrorSurname && (
                                <Text style={styles.error}>{t('above-two-symbol-message')}</Text>
                            )}
                        </View>
                        {isSurnameChanged && (
                            <TouchableOpacity onPress={handleSavePressSurname} >
                                <AntDesign name="save" size={24} color="black" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.firstInfo}>{t('phone-number')}:</Text>
                            <TextInput maxLength={11} keyboardType='numeric' value={phone} onChangeText={handlePhoneChange} style={styles.secondInfo} />
                            {showErrorPhone && (
                                <Text style={styles.error}>{t('above-eleven-symbol-message')}</Text>
                            )}
                        </View>
                        {isPhoneChanged && (
                            <TouchableOpacity onPress={handleSavePressPhone} >
                                <AntDesign name="save" size={24} color="black" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.firstInfo}>{t('password')}:</Text>
                            <Text style={styles.secondInfo}>********</Text>
                        </View>
                        <TouchableOpacity onPress={togglePasswordModal}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.firstInfo}>{t('sex-personal-data')}:</Text>
                            <Text style={styles.secondInfo}>{sex}</Text>
                        </View>
                        <TouchableOpacity onPress={toggleSexModal}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.firstInfo}>{t('birthday-personal-data')}:</Text>
                            <TextInput maxLength={10} keyboardType='numeric' value={birthday} onChangeText={handleBirthdayChange} style={styles.secondInfo} />
                            {showErrorSurname && (
                                <Text style={styles.error}>{t('uncorrect-format-date')}</Text>
                            )}
                        </View>
                        {isBirthdayChanged && (
                            <TouchableOpacity onPress={handleSavePressBirthday} >
                                <AntDesign name="save" size={24} color="black" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.firstInfo}>{t('address-personal-data')}:</Text>
                            <TextInput value={address} readOnly={true} style={styles.secondInfo} />
                            {showErrorAddress && (
                                <Text style={styles.error}>{t('above-two-symbol-message')}</Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('SelectAddress')} style={styles.mapBtn}>
                            <Text style={styles.mapBtnTxt}>Карта</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {isChangePhoneModal && <ChangePhone onClose={toggleChangePhoneModal} userId={userData.userId} phone={phone} />}
            {isPasswordModal && <ChangePassword onClose={togglePasswordModal} userId={userData.userId} />}
            {isSexModal && <ChangeSex onClose={toggleSexModal} userId={userData.userId} onChangeSex={onChangeSex} />}
            {isChoiseImage &&
                <View style={styles.background}>
                    <View style={[styles.containerChoiseImage, { paddingBottom: insets.bottom }]}>
                        <TouchableOpacity onPress={toggleChoiseImage}>
                            <AntDesign name="close" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePhoto} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>{t('take-photo-button')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>{t('pick-photo-button')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <StatusBar backgroundColor='transparent' translucent={true} />
        </SafeAreaView>
    );
}

export default PersonalDate;
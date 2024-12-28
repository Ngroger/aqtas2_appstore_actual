import { Text, TouchableOpacity, View, StatusBar, Image, TextInput, ScrollView } from 'react-native';
import styles from '../../../styles/AddSaleScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getUserData } from '../../../store/userDataManager';
import * as ImagePicker from 'expo-image-picker';
import SelectSeason from '../../ux/popup/SelectSeason';
import { useTranslation } from 'react-i18next';

function AddSaleScreen() {
    const navigation = useNavigation();
    const [name, onChangeName] = useState('');
    const [isNameError, setNameError] = useState(false);

    const [description, onChangeDescription] = useState('');
    const [isDescrtiptionError, setDescriptionError] = useState(false);

    const [precent, onChangePresent] = useState();
    const [isPrecentError, setPrecentError] = useState(false);

    const [userData, setUserData] = useState({});
    const [isChoiseImage, setChoiseImage] = useState(false);
    const [image, setImage] = useState();
    const [seasonSelected, setSeasonSelected] = useState();
    const [isSelectedSeasonShowMenu, setSelectedSeasonShowMenu] = useState(false);
    const [isSelectedSeasonError, setSelectedSeasonError] = useState(false);

    const [isErrorMessage, setIsErrorMessage] = useState(false);

    const { t } = useTranslation();

    const toggleSetSeasonShowMenu = () => {
        setSelectedSeasonShowMenu(!isSelectedSeasonShowMenu);
    }

    const toggleSetSeasonSelected = (season) => {
        setSeasonSelected(season);
    }

    const choiseImage = () => {
        setChoiseImage(!isChoiseImage)
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
            setImage(result.assets[0].uri);
            setChoiseImage(false);
        }
    };

    const takePhoto = async () => {
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
            setImage(result.assets[0].uri);
            setChoiseImage(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    }

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const deleteImage = () => {
        setImage(null)
    }

    const addSale = async () => {
        if (!name || !precent || !seasonSelected) {
            setIsErrorMessage(true);
            setNameError(name.length <= 2);
            setDescriptionError(description.length <= 5);
            setPrecentError(precent !== null);
            setSelectedSeasonError(!seasonSelected);
        } else {
            setIsErrorMessage(false);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('percent', precent);
            formData.append('userId', userData.userId);
            formData.append('season', seasonSelected);
            if (image) {
                formData.append('imageSale', {
                    uri: image,
                    name: 'image.jpg',
                    type: 'image/jpeg',
                });
            }

            try {
                const response = await fetch('https://aqtas.garcom.kz/api/addSale', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    // Обработка успешного ответа
                    alert('Акция успешно добавлена');
                    handleGoBack();
                } else {
                    // Обработка ошибки
                    alert('Ошибка при добавлении акции');
                }
            } catch (error) {
                alert('Ошибка при выполнении запроса');
            }
        }
    };

    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={{ padding: 24 }}>
                    <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        <Text style={styles.title}>{t("add-sale-screen.title")}</Text>
                    </TouchableOpacity>
                    <View style={styles.photoContainer}>
                        <Text style={styles.photoTitle}>
                            {t("add-sale-screen.photo-title")}
                        </Text>
                        <View style={image ? { ...styles.photoPick, borderWidth: 0 } : styles.photoPick}>
                            <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                            <TouchableOpacity onPress={image ? deleteImage : choiseImage} style={styles.photoPickButton}>
                                {image ? <AntDesign name="close" size={30} color="#95E5FF" /> : <Feather name="camera" size={30} color="#95E5FF" />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.titleField}>
                            {t("add-sale-screen.name-title")}
                        </Text>
                        <View style={isNameError ? styles.errorField : styles.field}>
                            <TextInput
                                value={name}
                                onChangeText={onChangeName}
                                style={styles.input}
                                placeholder={t("add-sale-screen.name-placeholder")}
                            />
                        </View>
                        {isNameError &&
                            <Text style={styles.error}>
                                {t("add-sale-screen.name-title")}
                            </Text>
                        }
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.titleField}>
                            {t("add-sale-screen.description-title")}
                        </Text>
                        <View style={isDescrtiptionError ? styles.errorField : styles.field}>
                            <TextInput
                                value={description}
                                onChangeText={onChangeDescription}
                                style={styles.input}
                                placeholder={t("add-sale-screen.description-placeholder")}
                            />
                        </View>
                        {isDescrtiptionError &&
                            <Text style={styles.error}>
                                {t("add-sale-screen.description-limit")}
                            </Text>
                        }
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.titleField}>
                            {t("add-sale-screen.percent-title")}
                        </Text>
                        <View style={isPrecentError ? styles.errorField : styles.field}>
                            <TextInput
                                value={precent}
                                onChangeText={onChangePresent}
                                keyboardType='numeric'
                                style={styles.input}
                                placeholder={t("add-sale-screen.percent-placeholder")}
                            />
                        </View>
                        {isPrecentError &&
                            <Text style={styles.error}>
                                {t("add-sale-screen.field-request")}
                            </Text>
                        }
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.titleField}>
                            {t("add-sale-screen.season-title")}
                        </Text>
                        <View style={isSelectedSeasonError ? [styles.errorField, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', display: 'flex', padding: 12 }] : [styles.field, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', display: 'flex', padding: 12 }]}>
                            <Text style={styles.input}>
                                {seasonSelected == null ? t("add-sale-screen.season-placeholder") : seasonSelected}
                            </Text>
                            <TouchableOpacity onPress={toggleSetSeasonShowMenu}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                            </TouchableOpacity>
                        </View>
                        {isSelectedSeasonError &&
                            <Text style={styles.error}>
                                {t("add-sale-screen.field-request")}
                            </Text>
                        }
                    </View>
                </View>
                <View style={{ marginBottom: 64 }} />
            </ScrollView>
            <View style={styles.buttonContainer}>
                {isErrorMessage &&
                    <Text style={styles.error}>
                        {t("add-sale-screen.all-fields-request")}
                    </Text>
                }
                <TouchableOpacity onPress={addSale} style={styles.addSaleButton}>
                    <Text style={styles.addSaleButtonText}>
                        {t("add-sale-screen.create-sale-btn")}
                    </Text>
                </TouchableOpacity>
            </View>
            {isChoiseImage &&
                <View style={styles.background}>
                    <View style={styles.containerChoiseImage}>
                        <TouchableOpacity onPress={choiseImage}>
                            <AntDesign name="close" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePhoto} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>
                                {t("take-photo-button")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>
                                {t("pick-photo-button")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {isSelectedSeasonShowMenu && <SelectSeason onClose={toggleSetSeasonShowMenu} onSeasonSelect={toggleSetSeasonSelected} />}
            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    )
};

export default AddSaleScreen;
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserData } from '../../store/userDataManager';
import styles from '../../styles/EditProductStyles';
import AboutCostumer from '../ux/popup/AboutCostumer';
import EditAdditionalInfo from '../ux/popup/EditProduct/EditAdditionalInfo';
import EditInfo from '../ux/popup/EditProduct/EditInfo';
import UpToTop from '../ux/popup/EditProduct/UpToTop';

function EditProductScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const route = useRoute();
    const productData = route.params.productData;
    const [isShowAboutCostumer, setShowAboutCostumer] = useState(false);
    const [isShowEditInfo, setShowEditInfo] = useState(false);
    const [isShowEditAddtionalInfo, setShowAdditionalInfo] = useState(false);
    const [isLoad, setIsLoad] = useState(true);
    const [isUpToTop, setUpToTop] = useState(false);
    const [userData, setUserData] = useState({});
    const [customer, setCustomer] = useState([]);
    const [editProductId, setEditProductId] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [deletedImages, setDeletedImaged] = useState([]);
    const [isChoiseImage, setIsChoiseImage] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isProccessUpdate, setIsProccessUpdate] = useState(false);
    const [isSavePhotos, setIsSavePhotos] = useState(false);

    const insets = useSafeAreaInsets();

    useEffect(() => {
        const hasChanges = productImages.some((uri, i) => uri !== (productData[`imagePreview${i + 1}`] ?? null));
        setIsSavePhotos(hasChanges);
    }, [productImages]);


    useEffect(() => {
        loadUserData();

        const images = [];
        for (let i = 1; i <= 5; i++) {
            const key = `imagePreview${i}`;
            images.push(productData[key] ?? null); // null если ничего нет
        }
        setProductImages(images);
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setIsLoad(true);
            setUserData(userData);
            try {
                const response = await fetch(`https://aqtas.garcom.kz/api/customers/${userData.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("data: ", data);
                    setCustomer(data);
                    setIsLoad(false);
                } else {
                    setIsLoad(false);
                }
            } catch (error) {
                console.log("Get Customer Info Error: ", error);
            } finally {
                setIsLoad(false);
            }
        }
    };


    const toggleShowCostumer = () => {
        setShowAboutCostumer(!isShowAboutCostumer)
    }

    const toggleShowEditInfo = (productId) => {
        setShowEditInfo(!isShowEditInfo);
        setEditProductId(productId); // Установите значение productId в состоянии компонента EditProductScreen
    }

    const toggleShowAdditionalInfo = (productId) => {
        setShowAdditionalInfo(!isShowEditAddtionalInfo);
        setEditProductId(productId);
    }

    const toggleUpToTop = () => {
        setUpToTop(!isUpToTop);
    };

    function formatDateToDDMMYYYY(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
        const year = date.getFullYear();
        // Чтобы получить формат "ДД.ММ.ГГГГ", давайте проверим, нужно ли добавить ноль перед днем и месяцем, если они менее 10.
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        return `${formattedDay}.${formattedMonth}.${year}`;
    };

    const handleChoiseImage = (index) => {
        setSelectedImageIndex(index);
        setIsChoiseImage(true);
    }

    if (isLoad) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <Text style={styles.loadTxt}>{t("products-load-message")}</Text>
            </View>
        )
    };

    const takeImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Разрешение на использование камеры не предоставлено');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [6, 10],
        });

        if (!result.canceled) {
            const updatedImages = [...productImages];
            updatedImages[selectedImageIndex] = result.assets[0].uri;
            setProductImages(updatedImages);
            setSelectedImageIndex(null);
            setIsChoiseImage(false);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Разрешение на доступ к галерее не предоставлено');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [6, 10],
        });

        if (!result.canceled) {
            const updatedImages = [...productImages];
            updatedImages[selectedImageIndex] = result.assets[0].uri;
            setProductImages(updatedImages);
            setSelectedImageIndex(null);
            setIsChoiseImage(false);
        }
    };

    const updatePhotos = async () => {
        setIsProccessUpdate(true);
        const hasAtLeastOneImage = productImages.some(uri => uri !== null);
        if (!hasAtLeastOneImage) {
            alert(t("edit-screen.no-photos"));
            return;
        }

        const formData = new FormData();

        productImages.forEach((uri, index) => {
            if (!uri) return;

            if (uri.startsWith("file://")) {
                const ext = uri.split(".").pop();
                const name = `product${index + 1}.${ext}`;

                formData.append("imageProduct", {
                    uri,
                    name,
                    type: "image/jpeg",
                });
            }
        });

        formData.append("oldImageProduct", deletedImages.join(","));

        try {
            const response = await fetch(`https://aqtas.garcom.kz/api/updateProductImage/${userData.userId}/${productData.id}`, {
                method: "POST",
                body: formData, // без headers!
            });

            const result = await response.json();

            if (result.success) {
                alert(t("edit-screen.success-update-photos"));
                setIsProccessUpdate(false);
                setIsSavePhotos(false);
            } else {
                alert(t("edit-screen.faiure-update-photos"));
                setIsProccessUpdate(false);
            }
        } catch (error) {
            console.error("❌ Ошибка при отправке:", error);
            alert(t("edit-screen.failure-upload-photos"));
        } finally {
            setIsProccessUpdate(false);
        }
    };

    const deletePhoto = (index) => {
        const updatedImages = [...productImages];
        const uri = updatedImages[index];

        if (uri && uri.startsWith('products')) {
            setDeletedImaged(prev => [...prev, uri]); // сохраняем оригинальное имя файла
        }

        updatedImages[index] = null;
        setProductImages(updatedImages);
    };

    if (!isLoad) {
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackBtn}>
                    <Feather name="chevron-left" size={24} color="#26CFFF" />
                </TouchableOpacity>
                {isSavePhotos && (
                    <TouchableOpacity
                        disabled={isProccessUpdate}
                        onPress={() => updatePhotos()}
                        style={styles.saveBtn}
                    >
                        <Feather name={isProccessUpdate ? 'upload-cloud' : 'save'} size={18} color="#26CFFF" />
                    </TouchableOpacity>
                )}
                <ScrollView style={styles.container}>
                    <View style={styles.photoContainer}>
                        <ScrollView horizontal={true} style={{ width: '100%', paddingBottom: 12 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                {productImages.map((uri, index) => {
                                    console.log(`image${[index + 1]}`, uri);
                                    return (
                                        <View key={index}>
                                            {uri ? (
                                                <View style={styles.photo}>
                                                    <Image
                                                        style={styles.photoPickFront}
                                                        source={{ uri: uri.startsWith('file://') ? uri : `https://aqtas.garcom.kz/api/images/imageProducts/${uri}` }}
                                                    />
                                                    <TouchableOpacity onPress={() => deletePhoto(index)} style={styles.deletePhoto}>
                                                        <AntDesign name="close" size={18} color="#26CFFF" />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (
                                                <View style={[styles.photo, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#26CFFF', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' }]}>
                                                    <TouchableOpacity onPress={() => handleChoiseImage(index)} style={styles.photoPickButton}>
                                                        <Feather name="camera" size={18} color="#26CFFF" />
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    )
                                })}

                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ padding: 20, marginTop: -20 }}>
                        <View style={[styles.infoContainer, { paddingBottom: 10 }]}>
                            {productData.oldCost && <Text style={styles.oldCost}>{productData.oldCost}тнг</Text>}
                            <View style={styles.costContainer}>
                                <Text style={styles.cost}>{productData.cost}тнг</Text>
                                <TouchableOpacity onPress={() => toggleShowEditInfo(productData.id)} style={{ left: 10 }}>
                                    <Feather name="edit" size={24} color="rgba(0, 0, 0, 0.25)" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                <Text style={styles.title}>{productData.name}</Text>
                                <TouchableOpacity style={{ left: 10 }} onPress={() => toggleShowEditInfo(productData.id)}>
                                    <Feather name="edit" size={24} color="rgba(0, 0, 0, 0.25)" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[styles.description, { width: 300 }]}>{productData.description}</Text>
                                <TouchableOpacity onPress={() => toggleShowEditInfo(productData.id)}>
                                    <Feather name="edit" size={24} color="rgba(0, 0, 0, 0.25)" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.infoContainer, { flexDirection: 'row', justifyContent: 'space-between', width: '100%' }]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.firstInfo}>{t('manufacture-card-info')}</Text>
                                <Text style={styles.firstInfo}>{t('color-card-info')}</Text>
                                <Text style={styles.firstInfo}>{t('category-card-info')}</Text>
                                <Text style={styles.firstInfo}>{t('brend-card-info')}</Text>
                                <Text style={styles.firstInfo}>{t('delivery-card-info')}</Text>
                            </View>
                            <View style={{ flex: 1, gap: 4 }}>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                    <Text style={styles.secondInfo}>{productData.manufacturer}</Text>
                                    <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                        <Feather name="edit" size={24} color="rgba(0, 0, 0, 0.25)" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                    <Text style={styles.secondInfo}>{productData.color}</Text>
                                    <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                        <Feather name="edit" size={24} color="rgba(0, 0, 0, 0.25)" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                    <Text style={styles.secondInfo}>{productData.category}</Text>
                                    <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                        <Feather name="edit" size={24} color="rgba(0, 0, 0, 0.25)" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                    <Text style={styles.secondInfo}>{productData.brend}</Text>
                                    <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                        <Feather name="edit" size={24} color="rgba(0, 0, 0, 0.25)" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                    <Text style={styles.secondInfo}>{productData.delivery}</Text>
                                    <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                        <Feather name="edit" size={24} color="rgba(0, 0, 0, 0.25)" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            {customer.map((item, index) => (
                                <View style={styles.aboutCostumer} key={index}>
                                    <Text style={[styles.title, { fontSize: 24 }]}>{item.shop}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={[styles.title, { fontSize: 18, color: '#BDBDBD' }]}>{item.fullname} {item.surname}</Text>
                                        <TouchableOpacity onPress={toggleShowCostumer} style={[styles.commisionButton, { left: 7 }]}>
                                            <Text style={{ fontFamily: 'Cambria', color: '#26CFFF', fontSize: 18 }}>!</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.statsContainer}>
                                        <View style={styles.stat}>
                                            <Entypo name="star" size={20} color="#FFD600" />
                                            <Text style={styles.statText}>{item.countSales} {t('count-of-sales-title')}</Text>
                                        </View>
                                        <View style={styles.stat}>
                                            <Image style={{ width: 20, height: 20 }} source={require('../../img/clothes.png')} />
                                            <Text style={styles.statText}>{item.defect}% {t('percentage-of-defects-title')}</Text>
                                        </View>
                                        <View style={styles.stat}>
                                            <Image style={{ width: 20, height: 20 }} source={require('../../img/calendar.png')} />
                                            <Text style={styles.statText}>c {formatDateToDDMMYYYY(item.timeRegistration)} {t('date-of-reg-customer-title')}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                {isChoiseImage && (
                    <View style={styles.background}>
                        <View style={[styles.containerChoiseImage, { paddingBottom: insets.bottom }]}>
                            <TouchableOpacity onPress={() => setIsChoiseImage(false)}>
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
                )}
                {isShowAboutCostumer && <AboutCostumer data={customer} onClose={toggleShowCostumer} />}
                {isShowEditInfo && <EditInfo data={productData} productId={editProductId} onClose={toggleShowEditInfo} />}
                {isShowEditAddtionalInfo && <EditAdditionalInfo data={productData} productId={editProductId} onClose={toggleShowAdditionalInfo} />}
                {isUpToTop && <UpToTop onClose={toggleUpToTop} />}
                <StatusBar style='dark' />
            </View>
        )
    }
};

export default EditProductScreen;
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Swiper from 'react-native-swiper'
import styles from '../../styles/EditProductStyles';
import { Entypo, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import AboutCommision from '../ux/popup/AboutCommistion';
import AboutCostumer from '../ux/popup/AboutCostumer';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EditInfo from '../ux/popup/EditProduct/EditInfo';
import EditAdditionalInfo from '../ux/popup/EditProduct/EditAdditionalInfo';
import UpToTop from '../ux/popup/EditProduct/UpToTop';
import { useRoute } from '@react-navigation/native';
import { getUserData } from '../../store/userDataManager';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

function EditProductScreen() {
    const navigation = useNavigation();
    const [isShowAboutComission, setShowAboutComission] = useState(false);
    const [isShowAboutCostumer, setShowAboutCostumer] = useState(false);
    const [isShowEditInfo, setShowEditInfo] = useState(false);
    const [isShowEditAddtionalInfo, setShowAdditionalInfo] = useState(false);
    const [isUpToTop, setUpToTop] = useState(false);
    const route = useRoute();
    const productData = route.params.productData;
    const [userData, setUserData] = useState({});
    const [customer, setCustomer] = useState([]);
    const [editProductId, setEditProductId] = useState('');
    const [isChoiseImage, setChoiseImage] = useState(false);
    const [productImages, setProductImages] = useState([]);
    const [userAddedImages, setUserAddedImages] = useState([]);
    const { t } = useTranslation();

    const toggleSelecter = () => {
        setSelected(!isSelected)
    }

    const toggleChoiseImage = () => {
        setChoiseImage(!isChoiseImage)
    }

    const extractImagePaths = (data) => {
        const imagePaths = [];

        for (let i = 1; i <= 5; i++) {
            const key = `imagePreview${i}`;
            const path = data[key];

            if (path) {
                imagePaths.push(path);
            }
        }

        return imagePaths;
    };


    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
            // Выполните запрос к серверу для получения данных о финансах
            try {
                const response = await fetch(`https://aqtas.garcom.kz/customers/${userData.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCustomer(data);
                } else {
                }
            } catch (error) {
            }
        }
    };

    const uploadProductImages = async () => {
        // Создадим объект FormData, который позволяет отправлять файлы на сервер
        const formData = new FormData();

        // Добавляем изображения пользователя
        userAddedImages.forEach((image, index) => {
            formData.append(`userImage${index}`, {
                uri: image,
                name: `userImage${index}.jpg`, // Замените это на имя файла
                type: 'image/jpeg', // Зависит от типа изображения
            });
        });

        // Добавляем старые изображения, которые не были удалены
        productImages.forEach((image, index) => {
            formData.append(`productImage${index}`, image);
        });

        // Выполняем HTTP POST запрос на ваш сервер
        try {
            const response = await fetch(`https://aqtas.garcom.kz/updateProductImage/${userData.userId}/${productData.id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {

            } else {

            }
        } catch (error) {

        }
    };


    useEffect(() => {
        loadUserData();
        // Создадим массив для хранения путей к картинкам
        const paths = [];

        // Перебираем imagePreview1 до imagePreview5
        for (let i = 1; i <= 5; i++) {
            const key = `imagePreview${i}`;
            const path = productData[key];

            if (path) {
                paths.push(path);
            }
        }

        setProductImages(paths);
        productImages.map((image) => {

        })
    }, []);


    const toggleShowAbout = () => {
        setShowAboutComission(!isShowAboutComission)
    }
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
    }

    const goToReviews = () => {
        navigation.navigate('Reviews')
    }

    function formatDateToDDMMYYYY(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
        const year = date.getFullYear();
        // Чтобы получить формат "ДД.ММ.ГГГГ", давайте проверим, нужно ли добавить ноль перед днем и месяцем, если они менее 10.
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        return `${formattedDay}.${formattedMonth}.${year}`;
    }

    const pickPhoto = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                const updatedUserAddedImages = [...userAddedImages, result.uri];
                setUserAddedImages(updatedUserAddedImages);
            }
        } catch (error) {

        }
    };

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                const updatedUserAddedImages = [...userAddedImages, result.uri];
                setUserAddedImages(updatedUserAddedImages);
            }
        } catch (error) {

        }
    };

    const deletePhotoUsers = (index) => {
        // Создайте копию массива всех фотографий
        const updatedImages = [...userAddedImages];
        // Удалите фотографию по индексу
        updatedImages.splice(index, 1);
        // Обновите состояние
        setUserAddedImages(updatedImages);
    };

    const deletePhotoServer = (index) => {
        // Создайте копию массива всех фотографий
        const updatedImages = [...productImages];
        // Удалите фотографию по индексу
        updatedImages.splice(index, 1);
        // Обновите состояние
        setProductImages(updatedImages);
    };

    const allImages = productImages.concat(userAddedImages);

    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.photoContainer}>
                    <ScrollView horizontal={true} style={{ width: '70%', padding: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            {productImages.map((image, index) => (
                                <View style={styles.photo} key={index}>
                                    <Image
                                        style={styles.photoPickFront}
                                        source={{ uri: `https://aqtas.garcom.kz/images/imageProducts/${image}` }}
                                    />
                                </View>
                            ))}
                            {userAddedImages.map((image, index) => (
                                <View style={styles.photo} key={index}>
                                    <Image
                                        style={styles.photoPickFront}
                                        source={{ uri: image }}
                                    />
                                    <TouchableOpacity onPress={() => deletePhotoUsers(index)} style={styles.deletePhoto}>
                                        <AntDesign name='close' color={"#95E5FF"} size={32} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ padding: 20, marginTop: -20 }}>
                    <View style={[styles.infoContainer, { paddingBottom: 10 }]}>
                        {productData.oldCost && <Text style={styles.oldCost}>{productData.oldCost}тнг</Text>}
                        <View style={styles.costContainer}>
                            <Text style={styles.cost}>{productData.cost}тнг</Text>
                            {/* <Text style={styles.commission}>+200тнг</Text>
                                <TouchableOpacity onPress={toggleShowAbout} style={styles.commisionButton}>
                                    <Text style={{ fontFamily: 'Cambria', color: '#95E5FF', fontSize: 18 }}>!</Text>
                                </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => toggleShowEditInfo(productData.id)} style={{ left: 10 }}>
                                <Feather name="edit" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                            <Text style={styles.title}>{productData.name}</Text>
                            <TouchableOpacity onPress={() => toggleShowEditInfo(productData.id)} style={{ left: 10 }}>
                                <Feather name="edit" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                            <Text style={[styles.description, { width: 300 }]}>{productData.description}</Text>
                            <TouchableOpacity onPress={() => toggleShowEditInfo(productData.id)} style={{ left: 10 }}>
                                <Feather name="edit" size={18} color="black" />
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
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                <Text style={styles.secondInfo}>{productData.manufacturer}</Text>
                                <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                    <Feather name="edit" size={18} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                <Text style={styles.secondInfo}>{productData.color}</Text>
                                <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                    <Feather name="edit" size={18} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                <Text style={styles.secondInfo}>{productData.category}</Text>
                                <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                    <Feather name="edit" size={18} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                <Text style={styles.secondInfo}>{productData.brend}</Text>
                                <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                    <Feather name="edit" size={18} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                                <Text style={styles.secondInfo}>{productData.delivery}</Text>
                                <TouchableOpacity onPress={() => toggleShowAdditionalInfo(productData.id)} style={{ left: 10 }}>
                                    <Feather name="edit" size={18} color="black" />
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
                                        <Text style={{ fontFamily: 'Cambria', color: '#95E5FF', fontSize: 18 }}>!</Text>
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
                    {/* <View style={[styles.infoContainer, { padding: 0 }]}>
                            <TouchableOpacity onPress={goToReviews} style={styles.reviewsStats}>
                                <Text style={{ fontFamily: 'Cambria', fontSize: 20 }}>15151 {t('count-rates-title')}</Text>
                                <Text style={{ fontFamily: 'Cambria', marginLeft: 10, fontSize: 20 }}>15151 {t('count-reviews-title')}</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={styles.starsContainer}>
                                <Text style={[styles.title, { fontSize: 36 }]}>4.1/5</Text>
                                <View style={{ alignItems: 'flex-end', marginTop: 10, right: 20 }}>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <View style={{  width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: 130, backgroundColor: '#FFD600', height: 3 }}/>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <View style={{  width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: 100, backgroundColor: '#FFD600', height: 3 }}/>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <View style={{  width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: 70, backgroundColor: '#FFD600', height: 3 }}/>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <View style={{  width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: 40, backgroundColor: '#FFD600', height: 3 }}/>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        <Entypo name="star" size={20} color="#FFD600" />
                                        <View style={{  width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: 10, backgroundColor: '#FFD600', height: 3 }}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.reviewsContainer}>
                                <ScrollView horizontal={true}>
                                    <View style={styles.review}> 
                                        <View style={styles.reviewInfo}>
                                            <Image style={styles.imageReviewer} source={require('../../img/ilon.jpg')}/>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.reviwerName}>Иван Иванов</Text>
                                                <Text style={styles.reviewerDate}>Вчера в 02:05</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', display: 'flex', marginLeft: 20 }}>
                                                <Entypo name="star" size={20} color="#FFD600" />
                                                <Entypo name="star" size={20} color="#FFD600" />
                                                <Entypo name="star" size={20} color="#FFD600" />
                                            </View>
                                        </View>
                                        <Text style={styles.reviewDescription}>Товар отлиный, базарю. Берите смело, не пожалете</Text>
                                    </View>
                                </ScrollView>
                            </View>
                    </View> */}
                    <TouchableOpacity onPress={uploadProductImages} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>{t('save-changes-button')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {isShowAboutComission && <AboutCommision onClose={toggleShowAbout} />}
            {isShowAboutCostumer && <AboutCostumer customerData={customer} onClose={toggleShowCostumer} />}
            {isShowEditInfo && <EditInfo productId={editProductId} onClose={toggleShowEditInfo} />}
            {isShowEditAddtionalInfo && <EditAdditionalInfo productId={editProductId} onClose={toggleShowAdditionalInfo} />}
            {isUpToTop && <UpToTop onClose={toggleUpToTop} />}
            {isChoiseImage &&
                <View style={styles.background}>
                    <View style={styles.containerChoiseImage}>
                        <TouchableOpacity onPress={toggleChoiseImage}>
                            <AntDesign name="close" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePhoto} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>{t('take-photo-button')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickPhoto} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>{t('pick-photo-button')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
};

export default EditProductScreen;
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState, useRef } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, Keyboard, Animated, Easing } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/CreateProductStyle';
import ChangeColor from './ChangeColor';
import EditCategory from './EditProduct/EditCategory';
import EditDelivery from './EditProduct/EditDelivery';
import EditSubcategory from './EditProduct/EditSubcategory';
import SelectSeason from './SelectSeason';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EditType from './EditProduct/EditType';
import EditEntity from './EditProduct/EditEntity';

function CreateProduct({ modalVisible, onClose }) {
    const [isChangeColor, setChangeColor] = useState(false);
    const [isChangeCategory, setChangeCategory] = useState(false);
    const [isChangeType, setIsChangeType] = useState(false);
    const [isChangeDelivery, setChangeDelivery] = useState(false);
    const [isChangeEntity, setChangeEntity] = useState(false);
    const [isChoiseImage, setChoiseImage] = useState(false);
    const [isChangeSubcategory, setIsChangeSubcategory] = useState(false);
    const [userData, setUresData] = useState({});
    const [selectedImages, setSelectedImages] = useState([]);
    const [tableImage, setTableImage] = useState(null);
    const [category, setCategory] = useState('Выберите категорию');
    const [entity, setEntity] = useState('Выберите ед.измерения');
    const [categoryId, setCategoryId] = useState(null);
    const [subcategory, setSubcategory] = useState('Выберите подкатегорию');
    const [type, setType] = useState('Выберите тип товара');
    const [color, setColor] = useState('Выберите цвет');
    const [delivry, setDelivery] = useState('Выберите доставку');
    const [name, onChangeName] = useState('');
    const [description, onChangeDescription] = useState('');
    const [manufacturer, onChangeManufacturer] = useState('');
    const [cost, onChangeCost] = useState('');
    const [brend, onChangeBrend] = useState('');
    const [isNoCardMessage, setIsNoCardMessage] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [deleteSizeVisible, setDeleteSizeVisible] = useState(null);
    const [seasonSelected, setSeasonSelected] = useState('Выберите сезон');
    const [isShowSelectSeason, setIsShowSelectSeason] = useState();
    const keyboardHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
            Animated.timing(keyboardHeight, {
                toValue: e.endCoordinates.height,
                duration: 10,
                useNativeDriver: false,
                easing: Easing.out(Easing.poly(5))
            }).start();
        });
        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(keyboardHeight, {
                toValue: 0,
                duration: 10,
                useNativeDriver: false,
                easing: Easing.out(Easing.poly(5))
            }).start();
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const [isLoad, setIsLoad] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    const insets = useSafeAreaInsets();

    const toggleShowSelectSeason = () => {
        setIsShowSelectSeason(!isShowSelectSeason);
    }

    const toggleSetSeasonSelected = (season) => {
        setSeasonSelected(season);
    }
    const showDeleteSizeComponent = (index) => {
        setDeleteSizeVisible(index);
    };

    const handleDeleteSize = (index) => {
        // Удаляем элемент из массива по индексу
        const updatedSizes = [...sizes];
        updatedSizes.splice(index, 1);
        setSizes(updatedSizes);

        // Скрываем компонент deleteSize
        setDeleteSizeVisible(null);
    };

    const handleAddSize = () => {
        if (newSize !== '') {
            setSizes([...sizes, newSize]);
            setNewSize('');
        }
    };

    const handleSaveSize = () => {
        if (newSize !== '') {
            setSizes([...sizes, newSize]);
            setNewSize('');
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleCategorySelect = (selectedCategory, id) => {
        setCategory(selectedCategory);
        setCategoryId(id);
    };

    const handleSubcategorySelect = (selectedCategory) => {
        setSubcategory(selectedCategory);
    };

    const handleEntitySelect = (entity) => {
        setEntity(entity);
    };

    const handleDeliverySelect = (selectedDelivery) => {
        setDelivery(selectedDelivery);
    };

    const handleTypeSelect = (type) => {
        setType(type);
        setIsChangeType(false);
    }

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor);
    };

    const toggleChoiseImage = () => {
        setChoiseImage(!isChoiseImage)
    }

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        console.log("Camera permission status:", status);

        if (status !== 'granted') {
            alert('Permission to access the camera is required!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setChoiseImage(false);
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };

    const pickTablePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access the camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setTableImage(result.assets[0].uri);
        }
    }

    const pickPhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access the camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setChoiseImage(false);
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUresData(userData);
        }
    };

    const toggleChangeCategory = () => {
        setChangeCategory(!isChangeCategory);
    }

    const toggleChangeEntity = () => {
        setChangeEntity(!isChangeEntity);
    }

    const toggleChangeSubcategory = () => {
        setIsChangeSubcategory(!isChangeSubcategory);
    }

    const toggleChangeType = () => {
        setIsChangeType(!isChangeType);
    }

    const toggleChangeDelivery = () => {
        setChangeDelivery(!isChangeDelivery);
    }

    const toggleChangeColor = () => {
        setChangeColor(!isChangeColor);
    }

    const deletePhoto = (index) => {
        // Создайте копию массива всех фотографий
        const updatedImages = [...selectedImages];
        // Удалите фотографию по индексу
        updatedImages.splice(index, 1);
        // Обновите состояние
        setSelectedImages(updatedImages);
    };

    const getCurrentTimestamp = () => {
        return new Date().getTime();
    };

    const generateUniqueId = () => {
        return `${getCurrentTimestamp()}_${Math.floor(Math.random() * 10000)}`;
    };

    const publishProduct = async () => {
        setIsLoad(true);
        const renamedImages = [];

        for (let i = 0; i < selectedImages.length; i++) {
            const userId = userData.userId;
            const uniqueId = generateUniqueId();

            const imageName = `product${userId}${uniqueId}.png`;

            renamedImages.push(imageName);
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('color', color);
        formData.append('manufacturer', manufacturer);
        formData.append('cost', cost);
        formData.append('brend', brend);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('delivery', delivry);
        formData.append('UserID', userData.userId);
        formData.append('costumer', `${userData.fullname} ${userData.surname}`);
        formData.append('CustomerId', userData.userId);
        formData.append('type', type);
        formData.append('entity', entity);
        formData.append('sizes', JSON.stringify(sizes));
        formData.append('season', seasonSelected);


        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('imagePreviews', {
                uri: selectedImages[i],
                name: 'image.jpg',
                type: 'image/jpeg',
            });
        };

        if (tableImage) {
            formData.append('sizeImages', {
                uri: tableImage,
                name: 'table.jpg',
                type: 'image/jpeg'
            });
        }

        try {
            const response = await fetch('https://aqtas.garcom.kz/api/createProduct', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setIsLoad(false);
                setIsSuccess(true)
                setIsFailure(false);
            } else {
                setIsLoad(false);
                setIsSuccess(false);
                setIsFailure(true);

            }
        } catch (error) {
            setIsLoad(false);
            setIsSuccess(false);
            setIsFailure(true);
        }
    };

    const handleClick = _ => {
        if (isSuccess) onClose()
        else publishProduct();
    }

    const getBtnTxt = _ => {
        if (isSuccess) return 'Успех'
        else if (isFailure) return 'Произошла ошибка'
        else if (isLoad) return 'В процессе'
        else return 'Опубликовать'
    }

    const getBtnStyle = _ => {
        if (isSuccess) return "#61c427"
        else if (isFailure) return "#FF0000"
        else if (isLoad) return "#26CFFF"
        else return "#26CFFF"
    }


    return (
        <Modal
            transparent={true}
            statusBarTranslucent={true}
            visible={modalVisible}
            animationType='fade'
        >
            <TouchableOpacity onPress={onClose} style={styles.background} />
            <Animated.View style={[styles.container, { paddingBottom: keyboardHeight }]}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Создать товар</Text>
                </View>
                <ScrollView style={{ height: 400 }}>
                    <View style={styles.photoContainer}>
                        <ScrollView horizontal={true} style={{ width: '70%', padding: 10 }}>
                            {selectedImages.length > 0 ? (
                                <>
                                    {selectedImages.map((image, index) => (
                                        <View key={index} style={styles.photoPickContainer}>
                                            <Image key={index} source={{ uri: image }} style={styles.photoPickFront} />
                                            <TouchableOpacity onPress={() => deletePhoto(index)} style={styles.deleteButton}>
                                                <AntDesign name='close' color='#26CFFF' size={28} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </>
                            ) : (
                                <View style={styles.photoEmptyContainer} />
                            )}
                        </ScrollView>
                        {selectedImages.length === 5 ? null : (<TouchableOpacity onPress={toggleChoiseImage} style={styles.photoPickButton}>
                            <Feather name="camera" size={24} color="#26CFFF" />
                        </TouchableOpacity>)}
                    </View>
                    <View>
                        <View style={styles.sizeContainer}>
                            {sizes.map((size, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.size}
                                    onPress={() => showDeleteSizeComponent(index)}
                                >
                                    <TextInput
                                        keyboardType='numeric'
                                        style={styles.sizeInput}
                                        value={size.toString()}
                                        editable={false}
                                    />
                                    {deleteSizeVisible === index && (
                                        <View style={styles.deleteSize}>
                                            <TouchableOpacity onPress={() => handleDeleteSize(index)}>
                                                <AntDesign name='close' size={24} color='#fff' />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                            <View style={styles.size}>
                                <TextInput
                                    keyboardType='numeric'
                                    style={styles.sizeInput}
                                    value={newSize}
                                    onChangeText={(text) => setNewSize(text)}
                                    maxLength={3}
                                />
                            </View>
                            {sizes.length >= 10 ? null : (
                                <>
                                    {newSize !== '' ? (
                                        <TouchableOpacity style={styles.size} onPress={handleSaveSize}>
                                            <Feather name='save' size={24} color='#26CFFF' />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.size} onPress={handleAddSize}>
                                            <Feather name='plus' size={24} color='#26CFFF' />
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </View>
                        <Text style={styles.tableTitle}>Таблица размеров</Text>
                        <View style={styles.tableContainer}>
                            
                            { tableImage ? (
                                <>
                                    <Image source={{ uri: tableImage }} style={styles.tableImage}/>
                                    <TouchableOpacity onPress={() => setTableImage(null)} style={styles.tablePickButton}>
                                        <AntDesign name='close' color='#26CFFF' size={28} />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <TouchableOpacity onPress={pickTablePhoto} style={styles.tablePickButton}>
                                    <Feather name="camera" size={24} color="#26CFFF" />
                                </TouchableOpacity>
                            ) }
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Ед.измерения</Text>
                            <TextInput style={styles.input} readOnly={true} value={entity}/>
                            <TouchableOpacity onPress={toggleChangeEntity}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#26CFFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleInput}>Название продукта</Text>
                            <TextInput value={name} onChangeText={onChangeName} style={styles.input} placeholder='Введите название продукта' />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleInput}>Описание</Text>
                            <TextInput value={description} onChangeText={onChangeDescription} style={styles.input} placeholder='Введите описание продукта' />
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Цена</Text>
                            <TextInput value={cost} onChangeText={onChangeCost} keyboardType='numeric' style={styles.input} placeholder='Введите цене продукта' />
                            <Text style={styles.currency}>тнг</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleInput}>Производитель</Text>
                            <TextInput value={manufacturer} onChangeText={onChangeManufacturer} style={styles.input} placeholder='Введите производителя' />
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Цвет</Text>
                            <TextInput style={styles.input} readOnly={true} value={color}/>
                            <TouchableOpacity onPress={toggleChangeColor}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#26CFFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleInput}>Бренд</Text>
                            <TextInput value={brend} onChangeText={onChangeBrend} style={styles.input} placeholder='Введите бренд' />
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Категория</Text>
                            <TextInput style={styles.input} readOnly={true} value={category}/>
                            <TouchableOpacity onPress={toggleChangeCategory}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#26CFFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Подкатегория</Text>
                            <TextInput style={styles.input} readOnly={true} value={subcategory}/>
                            <TouchableOpacity onPress={toggleChangeSubcategory}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#26CFFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Тип товара</Text>
                            <TextInput style={styles.input} readOnly={true} value={type}/>
                            <TouchableOpacity onPress={toggleChangeType}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#26CFFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Доставка</Text>
                            <TextInput style={styles.input} readOnly={true} value={delivry}/>
                            <TouchableOpacity onPress={toggleChangeDelivery}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#26CFFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Сезон</Text>
                            <TextInput style={styles.input} readOnly={true} value={seasonSelected}/>
                            <TouchableOpacity onPress={toggleShowSelectSeason}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#26CFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        disabled={isLoad}
                        onPress={() => handleClick()}
                        style={[styles.publicButton, { backgroundColor: getBtnStyle(), marginBottom: insets.bottom }]}
                    >
                        <Text style={styles.publicButtonText}>
                            {getBtnTxt()}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </Animated.View>
            {isChangeColor && <ChangeColor onColorSelect={handleColorSelect} onClose={toggleChangeColor} />}
            {isChangeCategory && <EditCategory onCategorySelect={handleCategorySelect} onClose={toggleChangeCategory} />}
            {isChangeDelivery && <EditDelivery onDeliverySelect={handleDeliverySelect} onClose={toggleChangeDelivery} />}
            { isChangeType && <EditType onClose={() => setIsChangeType(false)} onTypeSelect={handleTypeSelect}/> }
            {isChangeSubcategory && <EditSubcategory id={categoryId} onSubcategorySelect={handleSubcategorySelect} onClose={toggleChangeSubcategory} />}
            {isShowSelectSeason && <SelectSeason onClose={toggleShowSelectSeason} onSeasonSelect={toggleSetSeasonSelected} />}
            { isChangeEntity && <EditEntity onEntitySelect={handleEntitySelect} onClose={toggleChangeEntity}/> }
            {isChoiseImage &&
                <View style={styles.background}>
                    <View style={[styles.containerChoiseImage, { paddingBottom: insets.bottom }]}>
                        <TouchableOpacity onPress={toggleChoiseImage}>
                            <AntDesign name="close" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePhoto} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>Сделать фотографию</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickPhoto} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>Выбрать фотографию</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </Modal>
    )
};

export default CreateProduct;
import { View, TouchableOpacity, TextInput, Text, ScrollView, Image } from 'react-native';
import styles from '../../../styles/CreateProductStyle';
import { AntDesign, Feather } from '@expo/vector-icons';
import ChangeColor from './ChangeColor';
import EditDelivery from './EditProduct/EditDelivery';
import EditCategory from './EditProduct/EditCategory';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { getUserData } from '../../../store/userDataManager';
import NoCardMessage from './messages/NoCardMessage';
import EditSubcategory from './EditProduct/EditSubcategory';
import SelectSeason from './SelectSeason';

function CreateProduct({ onClose }) {
    const [isChangeColor, setChangeColor] = useState(false);
    const [isChangeCategory, setChangeCategory] = useState(false);
    const [isChangeDelivery, setChangeDelivery] = useState(false);
    const [isChoiseImage, setChoiseImage] = useState(false);
    const [isChangeSubcategory, setIsChangeSubcategory] = useState(false);
    const [userData, setUresData] = useState({});
    const [selectedImages, setSelectedImages] = useState([]);
    const [category, setCategory] = useState('Выберите категорию');
    const [subcategory, setSubcategory] = useState('Выберите подкатегорию');
    const [color, setColor] = useState('Выберите цвет');
    const [delivry, setDelivery] = useState('Выберите доставку');
    const [name, onChangeName] = useState('');
    const [description, onChangeDescription] = useState('');
    const [manufacturer, onChangeManufacturer] = useState('');
    const [cost, onChangeCost] = useState('');
    const [brend, onChangeBrend] = useState('');
    const [isNoCardMessage, setIsNoCardMessage] = useState(false);
    const [bankCardData, setBankCardData] = useState('');
    const [sizes, setSizes] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [deleteSizeVisible, setDeleteSizeVisible] = useState(null);
    const [seasonSelected, setSeasonSelected] = useState();
    const [isShowSelectSeason, setIsShowSelectSeason] = useState();

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

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handleSubcategorySelect = (selectedCategory) => {
        setSubcategory(selectedCategory);
    };

    const handleDeliverySelect = (selectedDelivery) => {
        setDelivery(selectedDelivery);
    };

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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log("ImagePicker result:", result.assets[0].uri);

        if (!result.canceled) {
            setChoiseImage(false);
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };


    const pickPhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access the camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
            // Выполните запрос к серверу для получения данных о финансах
            try {
                const response = await fetch(`https://aqtas.garcom.kz/api/bankCards/${userData.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length === 0) {
                        setIsNoCardMessage(true);
                    } else {
                        setIsNoCardMessage(false)
                        setBankCardData(data);
                    }
                } else {
                }
            } catch (error) {

            }
        }
    };

    const toggleChangeCategory = () => {
        setChangeCategory(!isChangeCategory);
    }

    const toggleChangeSubcategory = () => {
        setIsChangeSubcategory(!isChangeSubcategory);
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
        bankCardData.map((card) => {
            formData.append('customerBankNumber', card.number);
        })
        sizes.map((size) => {
            formData.append('sizes', size)
        })
        formData.append('season', seasonSelected);


        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('imagePreviews', {
                uri: selectedImages[i],
                name: 'image.jpg',
                type: 'image/jpeg',
            });
        }

        try {
            const response = await fetch('https://aqtas.garcom.kz/api/createProduct', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                handleClose();
            } else {
                const errorMessage = await response.text(); // or response.json() if the error message is in JSON format
            }
        } catch (error) {
        }
    };


    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Создать товар</Text>
                </View>
                <ScrollView>
                    <View style={styles.photoContainer}>
                        <ScrollView horizontal={true} style={{ width: '70%', padding: 10 }}>
                            {selectedImages.length > 0 ? (
                                <>
                                    {selectedImages.map((image, index) => (
                                        <View key={index} style={styles.photoPickContainer}>
                                            <Image key={index} source={{ uri: image }} style={styles.photoPickFront} />
                                            <TouchableOpacity onPress={() => deletePhoto(index)} style={styles.deleteButton}>
                                                <AntDesign name='close' color='#95E5FF' size={28} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </>
                            ) : (
                                <View style={styles.photoEmptyContainer} />
                            )}
                        </ScrollView>
                        {selectedImages.length === 5 ? null : (<TouchableOpacity onPress={toggleChoiseImage} style={styles.photoPickButton}>
                            <Feather name="camera" size={24} color="#95E5FF" />
                        </TouchableOpacity>)}
                    </View>
                    <View>
                        {subcategory === 'Одежда' && (
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
                                                <Feather name='save' size={24} color='#000' />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={styles.size} onPress={handleAddSize}>
                                                <Feather name='plus' size={24} color='#000' />
                                            </TouchableOpacity>
                                        )}
                                    </>
                                )}
                            </View>
                        )}
                        <View style={styles.field}>
                            <Text style={styles.titleInput}>Название продукта</Text>
                            <TextInput value={name} onChangeText={onChangeName} style={styles.input} placeholder='Введите название продукта' />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleInput}>Описание</Text>
                            <TextInput value={description} onChangeText={onChangeDescription} style={styles.input} placeholder='Введите описание продукта' />
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.titleInput}>Цена</Text>
                            <TextInput value={cost} onChangeText={onChangeCost} keyboardType='numeric' style={styles.input} placeholder='Введите цене продукта' />
                            <Text style={styles.currency}>тнг</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleInput}>Производитель</Text>
                            <TextInput value={manufacturer} onChangeText={onChangeManufacturer} style={styles.input} placeholder='Введите производителя' />
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }]}>
                            <Text style={styles.titleInput}>Цвет</Text>
                            <Text style={styles.input}>{color}</Text>
                            <TouchableOpacity onPress={toggleChangeColor}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleInput}>Бренд</Text>
                            <TextInput value={brend} onChangeText={onChangeBrend} style={styles.input} placeholder='Введите бренд' />
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }]}>
                            <Text style={styles.titleInput}>Категория</Text>
                            <Text style={styles.input}>{category}</Text>
                            <TouchableOpacity onPress={toggleChangeCategory}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }]}>
                            <Text style={styles.titleInput}>Подкатегория</Text>
                            <Text style={styles.input}>{subcategory}</Text>
                            <TouchableOpacity onPress={toggleChangeSubcategory}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }]}>
                            <Text style={styles.titleInput}>Доставка</Text>
                            <Text style={styles.input}>{delivry}</Text>
                            <TouchableOpacity onPress={toggleChangeDelivery}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.field, { flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }]}>
                            <Text style={styles.titleInput}>Сезон</Text>
                            <Text style={styles.input}>{seasonSelected == null ? 'Выберите сезон' : seasonSelected}</Text>
                            <TouchableOpacity onPress={toggleShowSelectSeason}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#95E5FF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={publishProduct} style={styles.publicButton}>
                        <Text style={styles.publicButtonText}>Опубликовать</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {isChangeColor && <ChangeColor onColorSelect={handleColorSelect} onClose={toggleChangeColor} />}
            {isChangeCategory && <EditCategory onCategorySelect={handleCategorySelect} onClose={toggleChangeCategory} />}
            {isChangeDelivery && <EditDelivery onDeliverySelect={handleDeliverySelect} onClose={toggleChangeDelivery} />}
            {isNoCardMessage && <NoCardMessage />}
            {isChangeSubcategory && <EditSubcategory onSubcategorySelect={handleSubcategorySelect} onClose={toggleChangeSubcategory} />}
            {isShowSelectSeason && <SelectSeason onClose={toggleShowSelectSeason} onSeasonSelect={toggleSetSeasonSelected} />}
            {isChoiseImage &&
                <View style={styles.background}>
                    <View style={styles.containerChoiseImage}>
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
        </View>
    )
};

export default CreateProduct;
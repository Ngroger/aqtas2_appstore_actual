import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import styles from '../../../styles/WriteReviewsStyles';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getUserData } from '../../../store/userDataManager';
import axios from 'axios';

function WriteReview({ onClose, productId }) {
    const [rating, setRating] = useState(0);
    const [isChoiseImage, setChoiseImage] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [userData, setUserData] = useState({});
    const [description, onChangeDescription] = useState('');
    const [color, onChangeColor] = useState('');
    const [size, onChangeSize] = useState('');

    const toggleChoiseImage = () => {
        setChoiseImage(!isChoiseImage)
    }

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
          setUserData(userData); // Установка данных пользователя в состояние
        }
    };

    const takePhoto = async () => {
        if (Platform.OS === 'web') {
            return;
        }
    
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
    
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setChoiseImage(false);
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };
    
    const pickImage = async () => {
        if (Platform.OS === 'web') {
            return;
        }
    
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setChoiseImage(false);
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };

    const toggleDeleteImage = (id) => {
        const updatedImages = selectedImages.filter((image, index) => index !== id);
        setSelectedImages(updatedImages);
    }

    const publishReview = async () => {
        // Подготавливаем данные для отправки на сервер
        const data = new FormData();

        // Подготавливаем данные для отправки на сервер
        const date = new Date(); // Получаем текущую дату и время
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // Преобразуем дату в строку в формате "ГГГГ-ММ-ДД ЧЧ:ММ:СС"
        data.append('nameReviewer', `${userData.fullname + ' ' + userData.surname}`);
        data.append('date', formattedDate); // Получаем текущую дату и время
        data.append('stars', rating.toString());
        data.append('description', description);
        data.append('photoReviewer', userData.photoUser)
        data.append('like', '0'); // Значение по умолчанию
        data.append('dislike', '0'); // Значение по умолчанию
        data.append('size', size);
        data.append('color', color);
        data.append('ProductID', productId);
        data.append('userId', userData.userId);

        // Добавляем фотографии, если они выбраны
        for (let i = 0; i < selectedImages.length; i++) {
            data.append(`photoReview${i + 1}`, {
                uri: selectedImages[i],
                type: 'image/png',
                name: `imageReview${userData.userId}${productId}_${i + 1}.png`,
            });
        }

        try {
            const response = await axios.post('https://aqtas.ru/publishReview', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleClose} style={styles.navbar}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>Написать отзыв</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {selectedImages.length === 0 ? (
                        <View style={styles.image}/>
                    ) : (
                        <>
                        {selectedImages.map((imageUri, index) => (
                            <View key={index} style={[styles.image, { borderWidth: 0 }]}>
                                <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                                <TouchableOpacity style={styles.deleteImage} onPress={() => toggleDeleteImage(index)}>
                                    <AntDesign name="close" size={24} color="#95E5FF" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        </>
                    )}
                    {selectedImages.length < 3 && (
                        <TouchableOpacity onPress={toggleChoiseImage} style={styles.addPhotoButton}>
                            <Feather name="camera" size={24} color="#95E5FF" />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.starsContainer}>
                    <TouchableOpacity onPress={() => setRating(1)}>
                        <Entypo name="star" size={30} color={rating >= 1 ? "#FFD600" : "#665602"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRating(2)}>
                        <Entypo name="star" size={30} color={rating >= 2 ? "#FFD600" : "#665602"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRating(3)}>
                        <Entypo name="star" size={30} color={rating >= 3 ? "#FFD600" : "#665602"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRating(4)}>
                        <Entypo name="star" size={30} color={rating >= 4 ? "#FFD600" : "#665602"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRating(5)}>
                        <Entypo name="star" size={30} color={rating >= 5 ? "#FFD600" : "#665602"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.reviewContainer}>
                    <Text style={styles.titleInput}>Ваш комментарий</Text>
                    <TextInput multiline={true}
                        numberOfLines={4} 
                        style={styles.input} 
                        placeholder='Введите ваш комментарий'
                        value={description}
                        onChangeText={onChangeDescription}
                    />
                </View>
                <View style={styles.reviewContainer}>
                    <Text style={styles.titleInput}>Цвет</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder='Введите цвет товара'
                        value={color}
                        onChangeText={onChangeColor}
                    />
                </View>
                <View style={styles.reviewContainer}>
                    <Text style={styles.titleInput}>Размер</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder='Введите размер товара'
                        value={size}
                        onChangeText={onChangeSize}
                        keyboardType='numeric'
                    />
                </View>
                <TouchableOpacity onPress={publishReview} style={styles.publicButton}>
                    <Text style={styles.publicButtonText}>Опубликовать</Text>
                </TouchableOpacity>
            </View>
            { isChoiseImage && 
                <View style={styles.backgroundContainer}>
                    <View style={styles.containerChoiseImage}>
                        <TouchableOpacity onPress={toggleChoiseImage}>
                            <AntDesign name="close" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePhoto} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>Сделать фотографию</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>Выбрать фотографию</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
}

export default WriteReview;

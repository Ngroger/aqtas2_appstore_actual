import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/WriteReviewsStyles';

function WriteReview({ product, onClose, productId, modalVisible }) {
    const [rating, setRating] = useState(0);
    const [isChoiseImage, setChoiseImage] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [userData, setUserData] = useState({});
    const [description, onChangeDescription] = useState('');
    const [color, onChangeColor] = useState('');
    const [size, onChangeSize] = useState('');
    const [message, setMessage] = useState();
    const { t } = useTranslation();

    console.log("product: ", product);

    const toggleChoiseImage = () => {
        setChoiseImage(!isChoiseImage);
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Разрешение на использование камеры не предоставлено');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.canceled) {
            setChoiseImage(false);
            setSelectedImages([...selectedImages, result.assets[0].uri]);
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
            aspect: [4, 3],
        });

        if (!result.canceled) {
            setChoiseImage(false);
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };

    const toggleDeleteImage = (id) => {
        const updatedImages = selectedImages.filter((_, index) => index !== id);
        setSelectedImages(updatedImages);
    };

    const publishReview = async () => {
        const data = new FormData();

        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        data.append('nameReviewer', `${userData.fullname} ${userData.surname}`);
        data.append('date', formattedDate);
        data.append('stars', rating.toString());
        data.append('description', description);
        data.append('photoReviewer', userData.photoUser);
        data.append('like', '0');
        data.append('dislike', '0');
        data.append('ProductID', productId);
        data.append('userId', userData.userId);

        if (product.subcategory === 'Одежда') {
            data.append('size', size);
            data.append('color', color);
        }

        for (let i = 0; i < selectedImages.length; i++) {
            data.append(`photoReview${i + 1}`, {
                uri: selectedImages[i],
                type: 'image/png',
                name: `imageReview${userData.userId}${productId}_${i + 1}.png`,
            });
        }

        try {
            const response = await fetch('https://aqtas.garcom.kz/api/publishReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: data,
            });

            const responseJson = await response.json();
            if (responseJson.success) {
                setMessage();
                onClose();
            } else {
                setMessage(responseJson.message);
            }
        } catch (error) {
            console.error('Error publishing review:', error);
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={modalVisible}
            statusBarTranslucent={true}
        >
            <TouchableOpacity onPress={onClose} style={styles.background} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <TouchableOpacity onPress={handleClose} style={styles.navbar}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>{t("write-review.title")}</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {selectedImages.length === 0 ? (
                        <View style={styles.image} />
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
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => setRating(star)}>
                            <Entypo name="star" size={30} color={rating >= star ? "#FFD600" : "#665602"} />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.reviewContainer}>
                    <Text style={styles.titleInput}>{t("write-review.comment-title")}</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                        placeholder={t("write-review.comment-placeholder")}
                        value={description}
                        onChangeText={onChangeDescription}
                    />
                </View>
                {product.subcategory === 'Одежда' && (
                    <>
                        <View style={styles.reviewContainer}>
                            <Text style={styles.titleInput}>{t("write-review.color-title")}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("write-review.color-placeholder")}
                                value={color}
                                onChangeText={onChangeColor}
                            />
                        </View>
                        <View style={styles.reviewContainer}>
                            <Text style={styles.titleInput}>{t("write-review.size-title")}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("write-review.size-placeholder")}
                                value={size}
                                onChangeText={onChangeSize}
                                keyboardType="numeric"
                            />
                        </View>
                    </>
                )}
                {message && <Text style={styles.error}>{message}</Text>}
                <TouchableOpacity onPress={publishReview} style={styles.publicButton}>
                    <Text style={styles.publicButtonText}>{t("write-review.publish-btn")}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            {isChoiseImage && (
                <View style={styles.backgroundContainer}>
                    <View style={styles.containerChoiseImage}>
                        <TouchableOpacity onPress={toggleChoiseImage}>
                            <AntDesign name="close" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePhoto} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>{t("take-photo-button")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage} style={styles.buttonChoiseImage}>
                            <Text style={styles.buttonChoiseImageText}>{t("pick-photo-button")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Modal>
    );
}

export default WriteReview;


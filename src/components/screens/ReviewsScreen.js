import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useUnauth } from '../../context/UnauthProvider';
import { getUserData } from '../../store/userDataManager';
import styles from '../../styles/ReviewsScreenStyles';
import ImagePreview from '../ux/popup/ImagePreview';
import WriteReview from '../ux/popup/WriteReview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ReviewsScreen({ route }) {
    const navigation = useNavigation();
    const { product, id } = route.params;
    const [isShowImagePreview, setShowImagePreview] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isShowWriteReview, setShowWriteReview] = useState(false);
    const [likes, setLikes] = useState({});
    const [activeCategory, setActiveCategory] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [reviewsData, setReviews] = useState([]);
    const { openModal } = useUnauth();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    const categories = [
        { id: 1, name: t('reviews-screen.positive-rate'), value: '5' },
        { id: 2, name: t('reviews-screen.negative-rate'), value: '1' },
        { id: 3, name: '5 ★', value: '5' },
        { id: 4, name: '4 ★', value: '4' },
        { id: 5, name: '3 ★', value: '3' },
        { id: 6, name: '2 ★', value: '2' },
        { id: 7, name: '1 ★', value: '1' }
    ];

    useFocusEffect(
        useCallback(() => {
            loadReviewsData();
        }, [])
    );

    const loadReviewsData = () => {
        fetch(`https://aqtas.garcom.kz/api/products/${id}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {

            });
    };

    // Определение суммарного рейтинга
    const totalRating = reviewsData.reduce((total, review) => total + review.stars, 0);
    const averageRating = (totalRating / reviewsData.length).toFixed(1); // Форматируем до 1 знака после запятой

    // Расчет соотношения рейтингов
    const ratingCounts = Array(5).fill(0);

    reviewsData.forEach((review) => {
        ratingCounts[review.stars - 1]++;
    });

    const toggleWriteReview = async () => {
        const userData = await getUserData();
        if (userData) {
            setShowWriteReview(!isShowWriteReview);
        } else {
            openModal(t("unauth-modal.title"), t("unauth-modal.description-reviews"))
        }
    }

    const toggleShowImagePreview = () => {
        setShowImagePreview(!isShowImagePreview)
    }

    const handleImagePreview = (imageUrl) => {
        setSelectedImage(imageUrl);
        toggleShowImagePreview();
    };

    const dislike = (reviewId) => {
        // Проверяем, поставлен ли уже дизлайк для этого отзыва
        if (likes[reviewId] !== 'dislike') {
            axios.post(`https://aqtas.garcom.kz/api/dislikeReview/${reviewId}`)
                .then(response => {

                    // Устанавливаем состояние дизлайка для этого отзыва
                    setLikes({ ...likes, [reviewId]: 'dislike' });
                })
                .catch(error => {

                });
        }
    };

    const like = (reviewId) => {
        // Проверяем, поставлен ли уже дизлайк для этого отзыва
        if (likes[reviewId] !== 'like') {
            axios.post(`https://aqtas.garcom.kz/api/likeReview/${reviewId}`)
                .then(response => {
                    // Устанавливаем состояние дизлайка для этого отзыва
                    setLikes({ ...likes, [reviewId]: 'like' });
                })
                .catch(error => {
                });
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const starsRender = (countStar) => Array(countStar).fill().map((_, index) => (
        <Entypo key={index} name="star" size={20} color="#FFD600" />
    ));

    function starsRatePercentage(stars) {
        const fiveStarsCount = reviewsData.filter(review => review.stars === stars).length;
        const totalReviews = reviewsData.length;
        const percentage = (fiveStarsCount / totalReviews) * 100;
        if (percentage === 0) {
            return 2;
        } else {
            return percentage;
        }
    };

    const handleCategoryClick = (categoryId) => {
        if (activeCategory === categoryId) {
            setActiveCategory(null);
            setIsLoading(true); // Показать индикатор загрузки

            // Вернуться к рендеру всех продуктов через некоторое время
            setTimeout(() => {
                setIsLoading(false);
                loadReviewsData();  // Загрузить все продукты с сервера
            }, 1000); // Время загрузки в миллисекундах (в данном случае 5 секунд)
        } else {
            setActiveCategory(categoryId);
            setIsLoading(true);
            fetch(`https://aqtas.garcom.kz/api/products/${id}/reviews/${categories[categoryId - 1].value}`)
                .then((response) => response.json())
                .then((data) => {
                    setReviews(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF' }}>
            <View style={{ width: '100%', height: '100%' }}>
                <View style={styles.header}>
                    <TouchableOpacity style={[styles.titleContainer, { marginTop: Platform.OS === 'android' && 36 }]} onPress={handleGoBack}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        <Text style={styles.title}>{t("reviews-screen.title")}</Text>
                    </TouchableOpacity>
                    <View style={styles.categoriesContainer}>
                        <ScrollView style={styles.categories} horizontal={true}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={
                                        activeCategory === category.id
                                            ? styles.categoryActive
                                            : styles.category
                                    }
                                    onPress={() => handleCategoryClick(category.id)}
                                >
                                    <Text
                                        style={
                                            activeCategory === category.id
                                                ? styles.categoryTextActive
                                                : styles.categoryText
                                        }
                                    >
                                        {category.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.container}>
                    {isLoading && (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>{t("reviews-screen.load")}</Text>
                        </View>
                    )}
                    {!isLoading && (
                        <>
                            {
                                reviewsData.length > 0 ? (
                                    <ScrollView style={{ paddingHorizontal: 20 }}>
                                        <View style={styles.reviewsStats}>
                                            <Text style={{ fontFamily: 'Cambria', fontSize: 20 }}>{reviewsData.length} {t("reviews-screen.marks")}</Text>
                                            <Text style={{ fontFamily: 'Cambria', marginLeft: 10, fontSize: 20 }}>{reviewsData.length} {t("reviews-screen.marks")}</Text>
                                        </View>
                                        <View style={styles.starsContainer}>
                                            <Text style={[styles.title, { fontSize: 36 }]}>{averageRating}/5</Text>
                                            <View style={{ alignItems: 'flex-end', marginTop: 10, right: 20 }}>
                                                {[5, 4, 3, 2, 1].map(star => (
                                                    <View key={star} style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                                        {starsRender(star)}
                                                        <View style={{ width: '50%', marginLeft: 10 }}>
                                                            <View style={{ width: `${starsRatePercentage(star)}%`, backgroundColor: '#FFD600', height: 3 }} />
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                        {reviewsData.map((review, index) => (
                                            <View key={index}>
                                                <View style={styles.imagesPreview}>
                                                    {[1, 2, 3].map(imageNumber => {
                                                        const photoReviewKey = `photoReview${imageNumber}`;
                                                        const photoReview = review[photoReviewKey];
                                                        if (photoReview) {
                                                            return (
                                                                <TouchableOpacity
                                                                    key={photoReviewKey}
                                                                    onPress={() => handleImagePreview({ uri: `https://aqtas.garcom.kz/api/images/imageReviews/${photoReview}` })}
                                                                    style={{ marginLeft: 10 }}
                                                                >
                                                                    <Image source={{ uri: `https://aqtas.garcom.kz/api/images/imageReviews/${photoReview}` }} style={styles.imageReview} />
                                                                </TouchableOpacity>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </View>
                                                <View style={styles.review}>
                                                    <View style={styles.reviewInfo}>
                                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <Image style={styles.imageReviewer} source={{ uri: `https://aqtas.garcom.kz/api/images/photoUsers/${review.photoReviewer}` }} />
                                                            <View style={{ marginLeft: 10 }}>
                                                                <Text style={styles.reviwerName}>{review.nameReviewer}</Text>
                                                                <Text style={styles.reviewerDate}>
                                                                    {new Date(review.date).toLocaleDateString("ru-RU", {
                                                                        day: "numeric",
                                                                        month: "numeric",
                                                                        year: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', display: 'flex' }}>
                                                            {Array(review.stars).fill().map((_, index) => (
                                                                <Entypo key={index} name="star" size={20} color='#FFD600' />
                                                            ))}
                                                        </View>
                                                    </View>
                                                    <Text style={styles.reviewDescription}>{review.description}</Text>
                                                    <View style={styles.additionalInfo}>
                                                        <View style={{ display: 'row', flexDirection: 'row' }}>
                                                            <View>
                                                                {review.size && <Text style={styles.firstInfo}>{t("reviews-screen.size")}</Text>}
                                                                {review.color && <Text style={styles.firstInfo}>{t("reviews-screen.color")}</Text>}
                                                            </View>
                                                            <View style={{ left: 10 }}>
                                                                {review.size && <Text style={styles.secondInfo}>{review.size}</Text>}
                                                                {review.color && <Text style={styles.secondInfo}>{review.color}</Text>}
                                                            </View>
                                                        </View>
                                                        <View style={styles.likeContainer}>
                                                            <TouchableOpacity onPress={() => dislike(review.id)} style={styles.likeCounter}>
                                                                <Text style={styles.likeCount}>{review.dislike}</Text>
                                                                <AntDesign name={likes[review.id] === 'dislike' ? "dislike1" : "dislike2"} size={24} color="#26CFFF" />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => like(review.id)} style={[styles.likeCounter, { marginLeft: 10 }]}>
                                                                <Text style={styles.likeCount}>{review.like}</Text>
                                                                <AntDesign name={likes[review.id] === 'like' ? "like1" : "like2"} size={24} color="#26CFFF" />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
                                    </ScrollView>
                                ) : (
                                    <View style={styles.noDataContainer}>
                                        <Text style={styles.noDataText}>
                                            {t("reviews-screen.no-reviews")}
                                        </Text>
                                    </View>
                                )
                            }

                        </>
                    )}
                    <View style={[styles.buttonContainer, { marginBottom: insets.bottom }]}>
                        <TouchableOpacity onPress={toggleWriteReview} style={styles.writeReviewButton}>
                            <Text style={styles.writeReviewButtonText}>{t("reviews-screen.write-review-btn")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {isShowImagePreview && <ImagePreview image={selectedImage} onClose={toggleShowImagePreview} />}
                <WriteReview
                    onClose={toggleWriteReview}
                    productId={id}
                    product={product}
                    modalVisible={isShowWriteReview}
                />
            </View>
        </SafeAreaView>
    )
};

export default ReviewsScreen;
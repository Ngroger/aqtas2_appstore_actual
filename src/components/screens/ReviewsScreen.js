import { Text, TouchableOpacity, Image, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import styles from '../../styles/ReviewsScreenStyles';
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ImagePreview from '../ux/popup/ImagePreview';
import WriteReview from '../ux/popup/WriteReview';
import axios from 'axios';

function ReviewsScreen({ route }) {
    const navigation = useNavigation();
    const { reviews, id } = route.params;
    const [isShowImagePreview, setShowImagePreview] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isShowWriteReview, setShowWriteReview] = useState(false);
    const [likes, setLikes] = useState({});
    const [activeCategory, setActiveCategory] = useState();
    const [isLoading, setIsLoading] = useState(false); 
    const [reviewsData, setReviews] = useState([]);
    const [isMainLoad, setIsMainLoad] = useState(false);

    useEffect(() => {
        loadReviewsData();
    }, []);

    const loadReviewsData = () => {
        fetch(`https://aqtas.ru/products/${id}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {

            });
    }

    const toggleWriteReview = () => {
        setShowWriteReview(!isShowWriteReview);
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
            axios.post(`https://aqtas.ru/dislikeReview/${reviewId}`)
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
            axios.post(`https://aqtas.ru/likeReview/${reviewId}`)
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
    
    // Определение суммарного рейтинга
    const totalRating = reviews.reduce((total, review) => total + review.stars, 0);
    const averageRating = (totalRating / reviewsData.length).toFixed(1); // Форматируем до 1 знака после запятой

    // Расчет соотношения рейтингов
    const ratingCounts = Array(5).fill(0);

    reviews.forEach((review) => {
        ratingCounts[review.stars - 1]++;
    });

    function starsRatePercentage(stars) {
        const fiveStarsCount = reviewsData.filter(review => review.stars === stars).length;
        const totalReviews = reviewsData.length;
        const percentage = (fiveStarsCount / totalReviews) * 100;
        if(percentage === 0) {
            return 2;
        } else {
            return percentage;
        }
    }

    const categories = [
        { id: 1, name: 'Положительные', value: '5' },
        { id: 2, name: 'Отрицательные', value: '1' },
        { id: 3, name: '5 ★', value: '5' },
        { id: 4, name: '4 ★', value: '4' },
        { id: 5, name: '3 ★', value: '3' },
        { id: 6, name: '2 ★', value: '2' },
        { id: 7, name: '1 ★', value: '1' },
    ];

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
            fetch(`https://aqtas.ru/products/${id}/reviews/${categories[categoryId - 1].value}`)
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
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>Отзывы</Text>
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
                { reviews.length > 0 ? (
                    <ScrollView>
                        <View style={styles.reviewsStats}>
                            <Text style={{ fontFamily: 'Cambria', fontSize: 20 }}>{reviewsData.length} оценок</Text>
                            <Text style={{ fontFamily: 'Cambria', marginLeft: 10, fontSize: 20 }}>{reviewsData.length} оценок</Text>
                        </View>
                        <View style={styles.starsContainer}>
                            <Text style={[styles.title, { fontSize: 36 }]}>{averageRating}/5</Text>
                            <View style={{ alignItems: 'flex-end', marginTop: 10, right: 20 }}>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                    {starsRender(5)}
                                    <View style={{  width: '50%', marginLeft: 10 }}>
                                        <View style={{ width: `${starsRatePercentage(5)}%`, backgroundColor: '#FFD600', height: 3 }}/>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                    {starsRender(4)}
                                    <View style={{  width: '50%', marginLeft: 10 }}>
                                        <View style={{ width: `${starsRatePercentage(4)}%`, backgroundColor: '#FFD600', height: 3 }}/>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                    {starsRender(3)}
                                    <View style={{  width: '50%', marginLeft: 10 }}>
                                        <View style={{ width: `${starsRatePercentage(3)}%`, backgroundColor: '#FFD600', height: 3 }}/>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                    {starsRender(2)}
                                    <View style={{  width: '50%', marginLeft: 10 }}>
                                        <View style={{ width: `${starsRatePercentage(2)}%`, backgroundColor: '#FFD600', height: 3 }}/>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                    {starsRender(1)}
                                    <View style={{  width: '50%', marginLeft: 10 }}>
                                        <View style={{ width: `${starsRatePercentage(1)}%`, backgroundColor: '#FFD600', height: 3 }}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            { isLoading && (
                                <View style={{ width: '100%', padding: 36, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                                    <ActivityIndicator size="big" color='#95E5FF'/>
                                    <Text style={styles.textLoad}>Это может занять немного времени</Text>
                                </View>
                            ) }
                            { !isLoading && (
                                <>
                                    { reviewsData.length > 0 ? (
                                        <>
                                            { reviewsData.map((review) => (
                                        <View>
                                            <View style={styles.imagesPreview}>
                                                {[1, 2, 3].map(imageNumber => {
                                                    const photoReviewKey = `photoReview${imageNumber}`;
                                                    const photoReview = review[photoReviewKey];
                                                    if (photoReview) {
                                                        return (
                                                            <TouchableOpacity
                                                                key={photoReviewKey}
                                                                onPress={() => handleImagePreview({ uri: `https://aqtas.ru/images/imageReviews/${photoReview}` })}
                                                                style={{ marginLeft: 10 }}
                                                            >
                                                                <Image source={{ uri: `https://aqtas.ru/images/imageReviews/${photoReview}` }} style={styles.imageReview} />
                                                            </TouchableOpacity>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </View>
                                                <View style={styles.review}> 
                                                    <View style={styles.reviewInfo}>
                                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <Image style={styles.imageReviewer} source={{ uri: `https://aqtas.ru/images/photoUsers/${review.photoReviewer}` }}/>
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
                                                            <Text style={styles.firstInfo}>Размер</Text>
                                                            <Text style={styles.firstInfo}>Цвет</Text>
                                                        </View>
                                                        <View style={{ left: 10 }}>
                                                            <Text style={styles.secondInfo}>{review.size}</Text>
                                                            <Text style={styles.secondInfo}>{review.color}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.likeContainer}>
                                                        <TouchableOpacity onPress={() => dislike(review.id)} style={styles.likeCounter}>
                                                            <Text style={styles.likeCount}>{review.dislike}</Text>
                                                            <AntDesign name={likes[review.id] === 'dislike' ? "dislike1" : "dislike2"} size={24} color="#95E5FF"/>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => like(review.id)} style={[styles.likeCounter, { marginLeft: 10 }]}>
                                                            <Text style={styles.likeCount}>{review.like}</Text>
                                                            <AntDesign name={likes[review.id] === 'like' ? "like1" : "like2"} size={24} color="#95E5FF"/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )) }
                                        </>
                                    ) : (
                                        <Text style={styles.noDataText}>Таких отзывов нет</Text>
                                    ) }
                                </>
                            ) }
                        </View>
                    </ScrollView>
                ) : (
                    <Text style={styles.noDataText}>На этом товаре ещё нет отзывов. Вы можете его оставить первым</Text>
                ) }
                <TouchableOpacity onPress={toggleWriteReview} style={styles.writeReviewButton}>
                    <Text style={styles.writeReviewButtonText}>Написать отзыв</Text>
                </TouchableOpacity>
            </View>
            {isShowImagePreview && <ImagePreview image={selectedImage} onClose={toggleShowImagePreview}/>}
            {isShowWriteReview && <WriteReview onClose={toggleWriteReview} productId={id}/>}
        </View>
    )
};

export default ReviewsScreen;
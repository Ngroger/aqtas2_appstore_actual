import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { useUnauth } from '../../context/UnauthProvider';
import { getUserData } from '../../store/userDataManager';
import styles from '../../styles/ProductCardScreenStyles';
import AboutCommision from '../ux/popup/AboutCommistion';
import AboutCostumer from '../ux/popup/AboutCostumer';
import NoAddressMessage from '../ux/popup/messages/NoAddressMessage';
import NoCardMessage from '../ux/popup/messages/NoCardMessage';
import SuccessOrder from '../ux/popup/messages/SuccessOrder';
import PaymentMethod from '../ux/popup/PaymentMethod';
import PhotoPreview from '../ux/popup/PhotoPreview';
import SizeSelector from '../ux/popup/SizeSelector';

function ProductCardScreen({ route }) {
    const [reviews, setReviews] = useState([]);
    const { product } = route.params;

    const navigation = useNavigation();
    const [isShowAboutComission, setShowAboutComission] = useState(false);
    const [isShowAboutCostumer, setShowAboutCostumer] = useState(false);
    const [customerData, setCustomerData] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isSizeSelect, setIsSizeSelector] = useState(false);
    const [productId, setProductId] = useState();
    const [isOpenPhotos, setIsOpenPhotos] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { t } = useTranslation();
    const [userData, setUserData] = useState({});
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isCheckPayments, setCheckPayments] = useState(false);
    const [payments, setPayments] = useState([]);
    const [isPaymentsMethod, setPaymentsMethod] = useState(false);
    const [isSuccessOrder, setSuccessOrder] = useState(false);
    const [isNoAddress, setIsNoAddress] = useState(false);
    const { openModal } = useUnauth();
    const scrollRef = useRef();

    console.log("product: ", product);

    const toggleSetSize = async (id, product) => {
        const userData = await getUserData();
        if (userData) {
            setIsSizeSelector(!isSizeSelect);
            setProductId(id);
            setSelectedProduct(product);
        } else {
            openModal(t("unauth-modal.title"), t("unauth-modal.description"));
        }
    }

    const selectSize = (size) => {
        setSelectedSize(selectedSize === size ? null : size);
    };

    useEffect(() => {
        loadUserData();
        getSizes();
        fetch(`https://aqtas.garcom.kz/api/products/${product.id}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
                fetch(`https://aqtas.garcom.kz/api/customers/${product.CustomerId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setCustomerData(data);
                    })
                    .catch((error) => {

                    });
            })
            .catch((error) => {

            });
        fetch(`https://aqtas.garcom.kz/api/products/${product.category}`)
            .then((response) => response.json())
            .then((data) => {
                setSimilarProducts(data.products);
            })
            .catch((error) => {
            });
    }, []);

    const getSizes = () => {
        try {
            fetch(`https://aqtas.garcom.kz/api/sizes/${product.id}`)
                .then((response) => response.json())
                .then((data) => {
                    // Создаем массив непустых размеров
                    const nonNullSizes = [];

                    // Перебираем все размеры в первой записи (может быть несколько, в зависимости от структуры базы данных)
                    for (const key in data[0]) {
                        if (key.startsWith('size') && data[0][key] !== null) {
                            nonNullSizes.push(data[0][key]);
                        }
                    }

                    // Устанавливаем непустые размеры в состояние sizes
                    setSizes(nonNullSizes);
                })
                .catch((error) => {
                });
        } catch (error) {

        }
    }

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    };

    const toggleShowAbout = () => {
        setShowAboutComission(!isShowAboutComission)
    }
    const toggleShowCostumer = () => {
        setShowAboutCostumer(!isShowAboutCostumer)
    }

    const goToReviews = (reviews, id) => {
        navigation.navigate('Reviews', { product: product, id: product.id });
    };

    const starsRender = (countStar) => Array(countStar).fill().map((_, index) => (
        <Entypo key={index} name="star" size={20} color="#FFD600" />
    ));

    // Определение суммарного рейтинга
    const totalRating = reviews.reduce((total, review) => total + review.stars, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1); // Форматируем до 1 знака после запятой

    //Получение общего количества отзывов
    const totalReviews = reviews.length;

    // 3. Расчет соотношения рейтингов
    const ratingCounts = Array(5).fill(0);

    reviews.forEach((review) => {
        ratingCounts[review.stars - 1]++;
    });

    function starsRatePercentage(stars) {
        const fiveStarsCount = reviews.filter(review => review.stars === stars).length;
        const totalReviews = reviews.length;
        const percentage = (fiveStarsCount / totalReviews) * 100;
        if (percentage === 0) {
            return 2;
        } else {
            return percentage;
        }
    }

    const addToCart = async (product) => {
        const userData = await getUserData();
        if (userData) {
            const cartItem = {
                name: product.name,
                oldCost: product.oldCost,
                newCost: product.cost,
                description: product.description,
                brend: product.brend,
                costumer: product.costumer,
                imagePreview: product.imagePreview1,
                UserID: userData.userId,
                count: 1,
                customerId: product.CustomerId
            };

            fetch('https://aqtas.garcom.kz/api/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem),
            })
                .then((response) => response.json())
                .then((data) => {

                })
                .catch((error) => {

                });
        } else {
            openModal(t("unauth-modal.title"), t("unauth-modal.description"));
        }
    };

    const checkPayment = async () => {
        try {
            const response = await fetch(`https://aqtas.garcom.kz/api/bankCards/${userData.userId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length === 0) {
                    setCheckPayments(true);
                    return true
                } else {
                    setCheckPayments(false)
                    setPayments(data);
                    return false
                }
            } else {

            }
        } catch (error) {

        }
    }

    const toggleSetPaymentsMethod = () => {
        setPaymentsMethod(!isPaymentsMethod);
    }

    const toggleSetSuccessOrder = () => {
        setSuccessOrder(!isSuccessOrder);
        setPaymentsMethod(false);
    }

    const renderImages = (product) => {
        const images = [];

        Object.keys(product).forEach(key => {
            if (key.startsWith('imagePreview')) {
                const imagePreviewPath = product[key];

                if (imagePreviewPath) {
                    images.push(imagePreviewPath);
                }
            }
        });

        return images;
    };

    const images = renderImages(product);

    const goToCard = (product) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0, animated: true }); // Прокрутка на начало
        }
        navigation.navigate('Product', { product });
    };

    return (
        <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackBtn}>
                <Feather name="chevron-left" size={38} color="#26CFFF" />
            </TouchableOpacity>
            <ScrollView ref={scrollRef} style={styles.container}>

                <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center', }}>
                    <Swiper
                        showsButtons={false}
                        style={styles.swiper}
                        paginationStyle={styles.pagination}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                    >
                        {images.map((image, index) => (
                            <TouchableOpacity onPress={() => setIsOpenPhotos(true)} key={index}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: `https://aqtas.garcom.kz/api/images/imageProducts/${image}` }}
                                />
                            </TouchableOpacity>
                        ))}
                    </Swiper>
                </View>
                <View style={{ padding: 20 }}>
                    <View style={[styles.infoContainer, { paddingBottom: 10 }]}>
                        {product.oldCost && <Text style={styles.oldCost}>{product.oldCost}тнг</Text>}
                        <View style={styles.costContainer}>
                            <Text style={styles.cost}>{product.cost}тнг</Text>
                            {product.delivery === 'Маркетплейс' && (
                                <>
                                    <Text style={styles.commission}>+{product.deliveryCost}тг</Text>
                                    <TouchableOpacity onPress={() => setShowAboutComission(true)} style={styles.commisionButton}>
                                        <AntDesign name="question" size={16} color="#26CFFF" />
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                        <Text style={styles.title}>{product.name}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                    <View style={[styles.infoContainer, { paddingVertical: 10 }]}>
                        <Text style={styles.title}>Таблица размеров</Text>
                        <View style={styles.sizeContainer}>
                            {sizes.length == 0 ? (
                                <View>
                                    <Text style={{ fontFamily: 'Cambria', fontSize: 20, color: '#BDBDBD', marginVertical: 5 }}>Продавец не добавил размеры</Text>
                                </View>
                            ) : (
                                <>
                                    {sizes.length === 0 ? (
                                        <View>
                                            <Text style={{ fontFamily: 'Cambria', fontSize: 20, color: '#BDBDBD', marginVertical: 5 }}>Продавец не добавил размеры</Text>
                                        </View>
                                    ) : (
                                        <>
                                            {sizes.map((size, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[
                                                        styles.size,
                                                        selectedSize === size ? styles.selectedSize : null,
                                                    ]}
                                                    onPress={() => selectSize(size)}
                                                >
                                                    <Text style={styles.sizeText}>{size}</Text>
                                                    {selectedSize === size && <View style={styles.sizeSelected} />}
                                                </TouchableOpacity>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </View>
                        { product.sizeImages && <Image source={{ uri: `https://aqtas.garcom.kz/api/images/imageProducts/${product.sizeImages}` }} style={styles.tableImage}/> }
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.title, { fontSize: 20, marginTop: 10 }]}>{t('additional-card-info')}</Text>
                        <View style={styles.additionInfo}>
                            <View>
                                <Text style={styles.firstInfo}>{t('manufacture-card-info')}</Text>
                                <Text style={styles.firstInfo}>{t('color-card-info')}</Text>
                                <Text style={styles.firstInfo}>{t('category-card-info')}</Text>
                                <Text style={styles.firstInfo}>Подкатегория</Text>
                                <Text style={styles.firstInfo}>Тип продукта</Text>
                                <Text style={styles.firstInfo}>{t('brend-card-info')}</Text>
                                <Text style={styles.firstInfo}>{t('delivery-card-info')}</Text>
                                <Text style={styles.firstInfo}>Единица измерения</Text>
                                <Text style={styles.firstInfo}>Сезон</Text>
                            </View>
                            <View>
                                <Text style={styles.secondInfo}>{product.manufacturer}</Text>
                                <Text style={styles.secondInfo}>{product.color}</Text>
                                <Text style={styles.secondInfo}>{product.category}</Text>
                                <Text style={styles.secondInfo}>{product.subcategory}</Text>
                                <Text style={styles.secondInfo}>{product.type}</Text>
                                <Text style={styles.secondInfo}>{product.brend}</Text>
                                <Text style={styles.secondInfo}>{product.delivery}</Text>
                                <Text style={styles.secondInfo}>{product.entity}</Text>
                                <Text style={styles.secondInfo}>{product.season}</Text>
                            </View>
                        </View>
                    </View>
                    {customerData.length > 0 && (
                        <View style={styles.infoContainer}>
                            <View style={styles.aboutCostumer}>
                                <View>
                                    <Text style={[styles.title, { fontSize: 18 }]}>{customerData[0]?.shop}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={[styles.title, { fontSize: 16, color: '#BDBDBD' }]}>{customerData[0]?.fullname}</Text>
                                        <TouchableOpacity onPress={toggleShowCostumer} style={[styles.commisionButton, { left: 7 }]}>
                                            <Text style={{ fontFamily: 'Cambria', color: '#26CFFF', fontSize: 18 }}>!</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.statsContainer}>
                                        <View style={styles.stat}>
                                            <Entypo name="star" size={20} color="#FFD600" />
                                            <Text style={styles.statText}>{customerData[0]?.countSales} {t('count-of-sales-title')}</Text>
                                        </View>
                                        <View style={styles.stat}>
                                            <Image style={{ width: 20, height: 20 }} source={require('../../img/clothes.png')} />
                                            <Text style={styles.statText}>{customerData[0]?.defect}% {t('percentage-of-defects-title')}</Text>
                                        </View>
                                        <View style={styles.stat}>
                                            <Image style={{ width: 20, height: 20 }} source={require('../../img/calendar.png')} />
                                            <Text style={styles.statText}>С {new Date(customerData[0]?.timeRegistration).toLocaleDateString("ru-RU", { day: "numeric", month: "numeric", year: "numeric" })} {t('date-of-reg-customer-title')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    <View style={[styles.infoContainer, { padding: 0 }]}>
                        <TouchableOpacity onPress={() => goToReviews(reviews)} style={styles.reviewsStats}>
                            <Text style={{ fontFamily: 'Cambria', fontSize: 20 }}>{reviews.length} {t('count-rates-title')}</Text>
                            <Text style={{ fontFamily: 'Cambria', marginLeft: 10, fontSize: 20 }}>{reviews.length} {t('count-reviews-title')}</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </TouchableOpacity>
                        {reviews.length > 0 ? (
                            <View style={styles.starsContainer}>
                                <Text style={[styles.title, { fontSize: 36 }]}>{averageRating}/5</Text>
                                <View style={{ alignItems: 'flex-end', marginTop: 10, right: 20 }}>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        {starsRender(5)}
                                        <View style={{ width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: `${starsRatePercentage(5)}%`, backgroundColor: '#FFD600', height: 3 }} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        {starsRender(4)}
                                        <View style={{ width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: `${starsRatePercentage(4)}%`, backgroundColor: '#FFD600', height: 3 }} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        {starsRender(3)}
                                        <View style={{ width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: `${starsRatePercentage(3)}%`, backgroundColor: '#FFD600', height: 3 }} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        {starsRender(2)}
                                        <View style={{ width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: `${starsRatePercentage(2)}%`, backgroundColor: '#FFD600', height: 3 }} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                        {starsRender(1)}
                                        <View style={{ width: '50%', marginLeft: 10 }}>
                                            <View style={{ width: `${starsRatePercentage(1)}%`, backgroundColor: '#FFD600', height: 3 }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <Text style={styles.noDataText}>{t('no-reviews-message')}</Text>
                        )}
                        <View style={styles.reviewsContainer}>
                            <FlatList
                                horizontal={true} // Горизонтальный список
                                data={reviews}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    const formattedDate = format(new Date(item.date), 'dd.MM в HH:mm');
                                    return (
                                        <View style={styles.review}>
                                            <View style={styles.reviewInfo}>
                                                <Image
                                                    style={styles.imageReviewer}
                                                    source={{ uri: `https://aqtas.garcom.kz/api/images/photoUsers/${item.photoReviewer}` }}
                                                />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={styles.reviwerName}>{item.nameReviewer}</Text>
                                                    <Text style={styles.reviewerDate}>{formattedDate}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', display: 'flex', marginLeft: 20 }}>
                                                    {Array(item.stars).fill().map((_, index) => (
                                                        <Entypo key={index} name="star" size={20} color='#FFD600' />
                                                    ))}
                                                </View>
                                            </View>
                                            <Text style={styles.reviewDescription}>{item.description}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.title, { marginTop: 12 }]}>{t('similar-products-title')}</Text>
                        {similarProducts.length === 0 ? (
                            <View>
                                <Text style={styles.noDataText}>{t('no-similar-products')}</Text>
                            </View>
                        ) : (
                            <FlatList
                                horizontal={true}
                                data={similarProducts}
                                keyExtractor={(item) => item.id.toString()}
                                style={{ marginTop: 12 }}
                                renderItem={({ item }) => {
                                    // Получаем массив картинок для товара
                                    const images = renderImages(item);

                                    return (
                                        <View style={styles.cart} key={item.id}>
                                            <View style={styles.previewContainer}>
                                                {images.length === 1 ? (
                                                    <Image
                                                        style={styles.cartPreview}
                                                        source={{
                                                            uri: `https://aqtas.garcom.kz/api/images/imageProducts/${images[0]}`,
                                                        }}
                                                    />
                                                ) : (
                                                    <Swiper
                                                        showsButtons={false}
                                                        style={{ width: 1000, height: 300 }}
                                                        paginationStyle={styles.pagination}
                                                        dotStyle={styles.dot}
                                                        activeDotStyle={styles.activeDot}
                                                    >
                                                        {images.map((imagePreviewPath, index) => (
                                                            <Image
                                                                key={index}
                                                                style={styles.cartPreview}
                                                                source={{
                                                                    uri: `https://aqtas.garcom.kz/api/images/imageProducts/${imagePreviewPath}`,
                                                                }}
                                                            />
                                                        ))}
                                                    </Swiper>
                                                )}
                                                {item.isTOP && (
                                                    <View style={styles.top}>
                                                        <Text style={styles.textTop}>TOP</Text>
                                                    </View>
                                                )}
                                                {item.sale && (
                                                    <View
                                                        style={images.length === 1 ? { ...styles.sale, bottom: 12 } : styles.sale}
                                                    >
                                                        <Text style={styles.saleText}>{item.sale}%</Text>
                                                    </View>
                                                )}
                                            </View>
                                            <TouchableOpacity onPress={() => goToCard(item)}>
                                                <View
                                                    style={images.length === 1 ? { ...styles.costContainer, marginTop: 10 } : { ...styles.costContainer, marginTop: -20 }}
                                                >
                                                    <Text style={styles.cost}>{item.cost}тнг</Text>
                                                    {item.oldCost && <Text style={styles.oldCost}>{item.oldCost}тнг</Text>}
                                                </View>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <Text style={styles.description}>
                                                    {item.description.length > 20
                                                        ? item.description.slice(0, 20) + '...'
                                                        : item.description}
                                                </Text>
                                                <TouchableOpacity onPress={() => toggleSetSize(item.id, item)} style={styles.addCart}>
                                                    <Text style={styles.addCartText}>{t('add-cart-button')}</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                            />
                        )}
                    </View>
                    <View style={styles.buttons}>
                        {/* <TouchableOpacity onPress={() => buyNow(product.subcategory)} style={styles.buyNow}>
                            <Text style={styles.buyNowText}>{t('buy-now-button')}</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => toggleSetSize(product.id, product)} style={styles.addToCartButtons}>
                            <Text style={styles.addToCartButtonText}>{t('add-to-card-from-card-screen')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {isShowAboutComission && <AboutCommision onClose={toggleShowAbout} />}
            {isShowAboutCostumer && <AboutCostumer data={customerData} onClose={toggleShowCostumer} />}
            {isSizeSelect && <SizeSelector onClose={toggleSetSize} id={productId} productData={selectedProduct} />}
            {isCheckPayments && <NoCardMessage />}
            {isPaymentsMethod && <PaymentMethod productName={product.name} customerId={product.CustomerId} payments={payments} onClose={toggleSetPaymentsMethod} success={toggleSetSuccessOrder} size={selectedSize} />}
            {isSuccessOrder && <SuccessOrder onClose={toggleSetSuccessOrder} />}
            {isNoAddress && <NoAddressMessage />}
            <PhotoPreview
                onClose={() => setIsOpenPhotos(false)}
                product={product}
                modalVisible={isOpenPhotos}
            />
        </>
    )
};

export default ProductCardScreen;
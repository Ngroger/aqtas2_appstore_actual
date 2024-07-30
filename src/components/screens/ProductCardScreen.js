import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import styles from '../../styles/ProductCardScreenStyles';
import Swiper from 'react-native-swiper'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import AboutCommision from '../ux/popup/AboutCommistion';
import AboutCostumer from '../ux/popup/AboutCostumer';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import SizeSelector from '../ux/popup/SizeSelector';
import { getUserData } from '../../store/userDataManager';
import NoCardMessage from '../ux/popup/messages/NoCardMessage';
import PaymentMethod from '../ux/popup/PaymentMethod';
import SuccessOrder from '../ux/popup/messages/SuccessOrder';
import NoAddressMessage from '../ux/popup/messages/NoAddressMessage';

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
    const [selectedProduct, setSelectedProduct] = useState([]);
    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isCheckPayments, setCheckPayments] = useState(false);
    const [payments, setPayments] = useState([]);
    const [isPaymentsMethod, setPaymentsMethod] = useState(false);
    const [isSuccessOrder, setSuccessOrder] = useState(false);
    const [isNoAddress, setIsNoAddress] = useState(false);

    const toggleSetSize = (id, product) => {
        setIsSizeSelector(!isSizeSelect);
        setProductId(id);
        setSelectedProduct(product);
    }

    const selectSize = (size) => {
        setSelectedSize(selectedSize === size ? null : size);
    };
    
    useEffect(() => {
        loadUserData();
        getSizes();
        fetch(`https://aqtas.ru/products/${product.id}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
                fetch(`https://aqtas.ru/customers/${product.CustomerId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setCustomerData(data);
                    })
                    .catch((error) => {

                    });
            })
            .catch((error) => {
                
            });
        fetch(`https://aqtas.ru/products/${product.category}`)
            .then((response) => response.json())
            .then((data) => {
                setSimilarProducts(data);
            })
            .catch((error) => {
            });
    }, []);

    const getSizes = () => {
        try {
            fetch(`https://aqtas.ru/sizes/${product.id}`)
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
        navigation.navigate('Reviews', { reviews, id: product.id });
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
        if(percentage === 0) {
            return 2;
        } else {
            return percentage;
        }
    }

    const addToCart = (product) => {
        // Определим параметры для добавления товара в корзину
        const cartItem = {
            name: product.name,
            oldCost: product.oldCost,
            newCost: product.cost,
            description: product.description,
            brend: product.brend,
            costumer: product.costumer,  // Получаем UserId из userData
            imagePreview: product.imagePreview1,  // По умолчанию используем imagePreview1,
            UserID: userData.userId,
            count: 1,  // Устанавливаем значение по умолчанию в 1
        };
    
        // Отправляем POST-запрос к серверу
        fetch('https://aqtas.ru/addToCart', {
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
    };

    const checkPayment = async () => {
        try {
            const response = await fetch(`https://aqtas.ru/bankCards/${userData.userId}`);
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


    const buyNow = async (subcategory) => {
        if (subcategory === 'Одежда') {
            if(selectedSize === null) {
                alert('Вы не выбрали размер');
            } else {
                checkPayment();
                if(userData.address === 'Не указано') {
                    setIsNoAddress(true);
                } else {
                    setIsNoAddress(false)
                    if(checkPayment) {
                        setPaymentsMethod(true);
                    } 
                }
            }
        } else {
            checkPayment();
            if(userData.address === 'Не указано') {
                setIsNoAddress(true);
            } else {
                setIsNoAddress(false)
                if(checkPayment) {
                    setPaymentsMethod(true);
                } 
            }
        }
    }

    const toggleSetPaymentsMethod = () => {
        setPaymentsMethod(!isPaymentsMethod);
    }

    const toggleSetSuccessOrder = () => {
        setSuccessOrder(!isSuccessOrder);
        setPaymentsMethod(false);
    }
    

    return (
        <View>
            <ScrollView style={styles.container}>
                    <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center', }}>
                        <Swiper
                            showsButtons={false}
                            style={styles.swiper}
                            paginationStyle={styles.pagination}
                            dotStyle={styles.dot}
                            activeDotStyle={styles.activeDot}
                        >
                            {Array.from({ length: 5 }).map((_, index) => {
                                const imagePreviewKey = `imagePreview${index + 1}`;
                                const imagePreviewPath = product[imagePreviewKey];

                                if (imagePreviewPath) {
                                    return (
                                        <Image
                                            key={imagePreviewKey}
                                            style={styles.image}
                                            source={{ uri: `https://aqtas.ru/images/imageProducts/${imagePreviewPath}` }}
                                        />
                                    );
                                }

                                return null;
                            })}
                        </Swiper>
                    </View>
                    <View style={{ padding: 20 }}>
                        <View style={[styles.infoContainer, { paddingBottom: 10 }]}>
                            { product.oldCost && <Text style={styles.oldCost}>{product.oldCost}тнг</Text>}
                            <View style={styles.costContainer}>
                                <Text style={styles.cost}>{product.cost}тнг</Text>
                            </View>
                            <Text style={styles.title}>{product.name}</Text>
                            <Text style={styles.description}>{product.description}</Text>
                        </View>
                        { product.subcategory === 'Одежда' ? (
                            <View style={[styles.infoContainer, { paddingVertical: 10 }]}>
                                <Text style={styles.title}>Таблица размеров</Text>
                                <View style={styles.sizeContainer}>
                                    { sizes.length == 0 ? (
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
                                                    key={size.id}
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
                                    ) }
                                </View>
                            </View>
                        ) : null}
                        <View style={styles.infoContainer}>
                            <Text style={[styles.title, { fontSize: 20, marginTop: 10 }]}>{t('additional-card-info')}</Text>
                            <View style={styles.additionInfo}>
                                <View>
                                    <Text style={styles.firstInfo}>{t('manufacture-card-info')}</Text>
                                    <Text style={styles.firstInfo}>{t('color-card-info')}</Text>
                                    <Text style={styles.firstInfo}>{t('category-card-info')}</Text>
                                    <Text style={styles.firstInfo}>{t('brend-card-info')}</Text>
                                    <Text style={styles.firstInfo}>{t('delivery-card-info')}</Text>
                                    <Text style={styles.firstInfo}>Сезон</Text>
                                </View>
                                <View>
                                    <Text style={styles.secondInfo}>{product.manufacturer}</Text>
                                    <Text style={styles.secondInfo}>{product.color}</Text>
                                    <Text style={styles.secondInfo}>{product.category}</Text>
                                    <Text style={styles.secondInfo}>{product.brend}</Text>
                                    <Text style={styles.secondInfo}>{product.delivery}</Text>
                                    <Text style={styles.secondInfo}>{product.season}</Text>
                                </View>
                            </View>
                        </View>
                        { customerData.length > 0 && (
                            <View style={styles.infoContainer}>
                                <View style={styles.aboutCostumer}>
                                    { customerData.map((customer) => (
                                        <View key={customer.id}>
                                            <Text style={[styles.title, { fontSize: 18 }]}>{customer.shop}</Text>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Text style={[styles.title, { fontSize: 16, color: '#BDBDBD' }]}>{customer.fullname}</Text>
                                                <TouchableOpacity onPress={toggleShowCostumer} style={[styles.commisionButton, { left: 7 }]}>
                                                    <Text style={{ fontFamily: 'Cambria', color: '#95E5FF', fontSize: 18 }}>!</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.statsContainer}>
                                                <View style={styles.stat}>
                                                    <Entypo name="star" size={20} color="#FFD600" />
                                                    <Text style={styles.statText}>{customer.countSales} {t('count-of-sales-title')}</Text>
                                                </View>
                                                <View style={styles.stat}>
                                                    <Image style={{ width: 20, height: 20 }} source={require('../../img/clothes.png')} />
                                                    <Text style={styles.statText}>{customer.defect}% {t('percentage-of-defects-title')}</Text>
                                                </View>
                                                <View style={styles.stat}>
                                                    <Image style={{ width: 20, height: 20 }} source={require('../../img/calendar.png')} />
                                                    <Text style={styles.statText}>С {new Date(customer.timeRegistration).toLocaleDateString("ru-RU", {day: "numeric", month: "numeric", year: "numeric" })} {t('date-of-reg-customer-title')}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )) }
                                </View>
                            </View>
                        ) }
                        <View style={[styles.infoContainer, { padding: 0 }]}>
                            <TouchableOpacity onPress={() => goToReviews(reviews)} style={styles.reviewsStats}>
                                <Text style={{ fontFamily: 'Cambria', fontSize: 20 }}>{reviews.length} {t('count-rates-title')}</Text>
                                <Text style={{ fontFamily: 'Cambria', marginLeft: 10, fontSize: 20 }}>{reviews.length} {t('count-reviews-title')}</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </TouchableOpacity>
                            { reviews.length > 0 ? (
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
                            ) : (
                                <Text style={styles.noDataText}>{t('no-reviews-message')}</Text>
                            ) }
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
                                                    source={{ uri: `https://aqtas.ru/images/photoUsers/${item.photoReviewer}` }}
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
                        <View style={[styles.infoContainer, { padding: 10 }]}>
                            <Text style={styles.title}>{t('similar-products-title')}</Text>
                                { similarProducts.length == 0 ? (
                                    <View>
                                        <Text style={styles.noDataText}>{t('')}</Text>
                                    </View>
                                ) : (
                                    <FlatList
                                        horizontal={true} // Горизонтальный список
                                        data={similarProducts}
                                        keyExtractor={(item) => item}
                                        style={{ marginVertical: 10 }}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={styles.cart} key={item.id}>
                                                    <View style={styles.previewContainer}>
                                                        {item.imagePreview1 && !item.imagePreview2 ? (
                                                            <Image
                                                                style={styles.cartPreview}
                                                                source={{
                                                                    uri: `https://aqtas.ru/images/imageProducts/${item.imagePreview1}`,
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
                                                                {Array.from({ length: 5 }).map((_, index) => {
                                                                    const imagePreviewKey = `imagePreview${index + 1}`;
                                                                    const imagePreviewPath = item[imagePreviewKey];
            
                                                                    if (imagePreviewPath) {
                                                                        return (
                                                                            <Image
                                                                                key={imagePreviewKey}
                                                                                style={styles.cartPreview}
                                                                                source={{
                                                                                    uri: `https://aqtas.ru/images/imageProducts/${imagePreviewPath}`,
                                                                                }}
                                                                            />
                                                                        );
                                                                    }
            
                                                                    return null;
                                                                })}
                                                            </Swiper>
                                                        )}
                                                        {item.isTOP ? 
                                                            <View style={styles.top}>
                                                                <Text style={styles.textTop}>TOP</Text>
                                                            </View> : null}
                                                        { item.sale && (
                                                            <View style={item.imagePreview1 && !item.imagePreview2 ? {...styles.sale, bottom: 12} : styles.sale}>
                                                                <Text style={styles.saleText}>{item.sale}%</Text>
                                                            </View>
                                                        ) }
                                                    </View>
                                                    <TouchableOpacity onPress={_ => (goToCard(item))}>
                                                        <View style={item.imagePreview1 && !item.imagePreview2 ? {...styles.costContainer, marginTop: 10} : {...styles.costContainer, marginTop: -20}}>
                                                            <Text style={styles.cost}>{item.cost}тнг</Text>
                                                            { item.oldCost && <Text style={styles.oldCost}>{item.oldCost}тнг</Text>}
                                                        </View>
                                                        <Text style={styles.name}>{item.name}</Text>
                                                        <Text style={styles.description}>
                                                            {item.description.length > 20
                                                                ? item.description.slice(0, 20) + '...'
                                                                : item.description
                                                            }
                                                        </Text>
                                                        {item.subcategory === 'Одежда' ? (
                                                            <TouchableOpacity onPress={() => toggleSetSize(item.id, item)} style={styles.addCart}>
                                                                <Text style={styles.addCartText}>{t('add-cart-button')}</Text>
                                                            </TouchableOpacity>
                                                        ) : (
                                                            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addCart}>
                                                                <Text style={styles.addCartText}>{t('add-cart-button')}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }}
                                    />
                                ) }
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => buyNow(product.subcategory)} style={styles.buyNow}>
                                <Text style={styles.buyNowText}>{t('buy-now-button')}</Text>
                            </TouchableOpacity>
                            {product.subcategory === 'Одежда' ? (
                                <TouchableOpacity onPress={() => toggleSetSize(product.id, product)} style={styles.addToCartButtons}>
                                    <Text style={styles.addToCartButtonText}>{t('add-to-card-from-card-screen')}</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => addToCart(product)} style={styles.addToCartButtons}>
                                    <Text style={styles.addToCartButtonText}>{t('add-to-card-from-card-screen')}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
            </ScrollView>
            { isShowAboutComission && <AboutCommision onClose={toggleShowAbout}/> }
            { isShowAboutCostumer && <AboutCostumer data={customerData} onClose={toggleShowCostumer}/> }
            { isSizeSelect && <SizeSelector onClose={toggleSetSize} id={productId} productData={selectedProduct}/> }
            { isCheckPayments && <NoCardMessage/> }
            { isPaymentsMethod && <PaymentMethod productName={product.name} customerId={product.CustomerId} payments={payments} onClose={toggleSetPaymentsMethod} success={toggleSetSuccessOrder} size={selectedSize}/> }
            { isSuccessOrder && <SuccessOrder onClose={toggleSetSuccessOrder}/> }
            { isNoAddress && <NoAddressMessage/> }
        </View>
    )
};

export default ProductCardScreen;
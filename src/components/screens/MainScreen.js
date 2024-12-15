import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StatusBar, Alert } from 'react-native';
import styles from '../../styles/MainScreenStyle';
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { getUserData } from '../../store/userDataManager';
import SizeSelector from '../ux/popup/SizeSelector';
import { useTranslation } from 'react-i18next';
import { scale, s } from 'react-native-size-matters';

function MainScreen() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState({});
    const [activeCategory, setActiveCategory] = useState(null);
    const [flatListData, setFlatListData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Добавлено состояние для отображения индикатора загрузки
    const [search, onChangeSearch] = useState('');
    const [isSizeSelect, setIsSizeSelector] = useState(false);
    const [productId, setProductId] = useState();
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { t } = useTranslation();

    const toggleSetSize = (id, product) => {
        setIsSizeSelector(!isSizeSelect);
        setProductId(id);
        setSelectedProduct(product);
    }

    const categories = [
        { id: 1, value: 'Детская одежда', name: `${t('child-cloth-category')}` },
        { id: 2, value: 'Женское', name: `${t('woman-category')}` },
        { id: 3, value: 'Мужское', name: `${t('men-category')}` },
        { id: 4, value: 'Спорт', name: `${t('sport-category')}` },
    ];

    const handleCategoryClick = (categoryId) => {
        if (activeCategory === categoryId) {
            setActiveCategory(null);
            setIsLoading(true); // Показать индикатор загрузки

            // Вернуться к рендеру всех продуктов через некоторое время
            setTimeout(() => {
                setIsLoading(false);
                loadUserData();  // Загрузить все продукты с сервера
            }, 1000); // Время загрузки в миллисекундах (в данном случае 5 секунд)
        } else {
            setActiveCategory(categoryId);
            setIsLoading(true);

            fetch(`https://aqtas.garcom.kz/products/${categories[categoryId - 1].value}`)
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }
    };


    useEffect(() => {
        setIsLoading(true);
        loadUserData();
        const intervalId = setInterval(() => {
            try {
                fetch('https://aqtas.garcom.kz/products')
                    .then((response) => response.json())
                    .then((data) => {
                        setProducts(data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                    });
            } catch (error) {
            }
        }, 2000); // 5000 миллисекунд

        return () => {
            clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
        };
    }, []);

    const goToCard = (product) => {
        navigation.navigate('Product', { product });
    };

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    };

    const addToCart = async (product) => {
        try {
            // Определим параметры для добавления товара в корзину
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
            };

            const resposne = await fetch('https://aqtas.garcom.kz/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            });

            const responseJson = await resposne.json();

            if (responseJson.success) {
                Alert.alert(`${t("message-title")}`, `${t("product-success")}`);
            } else {
                if (responseJson.error === 'Этот товар уже есть в корзине') {
                    Alert.alert(`${t("title-no-card-message")}`, `${t("product-exist-in-cart")}`);;
                }
            }

        } catch (error) {
            console.log('add to cart error: ', error);

        };
    };

    const groupedProducts = {};
    if (Array.isArray(products)) {
        products.forEach((product) => {
            if (!groupedProducts[product.productFlag]) {
                groupedProducts[product.productFlag] = [];
            }
            groupedProducts[product.productFlag].push(product);
        });
    }

    const handleSearch = (search) => {
        setIsLoading(true);
        onChangeSearch(search);
        setTimeout(() => {
            if (!search) {
                fetch(`https://aqtas.garcom.kz/products`)
                    .then((response) => response.json())
                    .then((data) => {
                        setProducts(data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                    });
            }
            else {
                fetch(`https://aqtas.garcom.kz/productsSearch/${search}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setProducts(data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                    });
            }
        }, 1000);
    };

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Image style={styles.logo} source={require('../../img/miniLogo.png')} />
                    <View style={styles.search}>
                        <AntDesign name="search1" size={scale(14)} color="#BDBDBD" />
                        <TextInput value={search} onChangeText={(text) => handleSearch(text)} style={styles.serchInput} placeholder={`${t('search-products-placeholder')}`} />
                    </View>
                </View>
                <View style={styles.categoriesContainer}>
                    <ScrollView horizontal style={styles.categories}>
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
                {isLoading && (
                    <View style={styles.loadingIndicatorContainer}>
                        <ActivityIndicator size="large" color="#95E5FF" />
                        <Text style={[styles.textLoad, { color: '#000' }]}>{t('products-load-message')}</Text>
                    </View>
                )}

                {!isLoading && (
                    <>
                        {products.length > 0 ? (
                            <FlatList
                                data={Object.keys(groupedProducts)}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <View key={item}>
                                        <Text style={styles.title}>{item}</Text>
                                        <View style={styles.containerCart}>
                                            {groupedProducts[item].map((product) => (
                                                <View style={styles.cart} key={product.id}>
                                                    <View style={styles.previewContainer}>
                                                        {product.imagePreview1 && !product.imagePreview2 ? (
                                                            <Image
                                                                style={styles.cartPreview}
                                                                source={{
                                                                    uri: `https://aqtas.garcom.kz/images/imageProducts/${product.imagePreview1}`,
                                                                }}
                                                            />
                                                        ) : (
                                                            <Swiper
                                                                showsButtons={false}
                                                                style={{ width: 1000, height: 300, borderWidth: 1, borderColor: '#000' }}
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
                                                                                style={styles.cartPreview}
                                                                                source={{
                                                                                    uri: `https://aqtas.garcom.kz/images/imageProducts/${imagePreviewPath}`,
                                                                                }}
                                                                            />
                                                                        );
                                                                    }

                                                                    return null;
                                                                })}
                                                            </Swiper>
                                                        )}
                                                        {product.isTOP ?
                                                            <View style={styles.top}>
                                                                <Text style={styles.textTop}>TOP</Text>
                                                            </View> : null}
                                                        {product.sale && (
                                                            <View style={product.imagePreview1 && !product.imagePreview2 ? { ...styles.sale, bottom: 12 } : styles.sale}>
                                                                <Text style={styles.saleText}>{product.sale}%</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <TouchableOpacity onPress={_ => (goToCard(product))}>
                                                        <View style={product.imagePreview1 && !product.imagePreview2 ? { ...styles.costContainer, marginTop: 10 } : styles.costContainer}>
                                                            <Text style={styles.cost}>{product.cost}тнг</Text>
                                                            {product.oldCost && <Text style={styles.oldCost}>{product.oldCost}тнг</Text>}
                                                        </View>
                                                        <Text style={styles.name}>{product.name}</Text>
                                                        <Text style={styles.description}>
                                                            {product.description.length > 20
                                                                ? product.description.slice(0, 20) + '...'
                                                                : product.description
                                                            }
                                                        </Text>
                                                        {product.subcategory === 'Одежда' ? (
                                                            <TouchableOpacity onPress={() => toggleSetSize(product.id, product)} style={styles.addCart}>
                                                                <Text style={styles.addCartText}>{t('add-cart-button')}</Text>
                                                            </TouchableOpacity>
                                                        ) : (
                                                            <TouchableOpacity onPress={() => addToCart(product)} style={styles.addCart}>
                                                                <Text style={styles.addCartText}>{t('add-cart-button')}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={styles.noDataText}>{t('no-products-message')}</Text>
                        )}
                    </>
                )}
                <StatusBar backgroundColor="transparent" translucent={true} />
            </View>
            {isSizeSelect && <SizeSelector onClose={toggleSetSize} id={productId} productData={selectedProduct} />}
        </View>
    );
}

export default MainScreen;

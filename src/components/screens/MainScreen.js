import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { categories } from '../../categories';
import { useCategories } from '../../context/CategoriesProvider';
import { useUnauth } from '../../context/UnauthProvider';
import { getUserData } from '../../store/userDataManager';
import styles from '../../styles/MainScreenStyle';
import SizeSelector from '../ux/popup/SizeSelector';

function MainScreen() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState({});

    const { selectedCategory, selectCategoryContext } = useCategories();

    const [isLoading, setIsLoading] = useState(false);
    const [search, onChangeSearch] = useState('');
    const [isSizeSelect, setIsSizeSelector] = useState(false);
    const [productId, setProductId] = useState();
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { t } = useTranslation();
    const { openModal } = useUnauth();

    useEffect(() => {
        loadUserData();
        // Здесь вы вызываете fetchProducts при изменении selectedCategory
        fetchProducts(selectedCategory ? 'categories' : 'all', selectedCategory);
    }, [selectedCategory]);

    const toggleSetSize = async (id, product) => {
        const userData = await getUserData();
        if (userData) {
            console.log("test 2");
            setIsSizeSelector(!isSizeSelect);
            setProductId(id);
            setSelectedProduct(product);
        } else {
            openModal(t("unauth-modal.title"), t("unauth-modal.description"));
        }
    };

    const selectCategory = async (category) => {
        console.log("selected category: ", category);
        if (selectedCategory === category) {
            selectCategoryContext(null);
            await fetchProducts('all');
        } else {
            selectCategoryContext(category);
            await fetchProducts('categories', category);
        }
    };

    const fetchProducts = async (type, category) => {
        try {
            setIsLoading(true);

            const url = type === 'categories'
                ? `https://aqtas.garcom.kz/api/products/${category}`
                : 'https://aqtas.garcom.kz/api/products';

            console.log("url: ", url);
            console.log("type: ", type);

            const response = await fetch(url, {
                method: 'GET'
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                setProducts(responseJson.products);
            }
        } catch (error) {
            console.log('fetch by category error: ', error);
        } finally {
            setIsLoading(false);
        }
    };


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
        console.log("test");
        console.log("addToCart product LOG: ", product);
        if (!userData || !userData.userId) {
            openModal("Предупреждение", "Для того, чтоб добавить товар в корзину нужно авторизорваться");
            return;
        }

        try {
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
                customerId: product.CustomerId,
                productId: product.id
            };

            console.log("test");
            console.log("product: ", product);

            const response = await fetch('https://aqtas.garcom.kz/api/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem),
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                Alert.alert(`${t("message-title")}`, `${t("product-success")}`);
            } else if (responseJson.error === 'Этот товар уже есть в корзине') {
                Alert.alert(`${t("title-no-card-message")}`, `${t("product-exist-in-cart")}`);
            }
        } catch (error) {
            console.error('add to cart error:', error);
        }
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

        if (!search) {
            fetchProducts("all");
            return;
        }

        fetch(`https://aqtas.garcom.kz/api/productsSearch/${search}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error('Search error:', error);
            });
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
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                style={
                                    selectedCategory === category.value
                                        ? styles.categoryActive
                                        : styles.category
                                }
                                onPress={() => selectCategory(category.value)}
                            >
                                <Text
                                    style={
                                        selectedCategory === category.value
                                            ? styles.categoryTextActive
                                            : styles.categoryText
                                    }
                                >
                                    {t(`${category.label}`)}
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
                            <>
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
                                                                        uri: `https://aqtas.garcom.kz/api/images/imageProducts/${product.imagePreview1}`,
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
                                                                                        uri: `https://aqtas.garcom.kz/api/images/imageProducts/${imagePreviewPath}`,
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
                            </>
                        ) : (
                            <Text style={styles.noDataText}>{t('no-products-message')}</Text>
                        )}
                    </>
                )}
            </View>
            {isSizeSelect && <SizeSelector onClose={toggleSetSize} id={productId} productData={selectedProduct} />}
            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    );
}

export default MainScreen;

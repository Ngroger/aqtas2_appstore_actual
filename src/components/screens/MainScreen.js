import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { useCategories } from '../../context/CategoriesProvider';
import { useUnauth } from '../../context/UnauthProvider';
import { getUserData } from '../../store/userDataManager';
import styles from '../../styles/MainScreenStyle';
import SizeSelector from '../ux/popup/SizeSelector';
import i18next from '../../i18next';

function MainScreen() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState({});

    const { selectedCategory, selectedSubcategory, selectCategoryContext, selectSubcategoryContext } = useCategories();

    const [isLoading, setIsLoading] = useState(false);
    const [search, onChangeSearch] = useState('');
    const [isSizeSelect, setIsSizeSelector] = useState(false);
    const [productId, setProductId] = useState();
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { t } = useTranslation();
    const { openModal } = useUnauth();

    const [categories, setCategories] = useState([]);
    const [lang, setLang] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async _ => {
        try {
            const language = i18next.language;
            if (language) {
                setLang(language);
                const response = await fetch('https://aqtas.garcom.kz/api/categories');

                const responseJson = await response.json();

                if (responseJson.success) {
                    setCategories(responseJson.categories);
                }
            }
        } catch (error) {
            console.log("Fetch Categories Error: ", error);
        }
    }

    useEffect(() => {
        loadUserData();
        // Здесь вы вызываете fetchProducts при изменении selectedCategory
        console.log("params:", selectedCategory ? 'categories' : 'all', selectedCategory, selectedSubcategory);
        fetchProducts(selectedCategory ? 'categories' : 'all', selectedCategory, selectedSubcategory);
    }, [selectedCategory, selectedSubcategory]);

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
        if (selectedCategory === category) {
            selectCategoryContext(null);
            selectSubcategoryContext(null);
            await fetchProducts('all');
        } else {
            selectCategoryContext(category);
            selectSubcategoryContext(null);
            await fetchProducts('categories', category, null);
        }
    };

    const fetchProducts = async (type, category, subcategory) => {
        try {
            setIsLoading(true);

            const url = type === 'categories'
                ? `https://aqtas.garcom.kz/api/products?category=${category}&subcategory=${subcategory}`
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
                console.log('Search error:', error);
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
                                style={ selectedCategory === category.name_ru ? 
                                    [styles.category, { opacity: 0.25 }] :
                                    styles.category
                                }
                                onPress={() => selectCategory(category.name_ru)}
                            >
                                <Image style={styles.categoryImage} source={{ uri: `https://aqtas.garcom.kz/api/categories/${category.photo_url}` }}/>
                                <Text
                                    style={styles.categoryText}
                                >
                                    {t(`${category.name_ru}`)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                {isLoading && (
                    <View style={styles.loadingIndicatorContainer}>
                        <ActivityIndicator size="large" color="#26CFFF" />
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
                                                                    style={{ width: 1000, height: 300 }}
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
                                                            <TouchableOpacity onPress={() => toggleSetSize(product.id, product)} style={styles.addCart}>
                                                                <Text style={styles.addCartText}>{t('add-cart-button')}</Text>
                                                            </TouchableOpacity>
                                                        </TouchableOpacity>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                />
                            </>
                        ) : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.noDataText}>{t('no-products-message')}</Text>
                            </View>
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

import { Text, TouchableOpacity, View, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../../styles/SelectedCategoryStyles'
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper'
import { getUserData } from '../../../store/userDataManager';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function SelectedCategory({ onClose, category, title }) {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    };

    useEffect(() => {
        loadUserData();
        fetch(`https://aqtas.ru/products/${category}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                
            })
            .catch((error) => {
            });
        
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, []);

    const groupedProducts = {};
    if (Array.isArray(products)) {
        products.forEach((product) => {
            if (!groupedProducts[product.productFlag]) {
                groupedProducts[product.productFlag] = [];
            }
            groupedProducts[product.productFlag].push(product);
        });
    }

    const goToCard = (product) => {
        navigation.navigate('Product', { product });
    };

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

    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={handleClose} style={styles.titleContainer}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                <Text style={styles.mainTitle}>{title}</Text>
            </TouchableOpacity>
            <View style={styles.navbar}>
                <View style={styles.search}>
                    <EvilIcons name="search" size={24} color="#BDBDBD" />
                    <TextInput style={styles.serchInput} placeholder={t('search-categories-placeholder')}/>
                </View>
            </View>
                { isLoading && (
                    <View style={styles.loadingIndicatorContainer}>
                        <ActivityIndicator size="big" color="#95E5FF" />
                        <Text style={styles.textLoad}>{t('products-load-message')}</Text>
                    </View>
                )  }
                { !isLoading && (
                    <>
                        { products.length > 0 ? (
                            <FlatList
                                style={{ padding: 20 }}
                                data={Object.keys(groupedProducts)}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <View key={item}>
                                        <View style={styles.containerCart}>
                                            {groupedProducts[item].map((product) => (
                                                <View style={styles.cart} key={product.id}>
                                                    <View style={styles.previewContainer}>
                                                        {product.imagePreview1 && !product.imagePreview2 ? (
                                                            <Image
                                                                style={styles.cartPreview}
                                                                source={{
                                                                    uri: `https://aqtas.ru/images/imageProducts/${product.imagePreview1}`,
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
                                                                                    uri: `https://aqtas.ru/images/imageProducts/${imagePreviewPath}`,
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
                                                        { product.sale && (
                                                            <View style={product.imagePreview1 && !product.imagePreview2 ? {...styles.sale, bottom: 12} : styles.sale}>
                                                                <Text style={styles.saleText}>{product.sale}%</Text>
                                                            </View>
                                                        ) }
                                                    </View>
                                                    <TouchableOpacity onPress={_ => (goToCard(product))}>
                                                        <View style={product.imagePreview1 && !product.imagePreview2 ? {...styles.costContainer, marginTop: 10} : styles.costContainer}>
                                                            <Text style={styles.cost}>{product.cost}тнг</Text>
                                                            { product.oldCost && <Text style={styles.oldCost}>{product.oldCost}тнг</Text>}
                                                        </View>
                                                        <Text style={styles.name}>{product.name}</Text>
                                                        <Text style={styles.description}>
                                                            {product.description.length > 20
                                                                ? product.description.slice(0, 20) + '...'
                                                                : product.description
                                                            }
                                                        </Text>
                                                        <TouchableOpacity onPress={() => addToCart(product)} style={styles.addCart}>
                                                            <Text style={styles.addCartText}>{t('add-cart-button')}</Text>
                                                        </TouchableOpacity>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Text style={{ fontFamily: 'Cambria', fontSize: 24, color: '#BDBDBD' }}>{t('no-products-in-category-message')}</Text>
                            </View>
                        ) }
                    </>
                ) }
        </View>
    )
};

export default SelectedCategory;
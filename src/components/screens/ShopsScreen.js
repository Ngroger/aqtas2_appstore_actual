import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Linking, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import styles from '../../styles/ShopsScreenStyle';

function ShopsScreen() {
    const navigation = useNavigation();
    const [shops, setShops] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [search, onChangeSearch] = useState('');
    const [noResults, setNoResults] = useState(false);
    const { t } = useTranslation();

    const categories = [
        { id: 1, value: 'Магазины', name: t('shops-filter') },
        { id: 2, value: 'Официальные магазины брендов', name: t('official-brand-shops-filter') },
        { id: 3, value: 'Интернет-магазины', name: t('online-shops-filter') },
        { id: 4, value: 'Магазины производителей', name: t('manufacturer-shops-filter') },
        { id: 5, value: 'Магазины из Китая', name: t('chinese-shops-filter') },
        { id: 6, value: 'Специализированные магазины', name: t('specialized-shops-filter') },
        { id: 7, value: 'Магазины электроники', name: t('electronics-shops-filter') },
        { id: 8, value: 'Магазины одежды и обуви', name: t('clothing-shoes-shops-filter') },
        { id: 9, value: 'Магазины косметики и парфюмерии', name: t('cosmetics-shops-filter') },
        { id: 10, value: 'Магазины товаров для дома', name: t('home-goods-shops-filter') },
        { id: 11, value: 'Магазины спортивных товаров', name: t('sports-shops-filter') },
        { id: 12, value: 'Магазины игрушек', name: t('toy-shops-filter') },
        { id: 13, value: 'Антикварные магазины', name: t('antique-shops-filter') },
        { id: 14, value: 'Секонд-хенды', name: t('secondhand-shops-filter') },
        { id: 15, value: 'Эко-магазины', name: t('eco-shops-filter') },
        { id: 16, value: 'Магазины для животных', name: t('pet-shops-filter') },
        { id: 17, value: 'Книжные магазины', name: t('book-shops-filter') },
        { id: 18, value: 'Магазины подарков и сувениров', name: t('gift-shops-filter') },
        { id: 19, value: 'Оптовые магазины', name: t('wholesale-shops-filter') },
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

            fetch(`https://aqtas.garcom.kz/api/shops/${categories[categoryId - 1].value}`)
                .then((response) => response.json())
                .then((data) => {
                    setShops(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }
    };

    const loadUserData = () => {
        fetch('https://aqtas.garcom.kz/api/shops')
            .then((response) => response.json())
            .then((data) => {
                setShops(data);
            })
            .catch((error) => {
            });
    }

    const handleOpen2GIS = (link) => {
        const url = `dgis://${link}`;
        Linking.openURL(url);
    };


    useEffect(() => {
        loadUserData()
    }, []);

    const handleSearch = (search) => {
        setIsLoading(true);
        onChangeSearch(search);
        setTimeout(() => {
            if (!search) {
                fetch(`https://aqtas.garcom.kz/api/shops`)
                    .then((response) => response.json())
                    .then((data) => {
                        setShops(data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                    });
            }
            else {
                fetch(`https://aqtas.garcom.kz/api/shopsSearch/${search}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.length === 0) {
                            setNoResults(true); // Установить состояние noResults в true
                            setIsLoading(false);
                        } else {
                            setNoResults(false);
                            setShops(data);
                            setIsLoading(false);
                        }
                    })
                    .catch((error) => {
                        setIsLoading(false);
                    });
            }
        }, 1000); // Запуск поиска после 1 секунды без изменений в тексте
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <Image style={styles.logo} source={require('../../img/miniLogo.png')} />
                <View style={styles.search}>
                    <AntDesign name="search1" size={scale(14)} color="#BDBDBD" />
                    <TextInput value={search} onChangeText={(text) => handleSearch(text)} style={styles.serchInput} placeholder={t('search-shops-placeholder')} />
                </View>
            </View>
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
            {isLoading && (
                <View style={styles.loadingIndicatorContainer}>
                    <Text style={styles.textLoad}>{t('products-load-message')}</Text>
                </View>
            )}

            {!isLoading && (
                <>
                    {noResults ? (
                        <Text>{t('no-shops-found')}</Text>
                    ) : (
                        <>
                            {shops.length > 0 ? (
                                <FlatList
                                    data={shops}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{ paddingHorizontal: 20 }}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.shopCart}>
                                                <Image style={styles.image} source={{ uri: `https://aqtas.garcom.kz/api/images/imageShop/${item.imageShop}` }} />
                                                <View style={{ padding: 5, flex: 1 }}>
                                                    <View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('name-shop-info')}</Text>
                                                            <Text style={styles.secondInfo}>{truncateText(item.nameShop, 10)}</Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('address-shop-info')}</Text>
                                                            <Text style={styles.secondInfo}>{truncateText(item.adress, 10)}</Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('phone-number-shop-info')}</Text>
                                                            <Text style={styles.secondInfo}>{truncateText(item.phone, 16)}</Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('customer-shop-info')}</Text>
                                                            <Text style={styles.secondInfo}>{truncateText(item.costumer, 10)}</Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity onPress={() => (handleOpen2GIS(item.link))} style={styles.mapsButton}>
                                                        <Text style={styles.mapsText}>{t('two-gis-button')}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            ) : (
                                <Text style={styles.noDataText}>{t('no-shops-category-found')}</Text>
                            )}
                        </>
                    )}
                </>
            )}
        </SafeAreaView>
    )
};

export default ShopsScreen;
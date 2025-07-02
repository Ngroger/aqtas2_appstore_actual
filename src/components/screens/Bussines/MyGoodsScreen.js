import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/MyGoodsStyles';
import CreateProduct from '../../ux/popup/CreateProduct';
import UpToTop from '../../ux/popup/EditProduct/UpToTop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function MyGoodsScreen() {
    const navigation = useNavigation();
    const [isUpToTop, setUpToTop] = useState(false);
    const [isCreateProduct, setCreateProduct] = useState(false);
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Активен');
    const [selectedItems, setSelectedItems] = useState({});
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [activeCategory])
    )

    const selectItem = (index) => {
        setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [index]: !prevSelectedItems[index],
        }));
    };

    const handleCategoryClick = async (category) => {
        setActiveCategory(category);
    };

    const categories = [
        // { id: 1, name: 'Top', value: 'top' },
        { id: 2, name: t("my-products.canceled"), value: 'Отмена' },
        { id: 3, name: t("my-products.in-sale"), value: 'Активен' },
        { id: 4, name: t("my-products.blocked"), value: 'Заблокировано' },
        { id: 5, name: t("my-products.moderation"), value: 'Модерация' },
    ];

    const loadUserData = async () => {
        const userData = await getUserData();
        setIsLoading(true);
        if (userData) {
            setUserData(userData);
            setProducts([]);
            try {
                const response = await fetch(`https://aqtas.garcom.kz/api/myProducts/${userData.userId}/${activeCategory}`);
                const responseJson = await response.json();

                if (responseJson.success) {
                    setProducts(responseJson.products);
                    setIsLoading(false);
                }
            } catch (error) {

            } finally {
                setIsLoading(false);
            }
        }
    };

    const toggleUpToTop = () => {
        setUpToTop(!isUpToTop)
    }

    const toggleCreateProduct = () => {
        setCreateProduct(!isCreateProduct)
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    const goToEdit = (productData) => {
        navigation.navigate('EditProduct', { productData });
    };

    const removeSelectedFromCart = async () => {
        const selectedProductIds = Object.entries(selectedItems)
            .filter(([_, isSelected]) => isSelected)
            .map(([productId]) => productId);

        if (selectedProductIds.length === 0) {
            return;
        }

        try {
            for (const productId of selectedProductIds) {
                const response = await fetch(`https://aqtas.garcom.kz/api/removeMyProduct/${userData.userId}/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const updatedProducts = products.filter(item => item.id !== productId);
                    setProducts(updatedProducts);
                    setSelectedItems({}); // Очищаем выбранные товары
                } else {
                }
            }
        } catch (error) {

        }
    };

    const actionSelectedFromCart = async (action) => {
        const selectedProductIds = Object.entries(selectedItems)
            .filter(([_, isSelected]) => isSelected)
            .map(([productId]) => productId);

        if (selectedProductIds.length === 0) {
            return;
        }

        try {
            for (const productId of selectedProductIds) {
                const response = await fetch(`https://aqtas.garcom.kz/api/actionMyProduct/${userData.userId}/${productId}/${action}`, {
                    method: 'PUT',
                });

                const responseJson = await response.json();

                if (responseJson.success) {
                    const updatedProducts = products.filter(item => item.id !== productId);
                    setProducts(updatedProducts);
                    setSelectedItems({});
                }
            }
        } catch (error) {

        }
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>{t("my-products.title")}</Text>
                </TouchableOpacity>
                <View style={styles.categoriesContainer}>
                    <ScrollView style={styles.categories} horizontal={true}>
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                style={
                                    activeCategory === category.value
                                        ? styles.categoryActive
                                        : styles.category
                                }
                                onPress={() => handleCategoryClick(category.value)}
                                disabled={activeCategory === category.value}
                            >
                                <Text
                                    style={
                                        activeCategory === category.value
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
                        <Text style={styles.textLoad}>{t("my-products.load-text")}</Text>
                    </View>
                )}
                {!isLoading && (
                    <>
                        {products.length > 0 ? (
                            <>
                                <FlatList
                                    data={products}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.card}>
                                            <Image style={styles.productPreview} source={{ uri: `https://aqtas.garcom.kz/api/images/imageProducts/${item.imagePreview1}` }} />
                                            <View style={{ flex: 1, marginLeft: 10 }}>
                                                <View style={styles.costContainer}>
                                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                                        <Text style={styles.cost}>{item.cost}тнг</Text>
                                                        {item.oldCost && <Text style={styles.oldCost}>{item.oldCost}тнг</Text>}
                                                    </View>
                                                    {activeCategory !== 'top' && (
                                                        <TouchableOpacity onPress={() => selectItem(item.id)} style={selectedItems[item.id] ? styles.selectedCheckbox : styles.checkbox}>
                                                            {selectedItems[item.id] ? (
                                                                <View style={styles.dot} />
                                                            ) : null}
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                                <View style={{ padding: 0, flex: 1 }}>
                                                    <View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>
                                                                {t("name-shop-info")}
                                                            </Text>
                                                            <Text style={styles.secondInfo}>{item.name}</Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>
                                                                {t("description-product-cart-info")}
                                                            </Text>
                                                            <Text style={styles.secondInfo}>
                                                                {item.description.length > 10
                                                                    ? item.description.substring(0, 10) + "..."
                                                                    : item.description
                                                                }
                                                            </Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t("brend-cart-info")}</Text>
                                                            <Text style={styles.secondInfo}>
                                                                {item.brend.length > 10
                                                                    ? item.brend.substring(0, 10) + "..."
                                                                    : item.brend
                                                                }
                                                            </Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t("category-card-info")}</Text>
                                                            <Text style={styles.secondInfo}>{item.category}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={[styles.buttonContainer, { flex: 1 }]}>
                                                    {/* <TouchableOpacity onPress={toggleUpToTop} style={styles.topButton}>
                                                        <Text style={styles.topButtonText}>Продвижение</Text>
                                                    </TouchableOpacity> */}
                                                    <TouchableOpacity onPress={() => goToEdit(item)} style={styles.editButton}>
                                                        <Text style={styles.editButtonText}>{t("my-products.edit-btn")}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                                <View style={{ marginBottom: 100 }} />
                            </>
                        ) : (
                            <Text style={styles.noDataText}>{t("my-products.no-data-text")}</Text>
                        )}
                    </>
                )}
                <View style={[styles.buttonsContainer, { marginBottom: insets.bottom }]}>
                    {Object.keys(selectedItems).some((itemId) => selectedItems[itemId]) ? (
                        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => actionSelectedFromCart(activeCategory === 'Активен' ? 'Отмена' : 'Активен')}
                                style={styles.buttonActionProduct}
                            >
                                <Text style={styles.buttonActionProductText}>
                                    {activeCategory === 'Активен' ?
                                        t("my-products.cancel-btn") :
                                        t("my-products.public-btn")
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removeSelectedFromCart()} style={styles.buttonDeleteProduct}>
                                <Text style={styles.buttonDeleteProductText}>{t("my-products.delete-btn")}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={toggleCreateProduct} style={styles.buttonAddProduct}>
                            <Text style={styles.buttonAddProductText}>{t("my-products.add-product-btn")}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <StatusBar backgroundColor="transparent" translucent={true} />
            {isUpToTop && <UpToTop onClose={toggleUpToTop} />}
            <CreateProduct onClose={toggleCreateProduct} modalVisible={isCreateProduct} />
        </View>
    )
};

export default MyGoodsScreen;
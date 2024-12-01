import { Text, TouchableOpacity, View, StatusBar, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../../styles/MyGoodsStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import UpToTop from '../../ux/popup/EditProduct/UpToTop';
import CreateProduct from '../../ux/popup/CreateProduct';
import { getUserData } from '../../../store/userDataManager';

function MyGoodsScreen() {
    const navigation = useNavigation();
    const [isSelected, setSelected] = useState();
    const [isUpToTop, setUpToTop] = useState(false);
    const [isCreateProduct, setCreateProduct] = useState(false);
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState();
    const [selectedItems, setSelectedItems] = useState({});
    const [isNoCardMessage, setIsNoCardMessage] = useState(false);
    const [bankCardData, setBankCardData] = useState('');

    const selectItem = (index) => {
        setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [index]: !prevSelectedItems[index],
        }));
    };

    const toggleSelecter = () => {
        setSelected(!isSelected)
    }

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

            fetch(`https://aqtas.garcom.kz/myProducts/${userData.userId}/${categories[categoryId - 1].value}`)
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

    const categories = [
        { id: 1, name: 'Top', value: 'top' },
        { id: 2, name: 'Отмененные', value: 'Отмененные' },
        { id: 3, name: 'В продаже', value: 'Продажа' },
    ];

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
            // Выполните запрос к серверу для получения данных о финансах
            try {
                const response = await fetch(`https://aqtas.garcom.kz/myProducts/${userData.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                }
            } catch (error) {
            }
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const toggleUpToTop = () => {
        setUpToTop(!isUpToTop)
    }

    const toggleCreateProduct = () => {
        setCreateProduct(!isCreateProduct)
    }

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
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
                const response = await fetch(`https://aqtas.garcom.kz/removeMyProduct/${userData.userId}/${productId}`, {
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

    const actionSelectedFromCart = async ({ action }) => {
        const selectedProductIds = Object.entries(selectedItems)
            .filter(([_, isSelected]) => isSelected)
            .map(([productId]) => productId);

        if (selectedProductIds.length === 0) {
            return;
        }

        try {
            for (const productId of selectedProductIds) {
                const response = await fetch(`https://aqtas.garcom.kz/actionMyProduct/${userData.userId}/${productId}/${action}`, {
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

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>Мои товары</Text>
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
                {isLoading && (
                    <View style={styles.loadingIndicatorContainer}>
                        <ActivityIndicator size="big" color="#95E5FF" />
                        <Text style={styles.textLoad}>Подождите, это может занять время...</Text>
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
                                            <Image style={styles.productPreview} source={{ uri: `https://aqtas.garcom.kz/images/imageProducts/${item.imagePreview1}` }} />
                                            <View style={{ flex: 1, marginLeft: 10 }}>
                                                <View style={styles.costContainer}>
                                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                                        <Text style={styles.cost}>{item.cost}тнг</Text>
                                                        {item.oldCost && <Text style={styles.oldCost}>{item.oldCost}тнг</Text>}
                                                    </View>
                                                    <TouchableOpacity onPress={() => selectItem(item.id)} style={selectedItems[item.id] ? styles.selectedCheckbox : styles.checkbox}>
                                                        {selectedItems[item.id] ? (
                                                            <View style={styles.dot} />
                                                        ) : null}
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ padding: 0, flex: 1 }}>
                                                    <View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>Название</Text>
                                                            <Text style={styles.secondInfo}>{item.name}</Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>Описание</Text>
                                                            <Text style={styles.secondInfo}>
                                                                {item.description.length > 10
                                                                    ? item.description.substring(0, 10) + "..."
                                                                    : item.description
                                                                }
                                                            </Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>Бренд</Text>
                                                            <Text style={styles.secondInfo}>
                                                                {item.brend.length > 10
                                                                    ? item.brend.substring(0, 10) + "..."
                                                                    : item.brend
                                                                }
                                                            </Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>Категория</Text>
                                                            <Text style={styles.secondInfo}>{item.category}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={[styles.buttonContainer, { flex: 1 }]}>
                                                    {/* <TouchableOpacity onPress={toggleUpToTop} style={styles.topButton}>
                                                        <Text style={styles.topButtonText}>Продвижение</Text>
                                                    </TouchableOpacity> */}
                                                    <TouchableOpacity onPress={() => goToEdit(item)} style={styles.editButton}>
                                                        <Text style={styles.editButtonText}>Редактировать</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                                <View style={{ marginBottom: 100 }} />
                            </>
                        ) : (
                            <Text style={styles.noDataText}>У вас нет товаров, соответстующих этой категории</Text>
                        )}
                    </>
                )}
                <View style={styles.buttonsContainer}>
                    {Object.keys(selectedItems).some((itemId) => selectedItems[itemId]) ? (
                        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => actionSelectedFromCart('Отмена')} style={styles.buttonActionProduct}>
                                <Text style={styles.buttonActionProductText}>Отменить</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={removeSelectedFromCart} style={styles.buttonDeleteProduct}>
                                <Text style={styles.buttonDeleteProductText}>Удалить</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={toggleCreateProduct} style={styles.buttonAddProduct}>
                            <Text style={styles.buttonAddProductText}>Добавить товар</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <StatusBar backgroundColor="transparent" translucent={true} />
            </View>
            {isUpToTop && <UpToTop onClose={toggleUpToTop} />}
            {isCreateProduct && <CreateProduct onClose={toggleCreateProduct} />}
        </View>
    )
};

export default MyGoodsScreen;
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import styles from '../../styles/CartScreenStyle';
import { Feather } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { getUserData } from '../../store/userDataManager';
import NoCardMessage from '../ux/popup/messages/NoCardMessage';
import SuccessOrder from '../ux/popup/messages/SuccessOrder';
import { useTranslation } from 'react-i18next';
import NoAddressMessage from '../ux/popup/messages/NoAddressMessage';
import { useEffect } from 'react';
import axios from 'axios';
import { scale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';
import { useUnauth } from '../../context/UnauthProvider';

function CartScreen() {
    const [userData, setUserData] = useState({});
    const [cart, setCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedItems, setSelectedItems] = useState({});
    const [isSuccessOrder, setSuccessOrder] = useState(false);
    const [isNoAddress, setIsNoAddress] = useState(false);
    const { t } = useTranslation();
    const { openModal } = useUnauth();

    const selectItem = (index) => {
        setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [index]: !prevSelectedItems[index],
        }));
    };

    const toggleSetSuccessOrder = () => {
        setSuccessOrder(!isSuccessOrder);
    };

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );


    const buyProduct = async (id, size, CustomerId, productId) => {
        try {
            console.log("productId: ", productId);
            const requestData = {
                name: userData.fullname,
                address: userData.address,
                photoUser: await getUserPhoto(),
                count: 1,
                userID: userData.userId,
                size: size,
                sellerId: CustomerId,
                id: id,
                productId: productId
            };

            console.log("requestData: ", requestData);

            const response = await fetch('https://aqtas.garcom.kz/api/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                toggleSetSuccessOrder();
                deleteProductByCard(productId);
            }
        } catch (error) {

        }
    };

    const deleteProductByCard = (id) => {
        try {
            setCart((prevCart) => prevCart.filter((product) => product.id !== id));
        } catch (error) {
            console.log("delete product by cart: ", error);
        }
    };

    const getUserPhoto = async () => {
        try {
            const response = await fetch(`https://aqtas.garcom.kz/api/getUserImage/${userData.userId}`);
            if (response.ok) {
                const data = await response.json();
                return data.photo
            } else {
            }
        } catch (error) {
        }
    };

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
            if (userData.address === 'Не указано') {
                setIsNoAddress(true);
            } else {
                setIsNoAddress(false);
            }
            try {
                const response = await fetch(`https://aqtas.garcom.kz/api/cart/${userData.userId}`);
                const responseJson = await response.json();
                if (responseJson.success) {

                    const total = responseJson.cart.reduce((acc, item) => acc + item.newCost, 0);

                    console.log("total cost: ", total);

                    setTotalCost(total);
                    setCart(responseJson.cart);
                } else {

                }
            } catch (error) {
            }
        } else {
            openModal(t("unauth-modal.title"), t("unauth-modal.description-cart"))
        }
    };

    const increaseCount = async (ProductId) => {
        try {
            await fetch(`https://aqtas.garcom.kz/api/increaseCount/${userData.userId}/${ProductId}`, {
                method: 'PUT'
            });

            loadUserData();
        } catch (error) {
            console.log('increaseCount error: ', error);
        }
    }

    const decreaseCount = async (ProductId) => {
        try {
            await fetch(`https://aqtas.garcom.kz/api/decreaseCount/${userData.userId}/${ProductId}`, {
                method: 'PUT'
            });

            loadUserData();
        } catch (error) {
            console.log('increaseCount error: ', error);
        }
    }

    const removeSelectedFromCart = async () => {
        const selectedProductIds = Object.entries(selectedItems)
            .filter(([_, isSelected]) => isSelected)
            .map(([productId]) => productId);

        if (selectedProductIds.length === 0) {
            return;
        }

        try {
            for (const productId of selectedProductIds) {
                const response = await fetch(`https://aqtas.garcom.kz/api/removeFromCart/${userData.userId}/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const updatedCart = cart.filter(item => item.id !== productId);
                    setCart(updatedCart);
                    setSelectedItems({}); // Очищаем выбранные товары
                } else {
                }
            }
        } catch (error) {
        }
    };

    const clearCart = () => {
        if (cart.length === 1) {
            setCart([]);
        }
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>{t('cart-title')}</Text>
                        <Text style={styles.totalCost}>{t('total-cost-cart')}{totalCost}тнг</Text>
                    </View>
                    {Object.values(selectedItems).includes(true) ? (
                        <TouchableOpacity onPress={removeSelectedFromCart}>
                            <Feather name="trash-2" size={scale(20)} color="#FF0000" />
                        </TouchableOpacity>
                    ) : null}
                </View>
                {cart.length > 0 ? (
                    <FlatList
                        data={cart}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image style={styles.productPreview} source={{ uri: `https://aqtas.garcom.kz/api/images/imageProducts/${item.imagePreview}` }} />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={styles.costContainer}>
                                            <Text style={styles.cost}>{item.newCost}тнг</Text>
                                            {item.oldCost && <Text style={styles.oldCost}>{item.oldCost}тнг</Text>}
                                        </View>
                                        <TouchableOpacity onPress={() => selectItem(item.id)} style={selectedItems[item.id] ? styles.selectedCheckbox : styles.checkbox}>
                                            {selectedItems[item.id] ? (
                                                <View style={styles.dot} />
                                            ) : null}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <View>
                                            <Text style={styles.firstInfo}>{t('name-product-cart-info')}</Text>
                                            <Text style={styles.firstInfo}>{t('description-product-cart-info')}</Text>
                                            <Text style={styles.firstInfo}>{t('brend-cart-info')}</Text>
                                            <Text style={styles.firstInfo}>{t('customer-product-cart-info')}</Text>
                                            {item.size && <Text style={styles.firstInfo}>{t('size-cart-info')}</Text>}
                                        </View>
                                        <View>
                                            <Text style={styles.secondInfo}>
                                                {item.name.length > 16
                                                    ? item.name.substring(0, 13) + '...'
                                                    : item.name
                                                }
                                            </Text>
                                            <Text style={styles.secondInfo}>
                                                {item.description.length > 16
                                                    ? item.description.substring(0, 13) + '...'
                                                    : item.description
                                                }
                                            </Text>
                                            <Text style={styles.secondInfo}>
                                                {item.brend.length > 16
                                                    ? item.brend.substring(0, 13) + '...'
                                                    : item.brend
                                                }
                                            </Text>
                                            <Text style={styles.secondInfo}>
                                                {item.costumer.length > 16
                                                    ? item.costumer.substring(0, 13) + '...'
                                                    : item.costumer
                                                }
                                            </Text>
                                            {item.size && <Text style={styles.secondInfo}>{item.size}</Text>}
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                                            <View style={styles.counterContainer}>
                                                <TouchableOpacity onPress={() => decreaseCount(item.id)} style={styles.counterButton}>
                                                    <Text style={styles.counterButtonText}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={styles.count}>{item.count}</Text>
                                                <TouchableOpacity onPress={() => increaseCount(item.id)} style={styles.counterButton}>
                                                    <Text style={styles.counterButtonText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={() => buyProduct(item.id, item.size, item.customerId, item.productId)} style={styles.buttonBuy}>
                                                <Text style={styles.textBuy}>{t('buy-button')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        )}
                    />
                ) : (
                    <Text style={styles.noDataText}>{t('empty-cart-message')}</Text>
                )}
                <StatusBar backgroundColor="transparent" translucent={true} />
            </View>
            {isSuccessOrder && <SuccessOrder clearCart={clearCart} updatedCart={() => loadUserData()} onClose={() => setSuccessOrder(false)} />}
            {isNoAddress && <NoAddressMessage />}
        </View>
    )
};

export default CartScreen;
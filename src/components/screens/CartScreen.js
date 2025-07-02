import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useUnauth } from '../../context/UnauthProvider';
import { getUserData } from '../../store/userDataManager';
import styles from '../../styles/CartScreenStyle';
import NoAddressMessage from '../ux/popup/messages/NoAddressMessage';
import SuccessOrder from '../ux/popup/messages/SuccessOrder';
import OrderModal from '../ux/popup/OrderModal';

function CartScreen() {
    const [userData, setUserData] = useState({});
    const [cart, setCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedItems, setSelectedItems] = useState({});
    const [isSuccessOrder, setSuccessOrder] = useState(false);
    const [isNoAddress, setIsNoAddress] = useState(false);
    const { t } = useTranslation();
    const { openModal } = useUnauth();
    const [totalPrice, setTotalPrice] = useState(0);
    const [isOpenOrder, setIsOpenOrder] = useState(false);

    const selectItem = (index) => {
        setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [index]: !prevSelectedItems[index],
        }));
    };

    const toggleSetSuccessOrder = () => {
        setSuccessOrder(!isSuccessOrder);
    };

    useEffect(() => {
        countTotalPrice();
    }, [selectedItems, cart]);


    const countTotalPrice = () => {
        const selectedIds = Object.entries(selectedItems)
            .filter(([_, isSelected]) => isSelected)
            .map(([id]) => parseInt(id));

        const total = cart.reduce((acc, item) => {
            if (selectedIds.includes(item.id)) {
                return acc + (item.newCost * item.count);
            }
            return acc;
        }, 0);

        setTotalPrice(total);
    };

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const buyProducts = async (id, size, CustomerId, productId) => {
        try {
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
            const response = await fetch(`https://aqtas.garcom.kz/api/removeFromCart/${userData.userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productIds: selectedProductIds
                })
            });

            const responseJson = await response.json();
            console.log("responseJson: ", responseJson);

            if (responseJson.success) {
                console.log("selectedProductIds: ", selectedProductIds);
                const updatedCart = cart.filter(item => !selectedProductIds.includes(item.id.toString()));
                console.log("updatedCart: ", updatedCart);
                setCart(updatedCart);
                setSelectedItems({});
            }
        } catch (error) {
            console.log("Remove Selected Cart Error: ", error);
        }
    };

    const clearCart = () => {
        if (cart.length === 1) {
            setCart([]);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 20 }}>
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
                {
                    cart.length > 0 ? (
                        <FlatList
                            data={cart}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: 120 }}
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
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            )}
                        />
                    ) : (
                        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.noDataText}>{t('empty-cart-message')}</Text>
                        </View>
                    )
                }
            </View >
            {Object.values(selectedItems).includes(true) && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setIsOpenOrder(true)} style={styles.orderBtn}>
                        <Text style={styles.orderBtnTxt}>К оформлению</Text>
                        <Text style={styles.orderBtnTxt}>{totalPrice}тг</Text>
                    </TouchableOpacity>
                </View>
            )}
            <StatusBar backgroundColor="transparent" translucent={true} />
            {isSuccessOrder && <SuccessOrder clearCart={clearCart} updatedCart={() => loadUserData()} onClose={() => setSuccessOrder(false)} />}
            {isNoAddress && <NoAddressMessage />}
            <OrderModal 
                totalPrice={totalPrice} 
                modalVisible={isOpenOrder} 
                onClose={() => setIsOpenOrder(false)} 
                orders={selectedItems}
                onBuy={buyProducts}
                cart={cart}
                onClear={() => setSelectedItems({})}
            />
        </SafeAreaView> 
    )
};

export default CartScreen;
import { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import styles from '../../styles/CartScreenStyle';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { getUserData } from '../../store/userDataManager';
import NoCardMessage from '../ux/popup/messages/NoCardMessage';
import PaymentMethod from '../ux/popup/PaymentMethod';
import SuccessOrder from '../ux/popup/messages/SuccessOrder';
import { useTranslation } from 'react-i18next';
import NoAddressMessage from '../ux/popup/messages/NoAddressMessage';
import { useEffect } from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';
import base64 from 'base-64';
import { scale } from 'react-native-size-matters';

function CartScreen() {
    const [userData, setUserData] = useState({});
    const [cart, setCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedItems, setSelectedItems] = useState({}); // Теперь это объект для хранения выбранных товаров
    const [isCheckPayments, setCheckPayments] = useState(false);
    const [payments, setPayments] = useState([]);
    const [isPaymentsMethod, setPaymentsMethod] = useState(false);
    const [isSuccessOrder, setSuccessOrder] = useState(false);
    const [isNoAddress, setIsNoAddress] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [customerId, setCustomerId] = useState();
    const {t} = useTranslation();
    const [productName, setProductName] = useState();
    const [approvalUrl, setApprovalUrl] = useState(null); 
    const [accessToken, setAccessToken] = useState('');
    const [paymentId, setPaymentId] = useState(null);

    const selectItem = (index) => {
        setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [index]: !prevSelectedItems[index],
        }));
    };

    const toggleSetPaymentsMethod = () => {
        setPaymentsMethod(!isPaymentsMethod);
    }

    const toggleSetSuccessOrder = () => {
        setSuccessOrder(!isSuccessOrder);
    }

    useEffect(() => {
        loadUserData();
    }, []);

    const buyProduct = async (subcategory, size, CustomerId, productName) => {
        if (userData.address === 'Не указано') {
            setIsNoAddress(true);
        } else {
            const requestData = {
                name: userData.fullname,
                nameProduct: productName,
                address: userData.address,
                photoUser: await getUserPhoto(),
                count: 1,
                userID: customerId,
                size: size,
            };
    
            try {
                const response = await axios.post('https://aqtas.ru/createOrder', requestData);
    
                const tokenResponse = await axios.post(
                    'https://api-m.paypal.com/v1/oauth2/token',
                    'grant_type=client_credentials',
                    {
                        headers: {
                            'Authorization': `Basic ${base64.encode('AfsMo-KafYx1RQxhwvbbDtUg0HttAlAtbkcAqQzs29P6mOWHtciMd-TRGzZ3B_LwKy1pQiQGKTMWt6Y3:EAlDvTZh_MQ_J-RwfFuRy3S5uFEjYTNkkrBshzeVJWz4IGbqHZNfu7b7tpMJx9O4xH2y6WWCZmnxfiZb')}`
                        },
                    }
                );
                setAccessToken(tokenResponse.data.access_token);

                const dataDetail = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal",
                    },
                    "transactions": [{
                        "amount": {
                            "total": '0.01',
                            "currency": "USD",
                            "details": {
                                "subtotal": "0.01",
                                "tax": "0",
                                "shipping": "0",
                                "handling_fee": "0",
                                "shipping_discount": "0",
                                "insurance": "0"
                            }
                        }
                    }],
                    "redirect_url": {
                        "return_url": "https://example.com",
                        "cancel_url": "https://example.com"
                    },
                }
    
                const paymentResponse = await axios.post(
                    'https://api-m.paypal.com/v1/payments/payment',
                    {
                        "intent": "sale",
                        "payer": {
                            "payment_method": "paypal"
                        },
                        "transactions": [
                            {
                                "amount": {
                                    "total": "30.11",
                                    "currency": "USD",
                                    "details": {
                                        "subtotal": "30.00",
                                        "tax": "0.07",
                                        "shipping": "0.03",
                                        "handling_fee": "1.00",
                                        "shipping_discount": "-1.00",
                                        "insurance": "0.01"
                                    }
                                },
                                "description": "The payment transaction description.",
                                "custom": "EBAY_EMS_90048630024435",
                                "invoice_number": "48787589673",
                                "payment_options": {
                                    "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                                },
                                "soft_descriptor": "ECHI5786786",
                                "item_list": {
                                    "items": [
                                        {
                                            "name": "hat",
                                            "description": "Brown hat.",
                                            "quantity": "5",
                                            "price": "3",
                                            "tax": "0.01",
                                            "sku": "1",
                                            "currency": "USD"
                                        },
                                        {
                                            "name": "handbag",
                                            "description": "Black handbag.",
                                            "quantity": "1",
                                            "price": "15",
                                            "tax": "0.02",
                                            "sku": "product34",
                                            "currency": "USD"
                                        }
                                    ],
                                    "shipping_address": {
                                        "recipient_name": "Brian Robinson",
                                        "line1": "4th Floor",
                                        "line2": "Unit #34",
                                        "city": "San Jose",
                                        "country_code": "US",
                                        "postal_code": "95131",
                                        "phone": "011862212345678",
                                        "state": "CA"
                                    }
                                }
                            }
                        ],
                        "note_to_payer": "Contact us for any questions on your order.",
                        "redirect_urls": {
                            "return_url": "https://example.com/return",
                            "cancel_url": "https://example.com/cancel"
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${tokenResponse.data.access_token}`
                        }
                    }
                );
                const { id, links } = paymentResponse.data;
                const approvalUrl = links.find(data => data.rel === "approval_url");
                setPaymentId(id);
                setApprovalUrl(approvalUrl.href);
            } catch (error) {
            }
        }
    };
    
    const getUserPhoto = async () => {
        try {
            const response = await fetch(`https://aqtas.ru/getUserImage/${userData.userId}`);
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
            try {
                const response = await fetch(`https://aqtas.ru/cart/${userData.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    const total = data.reduce((acc, item) => acc + item.newCost, 0);
                    setTotalCost(total);
                    setCart(data);
                } else {
                }
            } catch (error) {
            }
        }
    };

    const increaseCount = async (ProductId) => {
        try {
            const response = await fetch(`https://aqtas.ru/increaseCount/${userData.userId}/${ProductId}`);
            if (response.ok) {
                const data = await response.json();
            } else {
            }
        } catch (error) {
        }
    }
    
    const decreaseCount = async (ProductId) => {
        try {
            const response = await fetch(`https://aqtas.ru/decreaseCount/${userData.userId}/${ProductId}`);
            if (response.ok) {
                const data = await response.json();
            } else {
            }
        } catch (error) {
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
                const response = await fetch(`https://aqtas.ru/removeFromCart/${userData.userId}/${productId}`, {
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
                                <Feather name="trash-2" size={scale(20)} color="#FF0000"/>
                            </TouchableOpacity>
                        ) : null }
                    </View>
                    { cart.length > 0 ? (
                        <FlatList
                            data={cart}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image style={styles.productPreview} source={{ uri: `https://aqtas.ru/images/imageProducts/${item.imagePreview}` }}/>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={styles.costContainer}>
                                            <Text style={styles.cost}>{item.newCost}тнг</Text>
                                            { item.oldCost && <Text style={styles.oldCost}>{item.oldCost}тнг</Text>}
                                        </View>
                                        <TouchableOpacity onPress={() => selectItem(item.id)} style={selectedItems[item.id] ? styles.selectedCheckbox : styles.checkbox}>
                                            {selectedItems[item.id] ? (
                                                <View style={styles.dot}/>
                                            ) : null }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <View>
                                            <Text style={styles.firstInfo}>{t('name-product-cart-info')}</Text>
                                            <Text style={styles.firstInfo}>{t('description-product-cart-info')}</Text>
                                            <Text style={styles.firstInfo}>{t('brend-cart-info')}</Text>
                                            <Text style={styles.firstInfo}>{t('customer-product-cart-info')}</Text>
                                            { item.size && <Text style={styles.firstInfo}>{t('size-cart-info')}</Text>}
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
                                            { item.size && <Text style={styles.secondInfo}>{item.size}</Text>}
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={styles.counterContainer}>
                                                <TouchableOpacity onPress={() => decreaseCount(item.id)} style={styles.counterButton}>
                                                    <Text style={styles.counterButtonText}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={styles.count}>{item.count}</Text>
                                                <TouchableOpacity onPress={() => increaseCount(item.id)} style={styles.counterButton}>
                                                    <Text style={styles.counterButtonText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={() => buyProduct(item.subcategory, item.size, item.UserID, item.name)} style={styles.buttonBuy}>
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
                    ) }
                    <StatusBar backgroundColor="transparent" translucent={true} />
                </View>
            {/* ) } */}
            { approvalUrl ? (
                <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 10000, backgroundColor: 'red' }}>
                    <WebView
                        style={{ width: '100%', height: '100%', flex: 1 }}
                        source={{ uri: approvalUrl }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                    />
                </View>
            ) : null }
            { isSuccessOrder && <SuccessOrder onClose={toggleSetSuccessOrder}/> }
            { isNoAddress && <NoAddressMessage/> }
        </View>
    )
};

export default CartScreen;
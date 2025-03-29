import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/MyOrdersScreenStyle';
import WebViewModal from '../../ux/popup/WebViewModal';

function MyOrdersScreen() {
    const navigation = useNavigation();
    const [myOrders, setMyOrders] = useState([]);
    const { t } = useTranslation();
    const [isLoad, setIsLoad] = useState(true);
    const [orderInProccess, setOrderInProccess] = useState();
    const [isWebViewOpen, setIsWebViewOpen] = useState(false);
    const [url, setUrl] = useState();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();

        if (userData) {
            try {
                setIsLoad(true);
                const response = await fetch(`https://aqtas.garcom.kz/api/myOrders/${userData.userId}`);

                const responseJson = await response.json();

                if (responseJson.success) {
                    setMyOrders(responseJson.orders);
                    setIsLoad(false);
                }
            } catch (error) {
                console.log("load user data error: ", error);
            } finally {
                setIsLoad(false);
            }
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    const pay = async (order_id, product_id, seller_id, user_id) => {
        console.log({ order_id, product_id, seller_id, user_id })
        try {
            setOrderInProccess(order_id);
            const response = await fetch('https://aqtas.garcom.kz/api/paymentInit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_id: order_id,
                    product_id: product_id,
                    seller_id: seller_id,
                    user_id: user_id
                })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                setOrderInProccess();
                setUrl(responseJson.redirect_url);
                setIsWebViewOpen(true);
            } else {
                setOrderInProccess();
                setUrl();
                setIsWebViewOpen(false);
            }
        } catch (error) {
            console.log("pay error: ", error);
        }
    };

    const finishedOrder = async (order_id) => {
        try {
            const response = await fetch(`https://aqtas.garcom.kz/api/admin/delivery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'finished',
                    order_id: order_id
                })
            });

            const responseJson = await response.json();

            console.log("responseJson: ", responseJson);

            if (responseJson.success) {
                loadUserData();
            }
        } catch (error) {
            console.log('send delivery error: ', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <TouchableOpacity style={[styles.titleContainer, { marginTop: Platform.OS === 'android' && 36 }]} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>{t('my-orders-profile-button')}</Text>
                </TouchableOpacity>
                {isLoad && (
                    <View style={styles.loadContainer}>
                        <Text style={styles.loadText}>{t('reviews-screen.load')}</Text>
                    </View>
                )}
                {!isLoad && (
                    <>
                        {myOrders && myOrders.length > 0 ? (
                            <FlatList
                                data={myOrders}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text style={styles.data}>{formatDate(item.created_at)}</Text>
                                        <View style={styles.card}>
                                            <Image
                                                source={{
                                                    uri: `https://aqtas.garcom.kz/api/images/imageProducts/${item.imagePreview}`,
                                                }}
                                                style={styles.productPreview}
                                            />
                                            <View style={{ flex: 1 }}>
                                                <View style={styles.costContainer}>
                                                    <Text style={styles.cost}>{item.cost}тнг</Text>
                                                    {item.oldCost && <Text style={styles.oldCost}>{item.oldCost}тнг</Text>}
                                                </View>
                                                <View style={{ padding: 0, flex: 1 }}>
                                                    <View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('name-product-cart-info')}</Text>
                                                            <Text style={styles.secondInfo}>{item.name}</Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('description-product-cart-info')}</Text>
                                                            <Text style={styles.secondInfo}>
                                                                {item.description.length > 16
                                                                    ? item.description.substring(0, 13) + '...'
                                                                    : item.description
                                                                }
                                                            </Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('brend-cart-info')}</Text>
                                                            <Text style={styles.secondInfo}>{item.brend}</Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('customer-product-cart-info')}</Text>
                                                            <Text style={styles.secondInfo}>{item.costumer}</Text>
                                                        </View>
                                                        <View style={styles.infoContainer}>
                                                            <Text style={styles.firstInfo}>{t('customer-product-cart-status')}</Text>
                                                            <Text style={styles.secondInfo}>{t(`statuses-of-order.${item.status}`)}</Text>
                                                        </View>
                                                        {item.status === 'payment' && (
                                                            <TouchableOpacity
                                                                disabled={orderInProccess === item.id}
                                                                onPress={() => pay(item.id, item.productId, item.sellerId, item.userID)}
                                                                style={styles.payBtn}
                                                            >
                                                                <Text style={styles.payBtnText}>
                                                                    {orderInProccess === item.id ?
                                                                        t("customer-product-cart-in-proccess") :
                                                                        t("customer-product-cart-pay")
                                                                    }
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}

                                                        {item.status === 'delivery' && (
                                                            <TouchableOpacity onPress={() => finishedOrder(item.id)} style={styles.payBtn}>
                                                                <Text style={styles.payBtnText}>
                                                                    {t("customer-product-cart-complete")}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={styles.noDataText}>{t('products-story-empty')}</Text>
                        )}
                    </>
                )}
            </View>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <WebViewModal
                url={url}
                modalVisible={isWebViewOpen}
                onClose={() => setIsWebViewOpen(false)}
                type='product'
            />
        </SafeAreaView>
    )

};

export default MyOrdersScreen;
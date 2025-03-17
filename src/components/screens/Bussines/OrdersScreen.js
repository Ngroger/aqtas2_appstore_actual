import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/OrderScreenStyles';
import ReasonForDelete from '../../ux/popup/ReasonForDelete';

function OrderScreen() {
    const navigation = useNavigation();
    const [isReasonForDelete, setReasonForDelete] = useState(false);
    const [userData, setUserData] = useState({});
    const [orders, setOrders] = useState([]);
    const [selectedCard, setSelected] = useState({});
    const [selectedOrderId, setSelectedOrderId] = useState();
    const { t } = useTranslation();
    const [isLoad, setIsLoad] = useState(false);
    const [buyerId, setBuyerId] = useState();

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const toggleReasonForDelete = (id, buyerId) => {
        setReasonForDelete(!isReasonForDelete);
        setSelectedOrderId(id);
        setBuyerId(buyerId);
    };

    // Функция для форматирования времени в формат "часы:минуты:секунды"
    const formatTime = (timeInMinutes) => {
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = timeInMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };


    const loadUserData = async () => {
        setIsLoad(true);
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);

            try {
                const response = await fetch(`https://aqtas.garcom.kz/api/orders/${userData.userId}`);
                const responseJson = await response.json();
                console.log("responseJson: ", responseJson);
                if (responseJson.success) {
                    setOrders(responseJson.orders);
                    setIsLoad(false);
                } else {
                }
            } catch (error) {

            } finally {
                setIsLoad(false);
            }
        }
    };

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const selectCard = (saleId) => {
        const newSelectedCard = { ...selectedCard };
        newSelectedCard[saleId] = !newSelectedCard[saleId];
        setSelected(newSelectedCard);
    };

    const updateOrderAvailability = async (orderId, availability, productId, buyerId) => {
        try {
            const response = await fetch(`https://aqtas.garcom.kz/api/updateAvailability/${orderId}/${availability}/${productId}/${buyerId}`, {
                method: 'PUT',
            });

            const responseJson = await response.json();

            console.log("responseJson: ", responseJson);

            if (responseJson.success) {
                // Убираем заказ из массива orders, если его id совпадает с orderId
                setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            }
        } catch (error) {
            console.log("updateOrderAvailability error", error);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>Заказы Доставка</Text>
                </TouchableOpacity>
                {isLoad && (
                    <View style={styles.loadingIndicatorContainer}>
                        <Text style={styles.textLoad}>{t('products-load-message')}</Text>
                    </View>
                )}
                {!isLoad && (
                    <>
                        {orders.length === 0 ? (
                            <View>
                                <Text style={styles.noDataText}>У вас пока нет заказов</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={orders}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.order} onPress={() => selectCard(item.id)}>
                                        <View style={{ padding: 16 }}>
                                            <View style={styles.infoContainer}>
                                                <Image style={styles.orderImage} source={{ uri: `https://aqtas.garcom.kz/api/images/photoUsers/${item.photoUser}` }} />
                                                <View style={{ left: 10 }}>
                                                    <Text style={styles.nameOrder}>{item.name}</Text>
                                                    <Text style={styles.infoOrder}>{item.nameProduct}</Text>
                                                    <Text style={styles.infoOrder}>Кол-во: {item.count}</Text>
                                                    <Text style={styles.infoOrder}>Адрес: {item.address}</Text>
                                                    {item.size && <Text style={styles.infoOrder}>Размер: {item.size}</Text>}
                                                </View>
                                            </View>
                                        </View>
                                        {item.availability ? null : (
                                            <>
                                                <View style={styles.productAvailability}>
                                                    <Text style={styles.quenstion}>Есть товар в наличии?</Text>
                                                    <View style={styles.answer}>
                                                        <TouchableOpacity onPress={_ => updateOrderAvailability(item.id, 1, item.productId, item.userID)}>
                                                            <Text style={styles.yes}>ДА</Text>
                                                        </TouchableOpacity>
                                                        <View style={styles.line} />
                                                        <TouchableOpacity onPress={_ => updateOrderAvailability(item.id, 0, item.productId, item.userID)}>
                                                            <Text style={styles.no}>НЕТ</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Text style={styles.time}>Оставшееся время на ответ: {formatTime(item.timer)}</Text>
                                                </View>
                                            </>
                                        )}
                                        {selectedCard[item.id] && item.availability ? (
                                            <>
                                                <BlurView intensity={100} tint="default" style={styles.deleteBackground}>
                                                    <View style={styles.deleteContainer}>
                                                        <TouchableOpacity onPress={() => toggleReasonForDelete(item.id, item.userID)}>
                                                            <Ionicons name="md-trash-outline" size={50} color="#FC0005" />
                                                        </TouchableOpacity>
                                                        <View style={styles.line} />
                                                        <TouchableOpacity onPress={() => selectCard(item.id)}>
                                                            <Ionicons name="ios-close" size={50} color="#14FF00" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </BlurView>
                                            </>
                                        ) : null}
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </>
                )}
                <StatusBar backgroundColor="transparent" translucent={true} />
            </View>
            {isReasonForDelete && <ReasonForDelete onClose={toggleReasonForDelete} id={selectedOrderId} userId={userData.userId} buyerId={buyerId} />}
        </SafeAreaView>
    )
};

export default OrderScreen;
import { Text, TouchableOpacity, View, StatusBar, FlatList, Image, ActivityIndicator } from 'react-native';
import styles from '../../../styles/OrderScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import ReasonForDelete from '../../ux/popup/ReasonForDelete';
import { getUserData } from '../../../store/userDataManager';
import { useTranslation } from 'react-i18next';

function OrderScreen() {
    const navigation = useNavigation();
    const [isDelete, setDelete] = useState(false);
    const [isReasonForDelete, setReasonForDelete] = useState(false);
    const [isProductAvailability, setProductAvailability] = useState(false);
    const [userData, setUserData] = useState({});
    const [orders, setOrders] = useState([]);
    const [selectedCard, setSelected] = useState({});
    const [selectedOrderId, setSelectedOrderId] = useState();
    const {t} = useTranslation();
    const [isLoad, setIsLoad] = useState(false);
    const [buyerId, setBuyerId] = useState();

    useEffect(() => {
        setIsLoad(true);
        const intervalId = setInterval(() => {
            setIsLoad(false);
            loadUserData();
          }, 5000); // 5000 миллисекунд
    
        return () => {
            clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
        };
    }, []);

    const toggleReasonForDelete = (id, buyerId) => {
        setReasonForDelete(!isReasonForDelete);
        setSelectedOrderId(id);
        setBuyerId(buyerId);
    }

    const deleteOrderWithReason = async (id, buyerId) => {
        try {
            const reasons = encodeURIComponent("Время ответа истекло. За ожидание с продавца снимется рейтинг");
            const response = await fetch(`https://aqtas.ru/deleteOrder/${userData.userId}/${id}/${buyerId}?reasons=${reasons}`, {
                method: 'DELETE',
            });

            if (response.ok) {
            } else {
            }
        } catch (error) {
        }
    }
    // Функция для форматирования времени в формат "часы:минуты:секунды"
    const formatTime = (timeInMinutes, id, buyerId) => {
        if (timeInMinutes === 0) {
            deleteOrderWithReason(id, buyerId);
        } else {
            const hours = Math.floor(timeInMinutes / 60);
            const minutes = timeInMinutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }
    };


    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
            // Выполните запрос к серверу для получения данных о финансах
            try {
                const response = await fetch(`https://aqtas.ru/orders/${userData.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                }
            } catch (error) {

            }
        }
    };

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const selectCard = (saleId) => {
        // Создайте новый объект selectedCard с обновленным состоянием для текущей карточки
        const newSelectedCard = { ...selectedCard };
        newSelectedCard[saleId] = !newSelectedCard[saleId];
        setSelected(newSelectedCard);
    };

    const productAvailability = ({answer}) => {
        if (answer === 'yes') {
            setProductAvailability(true);
            //
        } else {
            setProductAvailability(true);
            //отправка пользователю, что товара нет в наличие
        }
    }

    const updateOrderAvailability = async (orderId, buyerId) => {
        try {
            const response = await fetch(`https://aqtas.ru/updateOrderAvailability/${userData.userId}/${orderId}/${buyerId}`, {
                method: 'PUT', // Используйте HTTP-метод PUT для обновления
            });
    
            if (response.ok) {

            } else {

            }
        } catch (error) {

        }
    };

    const notAvailable = async (orderId, buyerId) => {
        try {
            const reasons = encodeURIComponent("Товара нет в наличии");
            const response = await fetch(`https://aqtas.ru/deleteOrder/${userData.userId}/${orderId}/${buyerId}?reasons=${reasons}`, {
                method: 'DELETE', // Используйте HTTP-метод DELETE для удаления записи заказа
            });
    
            if (response.ok) {
                // Успешное удаление на сервере
                // Здесь вы можете выполнить необходимые действия после успешного удаления
            } else {

            }
        } catch (error) {

        }
    };
    

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    <Text style={styles.title}>Заказы Доставка</Text>
                </TouchableOpacity>
                    { isLoad && (
                        <View style={styles.loadingIndicatorContainer}>
                            <ActivityIndicator size="big" color="#95E5FF" />
                            <Text style={styles.textLoad}>{t('products-load-message')}</Text>
                        </View>
                    )  }
                    { !isLoad && (
                        <>        
                            { orders.length === 0 ? (
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
                                                    <Image style={styles.orderImage} source={{ uri: `https://aqtas.ru/images/photoUsers/${item.photoUser}` }}/>
                                                    <View style={{ left: 10 }}>
                                                        <Text style={styles.nameOrder}>{item.name}</Text>
                                                        <Text style={styles.infoOrder}>{item.nameProduct}</Text>
                                                        <Text style={styles.infoOrder}>Кол-во: {item.count}</Text>
                                                        <Text style={styles.infoOrder}>Адрес: {item.address}</Text>
                                                        { item.size && <Text style={styles.infoOrder}>Размер: {item.size}</Text> }
                                                    </View>
                                                </View>
                                            </View>
                                            {item.availability ? null : (
                                                    <>
                                                    <View style={styles.productAvailability}>
                                                        <Text style={styles.quenstion}>Есть товар в наличии?</Text>
                                                        <View style={styles.answer}>
                                                            <TouchableOpacity onPress={_ => updateOrderAvailability(item.id, item.userID)}>
                                                                <Text style={styles.yes}>ДА</Text>
                                                            </TouchableOpacity>
                                                            <View style={styles.line}/>
                                                            <TouchableOpacity onPress={_ => notAvailable(item.id, item.userID)}>
                                                                <Text style={styles.no}>НЕТ</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <Text style={styles.time}>Оставшееся время на ответ: {formatTime(item.timer, item.id, item.userID)}</Text>
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
                                                            <View style={styles.line}/>
                                                            <TouchableOpacity onPress={() => selectCard(item.id)}>
                                                                <Ionicons name="ios-close" size={50} color="#14FF00" />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </BlurView>
                                                </>
                                            ) : null }
                                        </TouchableOpacity>
                                    )}
                                />
                            ) }
                        </>
                    )}
                <StatusBar backgroundColor="transparent" translucent={true} />
            </View>
            {isReasonForDelete && <ReasonForDelete onClose={toggleReasonForDelete} id={selectedOrderId} userId={userData.userId} buyerId={buyerId}/>}
        </View>
    )
};

export default OrderScreen;
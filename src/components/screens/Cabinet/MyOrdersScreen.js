import { useNavigation } from '@react-navigation/native';
import { Text, View, FlatList, TouchableOpacity, StatusBar, Image } from 'react-native';
import styles from '../../../styles/MyOrdersScreenStyle';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { getUserData } from '../../../store/userDataManager';
import { useTranslation } from 'react-i18next';

function MyOrdersScreen() {
    const [userData, setUserData] = useState({});
    const [myOrders, setMyOrders] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        loadUserData();
        // Выполните запрос к серверу для получения данных о финансах
        try {
            const response = fetch(`https://aqtas.garcom.kz/api/myOrders/${userData.userId}`);
            if (response.ok) {
                const data = response.json();
                setMyOrders(data);
            } else {

            }
        } catch (error) {

        }
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    };
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                <Text style={styles.title}>{t('my-orders-profile-button')}</Text>
            </TouchableOpacity>
            {myOrders.length > 0 ? (
                <FlatList
                    data={myOrders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.data}>{formatDate(item.date)}</Text>
                            <View style={styles.card}>
                                <Image style={styles.productPreview} />
                                <View style={{ left: 10 }}>
                                    <View style={styles.costContainer}>
                                        <Text style={styles.cost}>{item.newCost}тнг</Text>
                                        <Text style={styles.oldCost}>{item.oldCost}тнг</Text>
                                    </View>
                                    <View style={{ padding: 0, width: 180 }}>
                                        <View>
                                            <View style={styles.infoContainer}>
                                                <Text style={styles.firstInfo}>{t('name-product-cart-info')}</Text>
                                                <Text style={styles.secondInfo}>{item.name}</Text>
                                            </View>
                                            <View style={styles.infoContainer}>
                                                <Text style={styles.firstInfo}>{t('description-product-cart-info')}</Text>
                                                <Text style={styles.secondInfo}>{item.description}</Text>
                                            </View>
                                            <View style={styles.infoContainer}>
                                                <Text style={styles.firstInfo}>{t('brend-cart-info')}</Text>
                                                <Text style={styles.secondInfo}>{item.brend}</Text>
                                            </View>
                                            <View style={styles.infoContainer}>
                                                <Text style={styles.firstInfo}>{t('customer-product-cart-info')}</Text>
                                                <Text style={styles.secondInfo}>{item.costumer}</Text>
                                            </View>
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
            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    )

};

export default MyOrdersScreen;
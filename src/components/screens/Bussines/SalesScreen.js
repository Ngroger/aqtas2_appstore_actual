import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { getUserData } from '../../../store/userDataManager';
import styles from '../../../styles/SalesScreenStyle';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

function SalesScreen() {
    const navigation = useNavigation();
    const [isConfrimDelete, setConfrimDelete] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [count, setCount] = useState(0);
    const [lastPress, setLastPress] = useState(0);
    const [userData, setUserData] = useState({});
    const [sales, setSales] = useState([]);
    const [selectedCard, setSelected] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const { t } = useTranslation();

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
            // Выполните запрос к серверу для получения данных о финансах
            try {
                const response = await fetch(`https://aqtas.garcom.kz/api/sales/${userData.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setSales(data);
                } else {

                }
            } catch (error) {

            }
        }
    };

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

    const handlePress = (index) => {
        // Создайте новый массив cardStates с обновленным состоянием для текущей карточки
        const newCardStates = [...selectedCard];
        newCardStates[index] = !newCardStates[index]; // Инвертировать состояние карточки

        setSelected(newCardStates); // Обновить состояние карточек
    };



    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const goToAddSale = () => {
        navigation.navigate('AddSale'); // Вернуться на предыдущий экран
    };

    const cancel = (index) => {
        // Создайте новый массив selectedCard с обновленным состоянием для текущей карточки
        const newSelectedCard = [...selectedCard];
        newSelectedCard[index] = false; // Установите текущую карточку в неотмеченное состояние
        setSelected(newSelectedCard); // Обновите состояние карточек
    }

    const deleteSale = async (saleId) => {
        try {
            const response = await fetch(`https://aqtas.garcom.kz/api/removeSale/${userData.userId}/${saleId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSales((prevSales) => prevSales.filter((sale) => sale.id !== saleId));
            } else {

            }
        } catch (error) {

        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back-ios" size={scale(24)} color="black" />
                    <Text style={styles.title}>Акции</Text>
                </TouchableOpacity>
                {isLoad && (
                    <View style={styles.loadingIndicatorContainer}>
                        <Text style={styles.textLoad}>{t("products-load-message")}</Text>
                    </View>
                )}
                {!isLoad && (
                    <>
                        {sales.length > 0 ? (
                            <FlatList
                                data={sales}
                                style={{ paddingHorizontal: 24 }}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.sale}>
                                        <Image style={styles.imageSale} source={{ uri: `https://aqtas.garcom.kz/api/images/imageSales/${item.imageSale}` }} />
                                        <View style={styles.filter} />
                                        <Text style={styles.textSale}>{item.name}</Text>
                                        {selectedCard[item.id] ? (
                                            <>
                                                <BlurView intensity={100} tint="default" style={styles.deleteBackground} />
                                                <View style={styles.deleteContainer}>
                                                    <TouchableOpacity onPress={() => deleteSale(item.id)}>
                                                        <Feather name="trash-2" size={50} color="#FC0005" />
                                                    </TouchableOpacity>
                                                    <View style={styles.line} />
                                                    <TouchableOpacity onPress={() => cancel(item.id)}>
                                                        <AntDesign name="close" size={50} color="#14FF00" />
                                                    </TouchableOpacity>
                                                </View>
                                            </>
                                        ) : null}
                                    </TouchableOpacity>
                                )}
                            />
                        ) : (
                            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.noDataText}>Нет добавленных акций</Text>
                            </View>
                        )}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={goToAddSale} style={styles.addSaleButton}>
                                <Text style={styles.addSaleButtonText}>Добавить акцию</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                <StatusBar backgroundColor="transparent" translucent={true} />
            </View>
        </SafeAreaView>
    )
};

export default SalesScreen;

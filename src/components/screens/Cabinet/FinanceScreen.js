import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import styles from '../../../styles/FinanceScreenStyle';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import { getUserData } from '../../../store/userDataManager';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function FinanceScreen() {
    const [userData, setUserData] = useState({}); // Состояние для данных пользователя
    const navigation = useNavigation();
    const [finances, setFinances] = useState([]);
    const [filteredFinances, setFilteredFinances] = useState([]);
    const [activeCategory, setActiveCategory] = useState();
    const [isLoading, setIsLoading] = useState(false); 
    const {t} = useTranslation();

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
            // Выполните запрос к серверу для получения данных о финансах
            try {
                const response = await fetch(`https://aqtas.ru/finances/${userData.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setFinances(data);
                } else {
                }
            } catch (error) {
            }
        }
    };

    const handleCategoryClick = async (categoryId) => {
        setIsLoading(true);
        setActiveCategory(categoryId);
        
        let status = null; // Статус по умолчанию, если "Все" выбрано
        if (categoryId === 2) {
            status = 'Пополнение';
        } else if (categoryId === 3) {
            status = 'Списание';
        }
        
        // Имитируем задержку в 5 секунд
        
        if (status) {
            try {
                const response = await fetch(`https://aqtas.ru/finances/${userData.userId}/${status}`);
                if (response.ok) {
                    const data = await response.json();
                    setFinances(data);
                } else {
                }
            } catch (error) {
            }
        } else {
            // Если выбрана категория "Все", тогда возвращаем все данные пользователя
            loadUserData();
        }

        setIsLoading(false);
    };

    const categories = [
        { id: 1, name: 'Все' },
        { id: 2, name: 'Пополнение' },
        { id: 3, name: 'Списание' },
    ];

    useEffect(() => {
        loadUserData();
    }, []);

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
                <Text style={styles.title}>{t('finacens-profile-button')}</Text>
            </TouchableOpacity>
            <View style={styles.filters}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={
                            activeCategory === category.id
                            ? styles.activeFilter
                            : styles.filter
                        }
                        onPress={() => handleCategoryClick(category.id)}
                        >
                        <Text
                            style={
                            activeCategory === category.id
                                ? styles.activeFilterText
                                : styles.filterText
                            }
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View>
            {finances.length > 0 ? ( // Проверка наличия элементов в массиве finances
                    <FlatList
                        data={finances}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ marginVertical: 6 }}>
                                <View style={styles.dataContainer}>
                                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                                    <TouchableOpacity>
                                        <Octicons name="download" size={24} color="#95E5FF" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.financeCard}>
                                    <Text style={styles.financeState}>{item.status}</Text>
                                    <Text style={styles.count}>{item.cost}тнг</Text>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noDataText}>{t('finances-story-empty')}</Text>
                )}
            </View>
        </View>
    )
    
};

export default FinanceScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ProfileScreenStyle';
import AddBankCard from '../ux/popup/AddBankCard';
import { getUserData } from '../../store/userDataManager'; // Импортируйте функцию
import ProfileMenu from '../ux/popup/ProfileMenu';
import { useTranslation } from 'react-i18next';

function ProfileScreen() {
  const navigation = useNavigation();
  const [showAddBankCard, setShowAddBankCard] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isPush, setIsPush] = useState(true);
  const [userData, setUserData] = useState({}); // Состояние для данных пользователя
  const [photo, setPhoto] = useState(userData.photoUser);
  const [isBussinesAccount, setIsBussinesAccount] = useState(false);
  const {t} = useTranslation();
  const [isLoad, setIsLoad] = useState(false);

  // Загрузка данных пользователя при загрузке экрана
  useEffect(() => {
    setIsLoad(true);
    const intervalId = setInterval(() => {
      setIsLoad(false);
      loadUserData();
    }, 2000); // 5000 миллисекунд

    return () => {
        clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    };
    
  }, []);

  const toggleAddBankCard = () => {
    setShowAddBankCard(!showAddBankCard);
  };

  const togglePushMessage = async () => {
    try {
        // Определите новый статус push-уведомлений
        const newStatus = !isPush;

        // Отправьте PUT-запрос на сервер для обновления статуса push-уведомлений
        const response = await fetch(`https://aqtas.ru/updatePushStatus/${userData.userId}/${newStatus}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (response.ok) {

            // Обновите локальный статус isPush
            setIsPush(newStatus);
        } else {

        }
    } catch (error) {

    }
  };

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const goToPersonalScreen = () => {
    navigation.navigate('Personal', { userData }); // Переход на экран "Personal"
  };

  // Функция для загрузки данных пользователя
  const loadUserData = async () => {
    const userData = await getUserData();
    if (userData) {
      setUserData(userData); 
      // Выполните запрос к серверу для получения данных о финансах
      try {
        const response = await fetch(`https://aqtas.ru/isBussines/${userData.userId}`);
        if (response.ok) {
            const data = await response.json();
            const isBussinesAccount = data && data.isBussinesAccount;
            if(isBussinesAccount === 1) {
              setIsBussinesAccount(true);
            } else {
              setIsBussinesAccount(false);
            }
        } else {

        }
    } catch (error) {
      
    }// Установка данных пользователя в состояние
    }
  };

  const goToMyOrdersScreen = () => {
      navigation.navigate('MyOrders'); // Переход на экран "MyOrders"
  };

  const goToFaQScreen = () => {
    navigation.navigate('FaQ'); // Переход на экран "FaQ"
  };

  const goToFinanceScreen = () => {
    navigation.navigate('Finance'); // Переход на экран "Finance"
  };

  const goToCustomerScreen = () => {
    navigation.navigate('Customer'); // Переход на экран "Customer"
  };

  const goToBussines = () => {
    navigation.navigate('Bussines'); // Переход на экран "Bussines"
  };

  const goToAddPayments = () => {
    navigation.navigate('AddPayments'); // Переход на экран "Bussines"
  };

  return (
    <View>
      <View style={styles.container}>
        { isLoad && (
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator size="big" color="#95E5FF" />
            <Text style={styles.textLoad}>{t('products-load-message')}</Text>
          </View>
        )}
        { !isLoad && (
          <>
            <View>
              <View style={[styles.infoContainer, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', display: 'flex' }}>
                  <Image source={{ uri: `https://aqtas.ru/images/photoUsers/${userData.photoUser}` }} style={styles.photo} />
                  <View>
                    <Text style={styles.infoText}>{t('greetings-title')},</Text>
                    <Text style={styles.infoText}>{userData.fullname} {userData.surname}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', display: 'flex' }}>
                  <TouchableOpacity onPress={togglePushMessage}>
                    <Feather name={isPush ? 'bell' : 'bell-off'} size={28} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleShowMenu} style={{ left: 0 }}>
                    <Entypo name="dots-three-vertical" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={styles.bonusContainer}>
                <View style={styles.sale}>
                  <Text style={styles.saleText}>До 35%</Text>
                </View>
                <View style={styles.seasonSale}>
                  <Text style={styles.seasonSaleText}>Осенняя распродажа</Text>
                </View>
              </View> */}
            </View>
            <View>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.profileButtonText} onPress={goToPersonalScreen}>
                  {t('personal-data-profile-button')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToMyOrdersScreen} style={styles.profileButton}>
                <Text style={styles.profileButtonText}>{t('my-orders-profile-button')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToFaQScreen} style={styles.faqButton}>
                <Image style={styles.faq} source={require('../../img/faq.png')} />
                <Text style={styles.faqText}>
                  {t('faq-profile-button')}
                </Text>
              </TouchableOpacity>  
              {isBussinesAccount ? (
                <TouchableOpacity onPress={goToBussines} style={styles.profileButton}>
                  <Text style={styles.profileButtonText}>{t('bussines-profile-button')}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={goToCustomerScreen} style={styles.profileButton}>
                  <Text style={styles.profileButtonText}>{t('become-customer-profile-button')}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setShowAddBankCard(true)} style={styles.profileButton}>
                <Text style={styles.profileButtonText}>{t('payment-methods-title')}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) }
        <StatusBar backgroundColor="transparent" translucent={true} />
      </View>
      {showAddBankCard && <AddBankCard onClose={toggleAddBankCard}/>}
      {showMenu && <ProfileMenu onClose={toggleShowMenu}/>}
    </View>
  );
}

export default ProfileScreen;

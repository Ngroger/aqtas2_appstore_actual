import { Entypo, Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useUnauth } from '../../context/UnauthProvider';
import { getUserData } from '../../store/userDataManager'; // Импортируйте функцию
import styles from '../../styles/ProfileScreenStyle';
import AddBankCard from '../ux/popup/AddBankCard';
import ProfileMenu from '../ux/popup/ProfileMenu';
import LanguageSelector from '../ux/popup/LanguageSelector';

function ProfileScreen() {
  const navigation = useNavigation();
  const [showAddBankCard, setShowAddBankCard] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isPush, setIsPush] = useState(true);
  const [userData, setUserData] = useState({}); // Состояние для данных пользователя
  const [isBussinesAccount, setIsBussinesAccount] = useState(false);
  const { t } = useTranslation();
  const [isLoad, setIsLoad] = useState(true);
  const { openModal } = useUnauth();
  
  const [isOpenLang, setIsOpenLang] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );


  const toggleAddBankCard = () => {
    setShowAddBankCard(!showAddBankCard);
  };

  const togglePushMessage = async () => {
    try {
      // Определите новый статус push-уведомлений
      const newStatus = !isPush;

      // Отправьте PUT-запрос на сервер для обновления статуса push-уведомлений
      const response = await fetch(`https://aqtas.garcom.kz/api/updatePushStatus/${userData.userId}/${newStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsPush(newStatus);
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

  const loadUserData = async () => {
    setIsLoad(true);
    try {
      const userData = await getUserData();
      if (userData && userData.userId && userData.fullname) {
        setUserData(userData);
        const response = await fetch(`https://aqtas.garcom.kz/api/isBussines/${userData.userId}`);
        if (response.ok) {
          const data = await response.json();
          const isBussinesAccount = data && data.isBussinesAccount;
          setIsBussinesAccount(isBussinesAccount === 1);
        }
      } else {
        openModal(t("unauth-modal.title"), t("unauth-modal.description-profile"))
      }
    } catch (error) {
      console.log(error);
      setIsLoad(false);
    } finally {
      setIsLoad(false);
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

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <View style={styles.container}>
        {isLoad && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textLoad}>{t("products-load-message")}</Text>
          </View>
        )}
        {!isLoad && (
          <>
            <View>
              {userData && (
                <View style={[styles.infoContainer, { justifyContent: 'space-between', marginTop: Platform.OS === 'android' && 36 }]}>
                  <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <Image source={{ uri: `https://aqtas.garcom.kz/api/images/photoUsers/${userData?.photoUser}` }} style={styles.photo} />
                    <View>
                      <Text style={styles.infoText}>{t('greetings-title')},</Text>
                      <Text style={styles.infoText}>{userData?.fullname} {userData?.surname}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', display: 'flex' }}>
                    <TouchableOpacity onPress={togglePushMessage}>
                      <Feather name={isPush ? 'bell' : 'bell-off'} size={scale(20)} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleShowMenu} style={{ left: 0 }}>
                      <Entypo name="dots-three-vertical" size={scale(20)} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
              <TouchableOpacity onPress={() => goToFinanceScreen()} style={styles.profileButton}>
                <Text style={styles.profileButtonText}>{t("finacens-profile-button")}</Text>
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
              <TouchableOpacity onPress={() => navigation.navigate('Policy')} style={styles.profileButton}>
                <Text style={styles.profileButtonText}>{t('policy-screen.title')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('PublicOffer')} style={styles.profileButton}>
                <Text style={styles.profileButtonText}>{t('offer-screen.title')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsOpenLang(true)} style={styles.profileButton}>
                <Text style={styles.profileButtonText}>{t('select-language')}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <StatusBar backgroundColor="transparent" translucent={true} />
      </View>
      {showAddBankCard && <AddBankCard onClose={toggleAddBankCard} />}
      {showMenu && <ProfileMenu onClose={toggleShowMenu} />}
      <LanguageSelector modalVisible={isOpenLang} onClose={() => setIsOpenLang(false)}/>
    </SafeAreaView>
  );
}

export default ProfileScreen;

import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { vs } from 'react-native-size-matters';

import { CategoriesProvider } from '../../../context/CategoriesProvider';
import { UnauthProvider } from '../../../context/UnauthProvider';
import { getIsNewUser } from '../../../store/NewUserStorage';
import { getUserData } from '../../../store/userDataManager';
import AccordionScreen from '../../screens/AccordionsScreen';
import AddCardScreen from '../../screens/AddCardScreen';
import AddPaymentsMethod from '../../screens/AddPaymentsMethod';
import AddPaypalScreen from '../../screens/AddPaypalScreen';
import AuthorizationScreen from '../../screens/AuthorizationScreen';
import BanScreen from '../../screens/BanScreen';
import AddSaleScreen from '../../screens/Bussines/AddSaleScreen';
import EditBussinesScreen from '../../screens/Bussines/EditBussines';
import MyBankAccount from '../../screens/Bussines/MyBankAccount';
import MyGoodsScreen from '../../screens/Bussines/MyGoodsScreen';
import OrderScreen from '../../screens/Bussines/OrdersScreen';
import SalesScreen from '../../screens/Bussines/SalesScreen';
import StatScreen from '../../screens/Bussines/StatScreen';
import BussinesScreen from '../../screens/BussinesScreen';
import CustomerScreen from '../../screens/Cabinet/CostumerScreen';
import FaqScreen from '../../screens/Cabinet/faqScreen';
import FinanceScreen from '../../screens/Cabinet/FinanceScreen';
import MyOrdersScreen from '../../screens/Cabinet/MyOrdersScreen';
import PersonalDate from '../../screens/Cabinet/PersonalDate';
import CartScreen from '../../screens/CartScreen';
import CategoriesScreen from '../../screens/CategoriesScreen';
import EditProductScreen from '../../screens/EditProductScreen';
import MainScreen from '../../screens/MainScreen';
import MapScreen from '../../screens/MapScreen';
import NoInternetMessage from '../../screens/NoInternetScreen';
import PolicyScreen from '../../screens/PolicyScreen';
import ProductCardScreen from '../../screens/ProductCardScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import PublicOfferScreen from '../../screens/PublicOfferScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import ReviewsScreen from '../../screens/ReviewsScreen';
import ShopsScreen from '../../screens/ShopsScreen';
import WelcomeSliderScreen from '../../screens/WelcomeSliderScreen';

export default function AppNavigationContainer() {
  const { t } = useTranslation();
  const navigationRef = useRef();

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => {
      const iconProps = {
        size: focused ? vs(20) : vs(20),
        color: focused ? '#95E5FF' : '#BDBDBD',
      };
      switch (route.name) {
        case t('main-name-bottom-tab'):
          return <Ionicons name="home-outline" {...iconProps} />;
        case t('categories-name-bottom-tab'):
          return <Feather name="shopping-bag" {...iconProps} />;
        case t('shops-name-bottom-tab'):
          return <Entypo name="shop" {...iconProps} />;
        case t('cart-name-bottom-tab'):
          return <Ionicons name="cart-outline" {...iconProps} />;
        case t('profile-name-bottom-tab'):
          return <AntDesign name="user" {...iconProps} />;
        default:
          return null;
      }
    },
    tabBarInactiveTintColor: '#BDBDBD',
    tabBarActiveTintColor: '#95E5FF',
    tabBarLabelStyle: { fontSize: vs(10) },
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        customNavigate('NoInternet')
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    checkIsNewUser();
  }, []);

  const checkIsNewUser = async () => {
    try {
      const isNewUser = await getIsNewUser();
      console.log("isNewUser: ", isNewUser);

      if (navigationRef.current) {
        if (isNewUser) {
          customNavigate('Welcome');
        } else {
          const userData = await getUserData();
          if (userData) {
            const isBanned = await checkIsBanedUser();
            if (isBanned) return; // ❌ Не пускать дальше

            customNavigate('MainTabs'); // ✅ Пускаем только если не забанен
          } else {
            customNavigate('Authorization');
          }
        }
      }
    } catch (error) {
      console.log("check is new user: ", error);
    }
  };



  const customNavigate = (screen) => {
    if (navigationRef.current) {
      navigationRef.current.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: screen
            }
          ]
        })
      )
    }
  };

  const checkIsBanedUser = async () => {
    try {
      const userData = await getUserData();

      if (userData) {
        const response = await fetch(`https://aqtas.garcom.kz/api/checkIsBaned/${userData.userId}`);
        const responseJson = await response.json();

        if (responseJson.success && responseJson.blocked_at) {
          console.log("reason: ", responseJson.reason);

          navigationRef.current.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'BanScreen',
                  params: { reason: responseJson.reason }
                }
              ]
            })
          );

          return true; // Забанен
        }
      }
    } catch (error) {
      console.log('Check Is Baned Error: ', error);
    }

    return false; // Не забанен
  };



  const TabNavigator = () => (
    <Tab.Navigator initialRouteName={t('main-name-bottom-tab')} screenOptions={screenOptions}>
      <Tab.Screen name={t('main-name-bottom-tab')} component={MainScreen} />
      <Tab.Screen name={t('categories-name-bottom-tab')} component={CategoriesScreen} />
      <Tab.Screen name={t('shops-name-bottom-tab')} component={ShopsScreen} />
      <Tab.Screen name={t('cart-name-bottom-tab')} component={CartScreen} />
      <Tab.Screen name={t('profile-name-bottom-tab')} component={ProfileScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <UnauthProvider>
        <CategoriesProvider>
          <Stack.Navigator>
            <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="BanScreen" component={BanScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome" component={WelcomeSliderScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Authorization" component={AuthorizationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Personal" component={PersonalDate} options={{ headerShown: false }} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FaQ" component={FaqScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Finance" component={FinanceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Accordion" component={AccordionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddCard" component={AddCardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Product" component={ProductCardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Bussines" component={BussinesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditBussines" component={EditBussinesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyGoods" component={MyGoodsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Sales" component={SalesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Orders" component={OrderScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Stats" component={StatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddSale" component={AddSaleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddPayments" component={AddPaymentsMethod} options={{ headerShown: false }} />
            <Stack.Screen name="AddPaypal" component={AddPaypalScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyBankAccount" component={MyBankAccount} options={{ headerShown: false }} />
            <Stack.Screen name="NoInternet" component={NoInternetMessage} options={{ headerShown: false }} />
            <Stack.Screen name="Policy" component={PolicyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PublicOffer" component={PublicOfferScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </CategoriesProvider>
      </UnauthProvider>
    </NavigationContainer>
  );
}

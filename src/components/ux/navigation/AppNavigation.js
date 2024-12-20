import * as React from 'react';
import { useRef } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, Entypo, AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from 'react';
import { s } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { hasToken } from '../../../store/tokenManager';

import WelcomeSliderScreen from '../../screens/WelcomeSliderScreen';
import MainScreen from '../../screens/MainScreen';
import CategoriesScreen from '../../screens/CategoriesScreen';
import ShopsScreen from '../../screens/ShopsScreen';
import CartScreen from '../../screens/CartScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import AuthorizationScreen from '../../screens/AuthorizationScreen';
import NoInternetMessage from '../../screens/NoInternetScreen';
import PersonalDate from '../../screens/Cabinet/PersonalDate';
import MyOrdersScreen from '../../screens/Cabinet/MyOrdersScreen';
import FaqScreen from '../../screens/Cabinet/faqScreen';
import FinanceScreen from '../../screens/Cabinet/FinanceScreen';
import CustomerScreen from '../../screens/Cabinet/CostumerScreen';
import AccordionScreen from '../../screens/AccordionsScreen';
import AddCardScreen from '../../screens/AddCardScreen';
import MapScreen from '../../screens/MapScreen';
import ProductCardScreen from '../../screens/ProductCardScreen';
import ReviewsScreen from '../../screens/ReviewsScreen';
import BussinesScreen from '../../screens/BussinesScreen';
import EditBussinesScreen from '../../screens/Bussines/EditBussines';
import MyGoodsScreen from '../../screens/Bussines/MyGoodsScreen';
import SalesScreen from '../../screens/Bussines/SalesScreen';
import OrderScreen from '../../screens/Bussines/OrdersScreen';
import StatScreen from '../../screens/Bussines/StatScreen';
import AddSaleScreen from '../../screens/Bussines/AddSaleScreen';
import EditProductScreen from '../../screens/EditProductScreen';
import AddPaymentsMethod from '../../screens/AddPaymentsMethod';
import AddPaypalScreen from '../../screens/AddPaypalScreen';
import MyBankAccount from '../../screens/Bussines/MyBankAccount';
import { UnauthProvider } from '../../../context/UnauthProvider';
import { getIsNewUser } from '../../../store/NewUserStorage';
import { CategoriesProvider } from '../../../context/CategoriesProvider';

export default function AppNavigationContainer() {
  const { t } = useTranslation();
  const navigationRef = useRef();

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => {
      const iconProps = {
        size: focused ? s(24) : s(20),
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
    tabBarLabelStyle: { fontSize: s(14) },
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
      if (navigationRef.current) {
        if (isNewUser) {
          customNavigate('Welcome')
        } else {
          customNavigate('MainTabs')
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
          </Stack.Navigator>
        </CategoriesProvider>
      </UnauthProvider>
    </NavigationContainer>
  );
}

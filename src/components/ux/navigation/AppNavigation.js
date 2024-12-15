import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, Entypo, AntDesign, Feather } from '@expo/vector-icons';
import WelcomeSliderScreen from '../../screens/WelcomeSliderScreen';
import CartScreen from '../../screens/CartScreen';
import ShopsScreen from '../../screens/ShopsScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import MainScreen from '../../screens/MainScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../../screens/CategoriesScreen';
import AuthorizationScreen from '../../screens/AuthorizationScreen';
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
import { hasToken } from '../../../store/tokenManager';
import { useState, useEffect } from 'react';
import RegistrationScreen from '../../screens/RegistrationScreen';
import NoInternetMessage from '../../screens/NoInternetScreen';
import NetInfo from '@react-native-community/netinfo';
import AddPaymentsMethod from '../../screens/AddPaymentsMethod';
import { useTranslation } from 'react-i18next';
import AddPaypalScreen from '../../screens/AddPaypalScreen';
import MyBankAccount from '../../screens/Bussines/MyBankAccount';
import { s } from 'react-native-size-matters'

export default function AppNavigationContainer() {
  const [hasUserToken, setHasUserToken] = useState(false);
  const [isConnection, setIsConnected] = useState(true);
  const { t } = useTranslation();

  const mainName = `${t('main-name-bottom-tab')}`;
  const categoriesName = `${t('categories-name-bottom-tab')}`;
  const shopsName = `${t('shops-name-bottom-tab')}`;
  const cartName = `${t('cart-name-bottom-tab')}`;
  const profileName = `${t('profile-name-bottom-tab')}`;
  const welcomeName = "Welcome"

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  useEffect(() => {
    // Проверяем наличие токена при монтировании компонента
    const checkToken = async () => {
      const tokenExists = await hasToken();
      setHasUserToken(tokenExists);
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    checkToken();

    return () => {
      // Отписываемся от событий при размонтировании компонента
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {!isConnection && (
        <Stack.Navigator>
          <Stack.Screen name='NoInternet' component={NoInternetMessage} options={{ headerShown: false }} />
          <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                initialRouteName={mainName}
                screenOptions={({ route }) => ({
                  headerShown: false, // Hide the navigation bar
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === mainName) {
                      iconName = 'home-outline';
                      return (
                        <Ionicons
                          name={iconName}
                          size={focused ? s(24) : s(20)}
                          color={focused ? '#95E5FF' : '#BDBDBD'}
                        />
                      );
                    }
                    if (rn === categoriesName) {
                      iconName = 'shopping-bag';
                      return (
                        <Feather
                          name={iconName}
                          size={focused ? s(24) : s(20)}
                          color={focused ? '#95E5FF' : '#BDBDBD'}
                        />
                      );
                    }
                    if (rn === shopsName) {
                      iconName = 'shop';
                      return (
                        <Entypo
                          name={iconName}
                          size={focused ? s(24) : s(20)}
                          color={focused ? '#95E5FF' : '#BDBDBD'}
                        />
                      );
                    }
                    if (rn === cartName) {
                      iconName = 'cart-outline';
                      return (
                        <Ionicons
                          name={iconName}
                          size={focused ? s(24) : s(20)}
                          color={focused ? '#95E5FF' : '#BDBDBD'}
                        />
                      );
                    }
                    if (rn === profileName) {
                      iconName = 'user';
                      return (
                        <AntDesign
                          name={iconName}
                          size={focused ? s(24) : s(20)}
                          color={focused ? '#95E5FF' : '#BDBDBD'}
                        />
                      );
                    }
                  },
                  tabBarInactiveTintColor: '#BDBDBD', // Цвет подсказок без фокуса
                  tabBarActiveTintColor: '#95E5FF', // Цвет подсказок при фокусе
                  tabBarLabelStyle: {
                    fontSize: s(14)
                  },
                })}
              >
                <Tab.Screen name={mainName} component={MainScreen} />
                <Tab.Screen name={categoriesName} component={CategoriesScreen} />
                <Tab.Screen name={shopsName} component={ShopsScreen} />
                <Tab.Screen name={cartName} component={CartScreen} />
                <Tab.Screen name={profileName} component={ProfileScreen} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} options={{ headerShown: false }} />
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
        </Stack.Navigator>
      )}
      {isConnection && (
        <Stack.Navigator>
          {hasUserToken ? ( // В зависимости от наличия токена выбираем, что рендерить
            <>
              <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
                {() => (
                  <Tab.Navigator
                    initialRouteName={mainName}
                    screenOptions={({ route }) => ({
                      headerShown: false, // Hide the navigation bar
                      tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === mainName) {
                          iconName = 'home-outline';
                          return (
                            <Ionicons
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                        if (rn === categoriesName) {
                          iconName = 'shopping-bag';
                          return (
                            <Feather
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                        if (rn === shopsName) {
                          iconName = 'shop';
                          return (
                            <Entypo
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                        if (rn === cartName) {
                          iconName = 'cart-outline';
                          return (
                            <Ionicons
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                        if (rn === profileName) {
                          iconName = 'user';
                          return (
                            <AntDesign
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                      },
                      tabBarInactiveTintColor: '#BDBDBD', // Цвет подсказок без фокуса
                      tabBarActiveTintColor: '#95E5FF', // Цвет подсказок при фокусе
                      tabBarLabelStyle: {
                        fontSize: s(14)
                      },
                    })}
                  >
                    <Tab.Screen name={mainName} component={MainScreen} />
                    <Tab.Screen name={categoriesName} component={CategoriesScreen} />
                    <Tab.Screen name={shopsName} component={ShopsScreen} />
                    <Tab.Screen name={cartName} component={CartScreen} />
                    <Tab.Screen name={profileName} component={ProfileScreen} />
                  </Tab.Navigator>
                )}
              </Stack.Screen>
              <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} options={{ headerShown: false }} />
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
            </>
          ) : (
            <>
              <Stack.Screen name={welcomeName} component={WelcomeSliderScreen} options={{ headerShown: false }} />
              <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} options={{ headerShown: false }} />
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
              <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
                {() => (
                  <Tab.Navigator
                    initialRouteName={mainName}
                    screenOptions={({ route }) => ({
                      headerShown: false, // Hide the navigation bar
                      tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === mainName) {
                          iconName = 'home-outline';
                          return (
                            <Ionicons
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                        if (rn === categoriesName) {
                          iconName = 'shopping-bag';
                          return (
                            <Feather
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                        if (rn === shopsName) {
                          iconName = 'shop';
                          return (
                            <Entypo
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                        if (rn === cartName) {
                          iconName = 'cart-outline';
                          return (
                            <Ionicons
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                        if (rn === profileName) {
                          iconName = 'user';
                          return (
                            <AntDesign
                              name={iconName}
                              size={focused ? s(24) : s(20)}
                              color={focused ? '#95E5FF' : '#BDBDBD'}
                            />
                          );
                        }
                      },
                      tabBarInactiveTintColor: '#BDBDBD', // Цвет подсказок без фокуса
                      tabBarActiveTintColor: '#95E5FF', // Цвет подсказок при фокусе
                      tabBarLabelStyle: {
                        fontSize: s(14)
                      },
                    })}
                  >
                    <Tab.Screen name={mainName} component={MainScreen} />
                    <Tab.Screen name={categoriesName} component={CategoriesScreen} />
                    <Tab.Screen name={shopsName} component={ShopsScreen} />
                    <Tab.Screen name={cartName} component={CartScreen} />
                    <Tab.Screen name={profileName} component={ProfileScreen} />
                  </Tab.Navigator>
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

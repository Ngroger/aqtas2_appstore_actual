import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
import { toggleIsNewUser } from '../../store/NewUserStorage';
import { hasToken, storeToken } from '../../store/tokenManager';
import { storeUserData } from '../../store/userDataManager';
import styles from '../../styles/RegistrationScreenStyle';

const CELL_COUNT = 6;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function CodeConfirm({ userData }) {
  const { t } = useTranslation();
  const [code, onChangeCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendVisible, setResendVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendVisible(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => { });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  const handleResendCode = async () => {
    try {
      setTimer(60);
      setResendVisible(false);
      await fetch('https://aqtas.garcom.kz/api/sendSMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: userData.phoneNumber
        })
      });
    } catch (error) {
      console.log("resend sms code error: ", error);
    }
  };

  const verifySmsCode = async () => {
    try {
      const response = await fetch('https://aqtas.garcom.kz/api/verify-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: userData.phoneNumber,
          code: code
        })
      });

      const responseJson = await response.json();

      if (responseJson.success) {
        sendDataToServer();
      }
    } catch (error) {
      console.log('verify sms code error: ', error);
    }
  };

  const sendDataToServer = () => {
    const user = {
      fullname: userData.fullname,
      surname: userData.surname,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      password: userData.password,
      isBussinesAccount: userData.isBussinesAccount,
      pushID: expoPushToken
    };

    storeUserData(userData);

    axios.post('https://aqtas.garcom.kz/api/register', user)
      .then((response) => {
        if (response.data.success) {
          const authToken = response.data.authToken;
          const userId = response.data.userId;

          storeToken(authToken);
          storeUserData({ ...userData, userId, photoUser: 'withoutPhoto.png', sex: 'Не укаказано', birthday: 'Не указано', address: 'Не указано' });
          toggleIsNewUser(false);
          hasToken();
          schedulePushNotification();
          navigation.navigate('MainTabs');
        }
      })
      .catch((error) => {
        console.log('sendDataToServer error: ', error);
      });
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Сообщение",
        body: `Добро пожаловать в AQTas!`,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.titleReg}>{t('registration-title')}</Text>
      <Text style={styles.description}>{t('code-confirm.subtitle')}</Text>
      <CodeField
        value={code}
        onChangeText={onChangeCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Text key={index} style={styles.cell}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {isResendVisible ? (
        <TouchableOpacity onPress={handleResendCode}>
          <Text style={styles.resendText}>{t('code-confirm.resend-button')}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.timer}>{formatTime(timer)}</Text>
      )}
      <TouchableOpacity
        onPress={verifySmsCode}
        style={styles.nextButton}
      >
        <Text style={styles.nextText}>{t('button-next')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CodeConfirm;

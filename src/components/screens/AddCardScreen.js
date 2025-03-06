import { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../../styles/AddCardScreenStyle';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../../store/userDataManager';
import { useTranslation } from 'react-i18next';
import WebViewModal from '../ux/popup/WebViewModal';
import { StatusBar } from 'expo-status-bar';

function AddCardScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [cardNumber, setCardNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);
  const [url, setUrl] = useState();

  useEffect(() => {
    (async () => {
      const data = await getUserData();
      if (data) setUserData(data);
    })();
  }, []);

  const formatCardNumber = (text) => {
    setCardNumber(text.replace(/[^0-9]/g, '').replace(/(\d{4})/g, '$1 ').trim());
  };

  const getCardImage = () => {
    if (/^4/.test(cardNumber)) return require('../../img/cards/visa.png');
    if (/^5/.test(cardNumber)) return require('../../img/cards/mastercard.png');
    return null;
  };

  const handleAddCard = async () => {
    if (!cardNumber) {
      setErrorMessage(t('add-payment-screen.all-field-require'));
      return;
    }

    setIsLoad(true);
    try {
      const detectedCardType = /^4/.test(cardNumber) ? 'Visa' : /^5/.test(cardNumber) ? 'MasterCard' : '';

      const response = await fetch('https://aqtas.garcom.kz/api/addBankCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bank_card: cardNumber,
          userId: userData.userId,
          bank_name: detectedCardType
        })
      });

      const responseJson = await response.json();

      if (responseJson.success) {
        setIsLoad(false);
        setErrorMessage();
        setUrl(responseJson.redirect_url);
        setIsWebViewOpen(true);
      } else {
        setIsLoad(false);
        setErrorMessage(t(`add-payment-screen.${responseJson.message}`));
      }

    } catch (error) {
      console.error('handleAddCard error:', error);
      setErrorMessage(t('add-payment-screen.error-msg'));
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={navigation.goBack}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        <Text style={styles.title}>{t('add-payment-method-title')}</Text>
      </TouchableOpacity>

      <View style={{ paddingHorizontal: 24 }}>
        <View style={styles.field}>
          <Text style={styles.fieldTitle}>{t('number-card-payment-field')}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextInput
              keyboardType="numeric"
              maxLength={19}
              style={styles.input}
              placeholder={t('number-card-payment-placeholder')}
              onChangeText={formatCardNumber}
              value={cardNumber}
            />
            {getCardImage() && (
              <View style={{ borderLeftWidth: 1, borderLeftColor: '#95E5FF', paddingHorizontal: 10 }}>
                <Image resizeMode="contain" style={styles.cardImage} source={getCardImage()} />
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        {isLoad ? (
          <View style={styles.activAddCardButton}>
            <ActivityIndicator size="small" color="#FFF" />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.activAddCardButton, isSuccess && { backgroundColor: '#59e327' }]}
            onPress={isSuccess ? () => navigation.navigate(t('profile-name-bottom-tab')) : handleAddCard}
          >
            <Text style={styles.activeAddCardText}>
              {isSuccess ? t('success-payment-button') : t('add-payment-button')}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <WebViewModal
        url={url}
        modalVisible={isWebViewOpen}
        onClose={() => setIsWebViewOpen(false)}
        type='card'
      />
      <StatusBar translucent backgroundColor="transparent" />
    </View>
  );
}

export default AddCardScreen;

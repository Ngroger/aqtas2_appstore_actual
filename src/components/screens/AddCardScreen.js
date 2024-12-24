import { useState, useEffect, useTransition } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../../styles/AddCardScreenStyle';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../../store/userDataManager';
import { useTranslation } from 'react-i18next';
import MaskInput from 'react-native-mask-input';
import WebViewModal from '../ux/popup/WebViewModal';

function AddCardScreen() {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [owner, setOwner] = useState('');
  const [date, setDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({});
  const { t } = useTranslation();
  const [isLoad, setIsLoad] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);
  const [url, setUrl] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    loadUserData();
  }, [])

  const loadUserData = async () => {
    const userData = await getUserData();
    if (userData) {
      setUserData(userData);
    }
  };
  const formatCardNumber = (text) => {
    // Remove all non-numeric characters from the input
    let formattedText = text.replace(/[^0-9]/g, '');
    // Insert a space after every 4 digits
    formattedText = formattedText.replace(/(\d{4})/g, '$1 ');
    // Remove any extra spaces at the end
    formattedText = formattedText.trim();
    // Update the input value
    setCardNumber(formattedText);
  };
  const getCardImage = () => {
    if (/^4/.test(cardNumber)) {
      return require('../../img/cards/visa.png');
    } else if (/^5/.test(cardNumber)) {
      return require('../../img/cards/mastercard.png');
    } else {
      return null;
    }
  };

  const handleCvvChange = (text) => {
    // Remove all non-numeric characters from the input
    let formattedText = text.replace(/[^0-9]/g, '');
    // Update the input value
    setCvv(formattedText);
  };

  const handleAddCard = async () => {
    try {
      if (cardNumber === '' || date === '' || cvv === '') {
        setErrorMessage('Все поля обязательны для заполнения');
      } else {
        // Determine card type
        setIsLoad(true)
        let detectedCardType = '';
        if (/^4/.test(cardNumber)) {
          detectedCardType = 'Visa';
        } else if (/^5/.test(cardNumber)) {
          detectedCardType = 'MasterCard';
        }

        // Prepare data for the server
        const formattedCardNumber = cardNumber.replace(/\s/g, ''); // Remove spaces

        // Make a request to the server to add the card
        const response = await fetch('https://aqtas.garcom.kz/api/addBankCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numberCard: formattedCardNumber,
            validity: date,
            cvv,
            bankName: detectedCardType,
            userId: userData.userId,
            owner,
          }),
        });

        const responseJson = await response.json();

        if (responseJson.success) {
          // Card successfully added
          setErrorMessage('');
          setIsLoad(false);
          setIsSuccess(true);
        } else {
          setErrorMessage(t('add-payment-error'));
          setIsLoad(false);
          setIsSuccess(false);
        }
      }
    } catch (error) {
      console.log('handle add card error: ', error);
    } finally {
      setIsLoad(false);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        <Text style={styles.title}>{t('add-payment-method-title')}</Text>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 24 }}>
        <View style={styles.field}>
          <Text style={styles.fieldTitle}>{t('number-card-payment-field')}</Text>
          <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput
              keyboardType='numeric'
              maxLength={19}
              style={styles.input}
              placeholder={t('number-card-payment-placeholder')}
              onChangeText={(text) => {
                formatCardNumber(text);
              }}
              value={cardNumber}
            />
            <View style={{ borderLeftColor: '#95E5FF', borderLeftWidth: 1, paddingHorizontal: 10 }}>
              <Image resizeMode='contain' style={styles.cardImage} source={getCardImage()} />
            </View>
          </View>
        </View>
        <View style={styles.fields}>
          <View style={[styles.field, { width: 160 }]}>
            <Text style={styles.fieldTitle}>{t('validity-payment-field')}</Text>
            <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <MaskInput
                keyboardType='numeric'
                maxLength={5}
                style={[styles.input, { width: 100, textAlign: 'center' }]}
                placeholder={t('validity-payment-placeholder')}
                mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                onChangeText={(text) => {
                  setDate(text);
                }}
                value={date}
              />
            </View>
          </View>
          <View style={[styles.field, { width: 160 }]}>
            <Text style={styles.fieldTitle}>CVV|CVC</Text>
            <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextInput
                keyboardType='numeric'
                maxLength={3}
                secureTextEntry={true}
                style={[styles.input, { width: 100, textAlign: 'center' }]}
                placeholder='CVV'
                onChangeText={(text) => {
                  handleCvvChange(text);
                }}
                value={cvv}
              />
            </View>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldTitle}>{t('owner-payment-field')}</Text>
          <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder='ИМЯ ФАМИЛИЯ'
              onChangeText={(text) => {
                setOwner(text.toUpperCase()); // Преобразование текста в верхний регистр
              }}
              value={owner}
              autoCapitalize="characters" // Установка верхнего регистра
              keyboardType="ascii-capable" // Использование английской клавиатуры
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        {isLoad && (
          <View style={styles.activAddCardButton}>
            <ActivityIndicator size="small" color="#FFF" />
          </View>
        )}
        {!isLoad && (
          <>
            {isSuccess ? (
              <TouchableOpacity style={[styles.activAddCardButton, { backgroundColor: '#59e327' }]} onPress={() => navigation.navigate(t('profile-name-bottom-tab'))}>
                <Text style={styles.activeAddCardText}>{t('success-payment-button')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.activAddCardButton} onPress={handleAddCard}>
                <Text style={styles.activeAddCardText}>{t('add-payment-button')}</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <WebViewModal
        modalVisible={isWebViewOpen}
        onClose={() => setIsWebViewOpen(false)}

      />
    </View>
  )
};

export default AddCardScreen;
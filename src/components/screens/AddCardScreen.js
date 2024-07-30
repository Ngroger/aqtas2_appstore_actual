import { useState, useEffect, useTransition } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/AddCardScreenStyle';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../../store/userDataManager';
import { useTranslation } from 'react-i18next';

function AddCardScreen() {
    const navigation = useNavigation();
    const [cardNumber, setCardNumber] = useState('');
    const [owner, setOwner] = useState('');
    const [date, setDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({});
    const {t} = useTranslation();
  
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
      
    const formatExpirationDate = (text) => {
      // Remove all non-numeric characters from the input
      let formattedText = text.replace(/[^0-9]/g, '');
      // Insert a pipe character after the second digit
      if (formattedText.length > 2) {
        formattedText = formattedText.slice(0, 2) + '|' + formattedText.slice(2);
      }
      // Remove any extra characters at the end
      formattedText = formattedText.slice(0, 5);
      // Update the input value
      setDate(formattedText);
    };
  
    const handleCvvChange = (text) => {
      // Remove all non-numeric characters from the input
      let formattedText = text.replace(/[^0-9]/g, '');
      // Update the input value
      setCvv(formattedText);
    };
  
    const handleAddCard = async () => {
      if (cardNumber === '' || date === '' || cvv === '') {
        setErrorMessage('Все поля обязательны для заполнения');
      } else {
        // Determine card type
        let detectedCardType = '';
        if (/^4/.test(cardNumber)) {
          detectedCardType = 'Visa';
        } else if (/^5/.test(cardNumber)) {
          detectedCardType = 'MasterCard';
        }
  
        // Prepare data for the server
        const formattedCardNumber = cardNumber.replace(/\s/g, ''); // Remove spaces
        const hyphenatedDate = date.replace('|', '-');
        const dayAddedDate = '00-' + hyphenatedDate;
        const day = dayAddedDate.substring(0, 2);
        const month = dayAddedDate.substring(3, 5);
        const year = dayAddedDate.substring(6);
        const formattedDate = day + '-' + month + '-' + year;
  
        // Make a request to the server to add the card
        const response = await fetch('https://aqtas.ru/addBankCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numberCard: formattedCardNumber,
            validity: formattedDate,
            cvv,
            bankName: detectedCardType,
            userId: userData.userId,
            owner,
          }),
        });
  
        if (response.ok) {
          // Card successfully added
          setErrorMessage('');
          handleGoBack();
        } else {
          // Handle the error
          setErrorMessage('Ошибка при добавлении карты');
        }
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
                <Image resizeMode='contain' style={styles.cardImage} source={getCardImage()}/>
              </View>
            </View>
          </View>
          <View style={styles.fields}>
              <View style={[styles.field, { width: 160 }]}>
                  <Text style={styles.fieldTitle}>{t('validity-payment-field')}</Text>
                      <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <TextInput
                          keyboardType='numeric'
                          maxLength={5}
                          style={[styles.input, { width: 100, textAlign: 'center' }]}
                          placeholder={t('validity-payment-placeholder')}
                          onChangeText={(text) => {
                              formatExpirationDate(text);
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
            <TouchableOpacity style={styles.activAddCardButton} onPress={handleAddCard}>
                <Text style={styles.activeAddCardText}>{t('add-payment-button')}</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  };
  
  export default AddCardScreen;
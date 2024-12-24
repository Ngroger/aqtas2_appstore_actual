import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import styles from '../../../styles/AddBankCard';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { getUserData } from '../../../store/userDataManager';
import { useTranslation } from 'react-i18next';

function AddBankCard({ onClose }) {
  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState({})
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userData = await getUserData();
    if (userData) {
      setUserData(userData);
      // Выполните запрос к серверу для получения данных о финансах
      try {
        const response = await fetch(`https://aqtas.garcom.kz/api/bankCards/${userData.userId}`);
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
        }
      } catch (error) {
      }
    }
  };

  const handleGoBack = () => {
    onClose();
    navigation.navigate('AddCard');
  };

  function formatCardNumber(cardNumber) {
    const visibleDigits = 4; // Количество видимых цифр в каждой группе
    const separator = ' '; // Разделитель

    // Заменяем все символы, кроме цифр, на пустую строку
    const cleanNumber = cardNumber.toString().replace(/\D/g, '');

    // Разделяем номер на первые 12 символов и последние 4 символа
    const hiddenPart = '**** **** **** ' + cleanNumber.slice(-4);

    return hiddenPart;
  }

  return (
    <View style={styles.background}>
      <View style={styles.addCardContainer}>
        <View style={styles.cardTitle}>
          <Text style={styles.titleCard}>{t("payment-modal.title")}</Text>
          <TouchableOpacity onPress={handleClose}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleGoBack} style={styles.addCardButton}>
          <Image style={styles.visa} source={require('../../../img/visa.png')} />
          <Text style={styles.addCardButtonText}>{t("payment-modal.button")}</Text>
        </TouchableOpacity>
        {cards.length > 0 ? ( // Проверка наличия элементов в массиве finances
          <FlatList
            data={cards}
            keyExtractor={index => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                  <Image
                    style={styles.miniBankIcon}
                    source={
                      item.bankName === 'Visa'
                        ? require('../../../img/cards/visa.png')
                        : item.bankName === 'MasterCard'
                          ? require('../../../img/cards/mastercard.png')
                          : null // Здесь можно добавить иконку по умолчанию
                    }
                  />
                  <Text style={styles.number}>{formatCardNumber(item.number)}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noCard}>{t('payment-modal.no-cards')}</Text>
        )
        }
      </View>
    </View>
  );
}

export default AddBankCard;

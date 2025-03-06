import { Text, View, Modal, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from '../../../styles/PayoutStyle';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getUserData } from '../../../store/userDataManager';

function Payout({ modalVisible, onClose, fetchBalance }) {
  const { t } = useTranslation();
  const [amount, onChangeAmount] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpenCards, setIsOpenCards] = useState(false);
  const [isCardsLoad, setIsCardsLoad] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    number: '',
    card_id: ''
  })

  const MAX_AMOUNT = 1000000;
  const MIN_AMOUNT = 1;

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setIsCardsLoad(true);
      const userData = await getUserData();

      if (userData) {
        const response = await fetch(`https://aqtas.garcom.kz/api/bankCards/${userData.userId}`);

        const responseJson = await response.json();

        if (response.ok) {
          setCards(responseJson);
          setIsLoad(false);
        } else {
          setIsLoad(false);
        }
      }
    } catch (error) {
      console.log("fetch cards error: ", error);
    } finally {
      setIsLoad(false);
    }
  }

  const handleAmountChange = (text) => {
    let filteredText = text.replace(/[^0-9]/g, '');
    let numericValue = parseInt(filteredText, 10) || 0;

    onChangeAmount(numericValue.toString());
  };

  const isDisabled = !amount || parseInt(amount, 10) < MIN_AMOUNT || parseInt(amount, 10) > MAX_AMOUNT;

  const closeModal = () => {
    onChangeAmount();
    onClose();
    setIsLoad(false);
    setIsSuccess(false);
  }

  const payout = async () => {
    try {
      setIsLoad(true);
      const userData = await getUserData();

      if (userData) {
        const response = await fetch('https://aqtas.garcom.kz/api/payout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userData.userId,
            amount: amount,
            card_id: selectedCard.card_id,
          })
        });

        const responseJson = await response.json();

        console.log("responseJson: ", responseJson);

        if (responseJson.success) {
          setMessage();
          fetchBalance();
          setIsLoad(false);
          setIsSuccess(true);
          alert(t('payout-modal.success-msg'))
        } else {
          setMessage(responseJson.message);
          setIsLoad(false);
          setIsSuccess(false);
        }
      };
    } catch (error) {
      console.log('payout error: ', error);
    } finally {
      setIsLoad(false);
    }
  };

  function formatCardNumber(cardNumber) {
    // Заменяем все символы, кроме цифр, на пустую строку
    const cleanNumber = cardNumber.toString().replace(/\D/g, '');

    // Разделяем номер на первые 12 символов и последние 4 символа
    const hiddenPart = '**** **** **** ' + cleanNumber.slice(-4);

    return hiddenPart;
  };

  const selectCard = (item) => {
    setSelectedCard({
      number: formatCardNumber(item.number),
      card_id: item.id
    });
    setIsOpenCards(false);
  }

  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible}>
      <TouchableOpacity style={styles.closeBtn} onPress={closeModal} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{t("payout-modal.title")}</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder='0 тг'
            keyboardType='numeric'
            value={amount}
            onChangeText={handleAmountChange}
          />
        </View>
        <Text style={styles.text}>{t("payout-modal.card-title")}</Text>
        <View style={styles.selector}>
          <TouchableOpacity onPress={() => setIsOpenCards(!isOpenCards)} style={styles.selectorContainer}>
            <Text style={styles.selectedCard}>{selectedCard.number ? selectedCard.number : t('payout-modal.card-placeholder')}</Text>
            <View>
              <MaterialIcons name={isOpenCards ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={28} color="#141414" />
            </View>
          </TouchableOpacity>
          {isOpenCards && (
            <>
              {isLoad ? (
                <Text style={styles.loadTxt}>{t("payout-modal.load")}</Text>
              ) : (
                <>
                  {cards.length > 0 ? (
                    <ScrollView style={styles.dropMenu}>
                      {cards.map((item, index) => (
                        <TouchableOpacity onPress={() => selectCard(item)} key={index}>
                          <Text style={[styles.selectedCard, { opacity: 0.5, marginBottom: 6 }]}>
                            {formatCardNumber(item.number)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  ) : (
                    <Text style={styles.loadTxt}>{t("payout-modal.no-cards")}</Text>
                  )}
                </>
              )}
            </>
          )}
        </View>
        {message && <Text style={styles.error}>{t(`payout-modal.${message}`)}</Text>}
        {isSuccess ? (
          <TouchableOpacity onPress={closeModal} style={[styles.btn, { backgroundColor: '#59e327' }]}>
            <Text style={styles.btnText}>{t("payout-modal.success-btn")}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isDisabled}
            style={
              isDisabled ?
                [styles.btn, { opacity: 0.5 }] :
                styles.btn
            }
            onPress={() => payout()}
          >
            <Text style={styles.btnText}>
              {isLoad ? t("payout-modal.in-proccess") : t("payout-modal.confirm-btn")}
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.description}>
          {t("payout-modal.description")}
        </Text>
      </SafeAreaView>
    </Modal>
  );
};

export default Payout;

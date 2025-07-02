import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getUserData } from "../../../store/userDataManager";
import styles from "../../../styles/ModalOrderStyle";

function OrderModal({ modalVisible, onClose, orders, totalPrice, onBuy, cart, onClear }) {
   const insets = useSafeAreaInsets();
   const [userData, setUserData] = useState({});
   const [totalDelivery, setTotalDelivery] = useState(0);
   const [isLoad, setIsLoad] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [isFailure, setIsFailure] = useState(false);

   useEffect(() => {
      fetchUserData();
   }, []);

   const fetchUserData = async _ => {
      const userData = await getUserData();
      if (userData) {
         setUserData(userData)
         await fetchTotalDelivery();
      }
   };
   
   const handleMultiOrder = async () => {
      setIsLoad(true);
      setIsSuccess(false);
      setIsFailure(false);

      try {
         const selectedIds = Object.entries(orders)
            .filter(([_, isSelected]) => isSelected)
            .map(([id]) => parseInt(id));

         for (const id of selectedIds) {
            const product = cart.find(item => item.id === id); // id из корзины, НЕ productId
            if (product) {
               console.log("call onBuy: ", (
                  product.id,            // корзинный id
                  product.size,
                  product.customerId,    // sellerId — это именно он
                  product.productId      // вот это ID настоящего товара
               ));
               await onBuy(
                  product.id,
                  product.size,
                  product.customerId,
                  product.productId
               );
            }
         }

         onClear();
         setIsSuccess(true);
      } catch (error) {
         console.log("Multi order error: ", error);
         setIsFailure(true);
      } finally {
         setIsLoad(false);
      }
   };

   const fetchTotalDelivery = async _ => {
      try {
         const userId = userData.userId;
         if (userId) {
            const response = await fetch('https://aqtas.garcom.kz/api/delivery-price', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                  user_id: userId,
                  ids: Object.keys(orders).map(id => parseInt(id))
               })
            });

            const responseJson = await response.json();
            console.log("responseJson: ", responseJson);

            if (responseJson.success) {
               setTotalDelivery(responseJson.deliveryPrice);
            }
         }
      } catch (error) {
         console.log('Fetch Total Delivery');
      }
   };

   const handleClose = _ => {
      setIsFailure(false);
      setIsLoad(false);
      setIsSuccess(false);
      onClose();
   }

   const handleClick = _ => {
      if (isSuccess) handleClose()
      else handleMultiOrder();
   }

   const getBtnTxt = _ => {
      if (isSuccess) return 'Успех'
      else if (isFailure) return 'Произошла ошибка'
      else if (isLoad) return 'В процессе'
      else return 'Заказать'
   }

   const getBtnStyle = _ => {
      if (isSuccess) return "#61c427"
      else if (isFailure) return "#FF0000"
      else if (isLoad) return "#26CFFF"
      else return "#26CFFF"
   };


   return (
      <Modal
         transparent={true}
         animationType="fade"
         visible={modalVisible}
         backdropColor='transparent'
      >
         <TouchableOpacity style={styles.background} onPress={onClose} />
         <View style={[styles.container]}>
            <Text style={styles.title}>Оформление заказа</Text>
            <Text style={styles.info}>Имя: {userData?.fullname ? userData.fullname : 'Загрузка...'}</Text>
            <Text style={styles.info}>Адрес: {userData?.address ? userData.address : 'Загрузка...'}</Text>

            <Text style={styles.info}>Количество товаров: {Object.keys(orders).length}шт.</Text>
            <Text style={styles.info}>Доставка: {totalDelivery}тг</Text>
            <Text style={styles.info}>Цена: {totalPrice + totalDelivery}тг</Text>
            <TouchableOpacity 
               onPress={() => handleClick()}
               style={[styles.btn, { backgroundColor: getBtnStyle(), marginBottom: 0 }]}
            >
               <Text style={styles.btnTxt}>
                  {getBtnTxt()}
               </Text>
            </TouchableOpacity>
         </View>
      </Modal>
   )
};

export default OrderModal;
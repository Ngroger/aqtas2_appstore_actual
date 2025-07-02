import { useState, useEffect, useRef } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, Image, Animated, Keyboard, Easing } from 'react-native';
import styles from '../../../styles/ReturnProductStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

function ReturnProduct({ modalVisible, onClose, product_id }) {
   const insets = useSafeAreaInsets();
   const [reason, setReason] = useState('');
   const [isShowReason, setIsShowReason] = useState(false);
   const [comment, setComment] = useState('');
   const [images, setImages] = useState([]);
   const keyboardHeight = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
         Animated.timing(keyboardHeight, {
               toValue: e.endCoordinates.height,
               duration: 10,
               useNativeDriver: false,
               easing: Easing.out(Easing.poly(5))
         }).start();
      });
      const hideSub = Keyboard.addListener('keyboardDidHide', () => {
         Animated.timing(keyboardHeight, {
               toValue: 0,
               duration: 10,
               useNativeDriver: false,
               easing: Easing.out(Easing.poly(5))
         }).start();
      });

      return () => {
         showSub.remove();
         hideSub.remove();
      };
   }, []);

   const reasons = [
      'Брак/повреждение',
      'Не подошёл размер',
      'Получен не тот товар',
      'Другое'
   ];

   const pickImage = async () => {
      const result = await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         quality: 0.7,
      });
      if (!result.canceled && result.assets) {
         setImages([...images, result.assets[0].uri]);
      }
   };

   return (
      <Modal 
         visible={modalVisible}
         transparent={true}
         statusBarTranslucent={true}
         animationType='fade'
      >
         <TouchableOpacity style={styles.goBack} onPress={onClose} />
         <Animated.View style={[styles.container, { paddingBottom: keyboardHeight }]}>
            <Text style={styles.title}>Возврат товара</Text>

            <Text style={styles.label}>Причина возврата</Text>
            <TouchableOpacity onPress={() => setIsShowReason(!isShowReason)} style={styles.dropdownToggle}>
               <Text style={styles.dropdownText}>{reason || 'Выберите причину'}</Text>
               <Feather name={isShowReason ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
            </TouchableOpacity>
            {isShowReason && (
               <View style={styles.dropdownList}>
                  {reasons.map((item, index) => (
                     <TouchableOpacity key={index} onPress={() => {
                        setReason(item);
                        setIsShowReason(false);
                     }} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}>{item}</Text>
                     </TouchableOpacity>
                  ))}
               </View>
            )}

            <Text style={styles.label}>Комментарий</Text>
            <TextInput
               style={styles.input}
               placeholder="Напишите комментарий..."
               value={comment}
               textAlignVertical='top'
               onChangeText={setComment}
               multiline
            />

            <Text style={styles.label}>Фотографии (до 3)</Text>
            <View style={styles.imagesRow}>
               {images.map((uri, idx) => (
                  <Image key={idx} source={{ uri }} style={styles.imagePreview} />
               ))}
               {images.length < 3 && (
                  <TouchableOpacity onPress={pickImage} style={styles.addPhotoBtn}>
                     <Feather name="camera" size={24} color="#555" />
                  </TouchableOpacity>
               )}
            </View>

            <TouchableOpacity style={[styles.submitBtn, { marginBottom: insets.bottom + 10 }]}>
               <Text style={styles.submitText}>Отправить</Text>
            </TouchableOpacity>
         </Animated.View>
      </Modal>
   );
};

export default ReturnProduct;
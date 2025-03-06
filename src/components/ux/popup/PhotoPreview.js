import { Modal, View, TouchableOpacity, Image } from 'react-native';
import styles from '../../../styles/PhotoPreviewStyle';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import { useRef, useState } from 'react';

function PhotoPreview({ onClose, modalVisible, product }) {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Формируем массив изображений
  const images = Object.keys(product)
    .filter(key => key.startsWith('imagePreview') && product[key])
    .map(key => `https://aqtas.garcom.kz/api/images/imageProducts/${product[key]}`);


  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType='fade'
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.goBackBtn}>
          <AntDesign name="close" size={38} color="#95E5FF" />
        </TouchableOpacity>
        <View style={{ height: '75%' }}>
          <Swiper
            ref={sliderRef}
            style={styles.wrapper}
            showsPagination={false}
            loop={false}
            onIndexChanged={index => setActiveSlide(index)}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.slide}
              />
            ))}
          </Swiper>
        </View>
        <View style={styles.photoContainer}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => sliderRef.current?.scrollBy(index - activeSlide, true)}>
              <Image
                source={{ uri: image }}
                style={[styles.photo, activeSlide === index ? { opacity: 0.5 } : {}]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <StatusBar translucent={true} backgroundColor='transparent' />
    </Modal>
  );
};

export default PhotoPreview;

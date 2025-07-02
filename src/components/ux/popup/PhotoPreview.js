import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import styles from '../../../styles/PhotoPreviewStyle';


function PhotoPreview({ onClose, modalVisible, product }) {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [images, setImages] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (product && modalVisible) {
      const imgs = Object.keys(product)
        .filter(key => key.startsWith('imagePreview') && product[key])
        .map(key => `https://aqtas.garcom.kz/api/images/imageProducts/${product[key]}`);
      setImages(imgs);
    }
  }, [product, modalVisible]);

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType='fade'
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.goBackBtn}>
          <AntDesign name="close" size={38} color="#26CFFF" />
        </TouchableOpacity>

        <View style={{ height: '75%' }}>
          {images.length > 0 && (
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
          )}
        </View>

        <View style={[styles.photoContainer, { marginBottom: insets.bottom }]}>
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

      <StatusBar style='dark' />
    </Modal>
  );
};

export default PhotoPreview;
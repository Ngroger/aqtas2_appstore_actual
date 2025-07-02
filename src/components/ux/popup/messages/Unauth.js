import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../../styles/UnauthStyle';

function Unauth({ modalVisible, onClose, description, title }) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToRegistration = () => {
    onClose();
    navigation.navigate('RegistrationScreen')
  };


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      <BlurView experimentalBlurMethod='dimezisBlurView' tint='dark' intensity={10} style={styles.blurBackground} />
      <View style={styles.containerBackground}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>
            {description}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>{t("unauth-modal.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToRegistration()} style={styles.button}>
              <Text style={styles.buttonText}>{t("unauth-modal.registration")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style='dark' />
    </Modal>
  )
};

export default Unauth;

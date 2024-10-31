import { Text, View, Modal, TouchableOpacity } from 'react-native';
import styles from '../../../styles/WebViewModalStyles';
import WebView from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';

function WebViewModal({ modalVisible, onClose }) {
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      animationType='slide'
      visible={modalVisible}
    >
      <TouchableOpacity onPress={onClose} style={styles.closeModal}>
        <AntDesign name='close' color='#FFF' size={24} />
      </TouchableOpacity>
      <WebView
        style={styles.container}
        source={{ uri: 'https://google.com' }}
      />
    </Modal>
  )
};

export default WebViewModal;
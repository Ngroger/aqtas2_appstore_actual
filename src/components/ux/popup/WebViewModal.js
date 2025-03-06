import { Modal, TouchableOpacity } from 'react-native';
import styles from '../../../styles/WebViewModalStyles';
import WebView from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function WebViewModal({ modalVisible, onClose, url, type }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleClose = _ => {
    navigation.navigate(t("main-name-bottom-tab"));
    onClose();
  }
  const hideHeaderScript = `
  (function() {
    const hideHeader = () => {
      const header = document.querySelector('.m-header');
      if (header) {
        header.style.display = 'none';
      }

      const content = document.querySelector('.acquiring-content');
      if (content) {
        content.style.display = 'flex';
        content.style.justifyContent = 'center';
        content.style.alignItems = 'center';
      }
    };

    // Первичная проверка
    hideHeader();

    // Наблюдение за изменениями в DOM
    const observer = new MutationObserver(() => hideHeader());
    observer.observe(document.body, { childList: true, subtree: true });
  })();
  true;
`;


  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      animationType='fade'
      visible={modalVisible}
    >
      <TouchableOpacity onPress={handleClose} style={styles.closeModal}>
        <AntDesign name='close' color='#FFF' size={24} />
      </TouchableOpacity>

      <WebView
        style={styles.container}
        source={{ uri: url }}
        injectedJavaScript={hideHeaderScript}
        onLoadEnd={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          if (!nativeEvent.loading) {
            console.log('WebView loaded, header should be hidden.');
          }
        }}
      />
    </Modal>
  );
};

export default WebViewModal;

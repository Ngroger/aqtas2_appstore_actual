import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../../../styles/LanguageSelectorStyle';
import { useTranslation } from 'react-i18next';
import i18next from '../../../i18next';
import { saveLanguage } from '../../../store/languageStorage';

function LanguageSelector({ modalVisible, onClose }) {
   const insets = useSafeAreaInsets();
   const {t} = useTranslation();

   const selectLanguage = async (lang) => {
      await i18next.changeLanguage(lang);
      await saveLanguage(lang);
   };

   return (
      <Modal
         transparent={true}
         visible={modalVisible}
         statusBarTranslucent={true}
         animationType='fade'
      >
         <TouchableOpacity onPress={onClose} style={styles.background} />
         <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <Text style={styles.title}>{t("select-language-modal.title")}</Text>
            <View style={styles.language}>
               <Text style={styles.langTxt}>{t("russian-language")}</Text>
               <TouchableOpacity onPress={_ => selectLanguage('ru')} style={styles.selector}>
                  { i18next.language === 'ru' && <View style={styles.dot}/> }
               </TouchableOpacity>
            </View>
            <View style={styles.language}>
               <Text style={styles.langTxt}>{t("kaz-language")}</Text>
               <TouchableOpacity onPress={_ => selectLanguage('kz')} style={styles.selector}>
                  { i18next.language === 'kz' && <View style={styles.dot}/> }
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   )
};

export default LanguageSelector;
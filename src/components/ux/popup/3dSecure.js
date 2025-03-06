import { Modal, View, TouchableOpacity, Text, TextInput } from 'react-native';
import styles from '../../../styles/3dSecureModalStyle';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

function SecureModal({ data, onClose, modalVisible, transactionId, amount }) {
  const [paReq, onChangePaReq] = useState();



  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType='fade'
      statusBarTranslucent={true}
    >
      <TouchableOpacity onPress={onClose} style={styles.goBackBtn}>
        <AntDesign name="close" size={38} color="#95E5FF" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Подтверждение 3-D Secure</Text>
          <Text style={styles.description}>Введите полученный в банке код для подтверждения транзакции</Text>
        </View>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            value={paReq}
            onChangeText={(text) => onChangePaReq(text)}
            placeholder='Введите 3-D Secure код'
          />
        </View>
        <TouchableOpacity style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>Отправить</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
};

export default SecureModal
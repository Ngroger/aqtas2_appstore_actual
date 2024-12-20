import React, { createContext, useState, useContext } from 'react';
import Unauth from '../components/ux/popup/messages/Unauth';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const UnauthContext = createContext();

export const UnauthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    description: '',
  });
  const { t } = useTranslation();

  const openModal = (title, description) => {
    setModalContent({ title, description });
    setModalVisible(true);
  };

  const closeModal = () => {
    navigation.navigate(t('main-name-bottom-tab'));
    setModalVisible(false);
    setModalContent({ title: '', description: '' });
  };

  return (
    <UnauthContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Unauth
        modalVisible={modalVisible}
        onClose={closeModal}
        title={modalContent.title}
        description={modalContent.description}
      />
    </UnauthContext.Provider>
  );
};

export const useUnauth = () => useContext(UnauthContext);

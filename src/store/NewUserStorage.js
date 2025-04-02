import AsyncStorage from '@react-native-async-storage/async-storage';

const NEW_USER_STORAGE = 'newUser';

/**
 * Получить состояние isNewUser
 * @returns {Promise<boolean>} - Возвращает true, если пользователь новый, иначе false.
 */
export const getIsNewUser = async () => {
  try {
    const value = await AsyncStorage.getItem(NEW_USER_STORAGE);
    return value === null ? true : JSON.parse(value);
  } catch (error) {
    console.log('Ошибка при получении состояния isNewUser:', error);
    return true; // По умолчанию считаем пользователя новым
  }
};

/**
 * Переключить состояние isNewUser
 * @param {boolean} newValue - Новое значение для isNewUser.
 * @returns {Promise<void>}
 */
export const toggleIsNewUser = async (newValue) => {
  try {
    await AsyncStorage.setItem(NEW_USER_STORAGE, JSON.stringify(newValue));
  } catch (error) {
    console.log('Ошибка при переключении состояния isNewUser:', error);
  }
};

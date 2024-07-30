import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from '../i18next';

// Сохранение выбранного языка
export const saveLanguage = async (language) => {
    try {
        await AsyncStorage.setItem('language', language);
    } catch (error) {
    }
};

// Загрузка выбранного языка
export const loadLanguage = async () => {
    try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
            i18next.language = storedLanguage;
            await i18next.changeLanguage(storedLanguage); // Добавь эту строку
        }
    } catch (error) {
    }
};
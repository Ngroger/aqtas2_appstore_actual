import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '';

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token;
    } catch (error) {
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
    }
};

export const hasToken = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if(token !== null) {
            return true; // Возвращаем true только в случае, если токен есть
        } else {
            return false; // Возвращаем false, если токена нет
        }
    } catch (error) {
        return false; // Возвращаем false в случае ошибки
    }
};
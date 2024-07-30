import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = 'userData';

// Функция для сохранения данных пользователя в локальном хранилище
export const storeUserData = async (userData) => {
    try {
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
    }
};

    // Функция для получения данных пользователя из локального хранилища
export const getUserData = async () => {
    try {
        const userDataJSON = await AsyncStorage.getItem(USER_DATA_KEY);
        if (userDataJSON) {
        return JSON.parse(userDataJSON);
        } else {
        return null;
        }
    } catch (error) {
        return null;
    }
};

    // Функция для удаления данных пользователя из локального хранилища
export const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
    }
};

export const updateUserData = async (updatedData) => {
    try {
        const userDataJSON = await AsyncStorage.getItem(USER_DATA_KEY);
        if (userDataJSON) {
            const userData = JSON.parse(userDataJSON);
            const updatedUserData = { ...userData, ...updatedData };
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUserData));
            return updatedUserData;
        }
        return null;
    } catch (error) {
        return null;
    }
};

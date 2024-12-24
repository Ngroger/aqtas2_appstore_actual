import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import axios from 'axios'; // Импортируем Axios

function Test() {
    const [backendData, setBackendData] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://aqtas.garcom.kz/api/hello") // Используем Axios для GET-запроса
            .then(response => {
                setBackendData(response.data);
            })
            .catch(error => {
                setError(error); // Обрабатываем ошибку
            });
    }, []);

    return (
        <View>
            {error ? (
                <Text>Error: {error.message}</Text>
            ) : (
                <Text>{backendData}</Text>
            )}
        </View>
    )
};

export default Test;
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../../../styles/SizeSelectorStyles';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getUserData } from '../../../store/userDataManager';

function SizeSelector({ onClose, id, productData }) {
    const [sizes, setSizes] = useState([]);
    const [userData, setUserData] = useState({});

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const addCart = (size) => {
        // Определим параметры для добавления товара в корзину
        const cartItem = {
            name: productData.name,
            oldCost: productData.oldCost,
            newCost: productData.cost,
            description: productData.description,
            brend: productData.brend,
            costumer: productData.costumer,  // Получаем UserId из userData
            imagePreview: productData.imagePreview1,  // По умолчанию используем imagePreview1,
            UserID: userData.userId,
            count: 1,  // Устанавливаем значение по умолчанию в 1
            size: size
        };
        // Отправляем POST-запрос к серверу
        fetch('https://aqtas.ru/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItem),
        })
        .then((response) => response.json())
        .then((data) => {
        })
        .catch((error) => {
        });
    }

    useEffect(() => {
        loadUserData();
        try {
            fetch(`https://aqtas.ru/sizes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                // Создаем массив непустых размеров
                const nonNullSizes = [];
    
                // Перебираем все размеры в первой записи (может быть несколько, в зависимости от структуры базы данных)
                for (const key in data[0]) {
                    if (key.startsWith('size') && data[0][key] !== null) {
                        nonNullSizes.push(data[0][key]);
                    }
                }
    
                // Устанавливаем непустые размеры в состояние sizes
                setSizes(nonNullSizes);
            })
            .catch((error) => {
            });
        } catch (error) {
        }
    }, []);

    const loadUserData = async () => {
        const userData = await getUserData();
        if (userData) {
            setUserData(userData);
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name='close' color='#000' size={24}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Выберите размер</Text>
                </View>
                <View style={styles.sizeContainer}>
                    {sizes.map((size, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.size}
                            onPress={() => addCart(size)}
                        >
                            <Text style={styles.sizeText}>{size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    )
};

export default SizeSelector;
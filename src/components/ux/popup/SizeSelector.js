import { View, TouchableOpacity, Text, Alert } from 'react-native';
import styles from '../../../styles/SizeSelectorStyles';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getUserData } from '../../../store/userDataManager';
import { useTranslation } from 'react-i18next';

function SizeSelector({ onClose, id, productData }) {
    const [sizes, setSizes] = useState([]);
    const [userData, setUserData] = useState({});
    const { t } = useTranslation();
    const [entity, setEntity] = useState(null);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const addCart = async (size) => {
        // Определим параметры для добавления товара в корзину
        try {
            console.log("productData: ", productData);
            const cartItem = {
                name: productData.name,
                oldCost: productData.oldCost,
                newCost: productData.cost,
                description: productData.description,
                brend: productData.brend,
                costumer: productData.costumer,
                imagePreview: productData.imagePreview1,
                UserID: userData.userId,
                count: 1,
                size: size,
                customerId: productData.CustomerId,
                productId: productData.id
            };

            const resposne = await fetch('https://aqtas.garcom.kz/api/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            });

            const responseJson = await resposne.json();

            console.log("responseJson: ", responseJson);

            if (responseJson.success) {
                Alert.alert(`${t("message-title")}`, `${t("product-success")}`);
                onClose();
            } else {
                if (responseJson.error === 'Этот товар уже есть в корзине') {
                    Alert.alert(`${t("title-no-card-message")}`, `${t("product-exist-in-cart")}`);
                    onClose();
                }
            }

        } catch (error) {
            console.log('add cart error: ', error);
        };
    }

    useEffect(() => {
        loadUserData();

        fetch(`https://aqtas.garcom.kz/api/sizes/${id}`)
            .then((response) => response.json())
            .then((data) => {
            const nonNullSizes = [];

            // Достаём объект sizes
            const sizeData = data.sizes;

            console.log("sizeData: ", sizeData);

            for (const key in sizeData) {
                if (key.startsWith('size') && sizeData[key] !== null) {
                nonNullSizes.push(sizeData[key]);
                }
            }
                console.log("nonNullSizes: ", nonNullSizes);
                setSizes(nonNullSizes);
                setEntity(data.entity);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке размеров:", error);
            });
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
                        <AntDesign name='close' color='#000' size={24} />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Text style={styles.title}>Выберите размер</Text>
                        <Text style={[styles.title, { opacity: 0.5, fontSize: 18 }]}>{entity}</Text>
                    </View>
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
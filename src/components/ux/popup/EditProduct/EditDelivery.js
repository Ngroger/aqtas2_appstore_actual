import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../../../styles/EditDeliveryStyles";
import { AntDesign } from '@expo/vector-icons';

function EditDelivery({ onClose, onDeliverySelect }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleDeliverySelect = (selectedCategory) => {
        onDeliverySelect(selectedCategory);
        if (onClose) {
            onClose();
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Изменить доставку</Text>
                </View>
                <TouchableOpacity onPress={() => { handleDeliverySelect('Нет доставки') }} style={styles.button}>
                    <Text style={styles.buttonText}>Нет доставки</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity onPress={() => { handleDeliverySelect('Маркетплейс') }} style={styles.button}>
                    <Text style={styles.buttonText}>Маркетплейс</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default EditDelivery
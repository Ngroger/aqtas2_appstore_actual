import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../../styles/SelectSeasonStyle";
import { AntDesign } from '@expo/vector-icons'; 

function SelectSeason({ onClose, onSeasonSelect }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleCategorySelect = (selectedSeason) => {
        onSeasonSelect(selectedSeason);
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
                    <Text style={styles.title}>Выберите сезон</Text>
                </View>
                <TouchableOpacity onPress={() => handleCategorySelect('Зима')} style={styles.button}>
                    <Text style={styles.buttonText}>Зима</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Весна')} style={styles.button}>
                    <Text style={styles.buttonText}>Весна</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Лето')} style={styles.button}>
                    <Text style={styles.buttonText}>Лето</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Осень')} style={styles.button}>
                    <Text style={styles.buttonText}>Осень</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default SelectSeason
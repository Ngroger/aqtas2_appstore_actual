import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../../../styles/EditCategoryStyle";
import { AntDesign } from '@expo/vector-icons'; 

function EditCategory({ onClose, onCategorySelect  }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleCategorySelect = (selectedCategory) => {
        onCategorySelect(selectedCategory);
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
                    <Text style={styles.title}>Изменить категорию</Text>
                </View>
                <TouchableOpacity onPress={() => handleCategorySelect('Женское')} style={styles.button}>
                    <Text style={styles.buttonText}>Женское</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Мужское')} style={styles.button}>
                    <Text style={styles.buttonText}>Мужское</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Техника')} style={styles.button}>
                    <Text style={styles.buttonText}>Техника</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Акксесуары')} style={styles.button}>
                    <Text style={styles.buttonText}>Акксесуары</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Дом')} style={styles.button}>
                    <Text style={styles.buttonText}>Дом</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Детское')} style={styles.button}>
                    <Text style={styles.buttonText}>Детское</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Спорт')} style={styles.button}>
                    <Text style={styles.buttonText}>Спорт</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Игрушки')} style={styles.button}>
                    <Text style={styles.buttonText}>Игрушки</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default EditCategory
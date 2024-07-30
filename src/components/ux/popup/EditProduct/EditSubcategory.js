import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../../../styles/EditCategoryStyle";
import { AntDesign } from '@expo/vector-icons'; 

function EditSubcategory({ onClose, onSubcategorySelect  }) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleSubcategorySelect = (selectedCategory) => {
        onSubcategorySelect(selectedCategory);
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
                <TouchableOpacity onPress={() => handleSubcategorySelect('Развес')} style={styles.button}>
                    <Text style={styles.buttonText}>На развес</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubcategorySelect('Одежда')} style={styles.button}>
                    <Text style={styles.buttonText}>Одежда</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubcategorySelect('Штучно')} style={styles.button}>
                    <Text style={styles.buttonText}>По штучно</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default EditSubcategory
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../../styles/EditCategoryStyle";

function ChangeColor({ onClose, onColorSelect }) {
    const [isSelectedColor, setSelectedColor] = useState(false)
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleColorSelect = (selectedColor) => {
        onColorSelect(selectedColor);
        if (onClose) {
            onClose();
        }
    };

    const toggleSectedColor = () => {
        setSelectedColor(!isSelectedColor)
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Изменить цвет</Text>
                </View>
                <View style={styles.colorsContainer}>
                    <TouchableOpacity onPress={() => handleColorSelect('Красный')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#FF0000' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorSelect('Оранжевый')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#FFA500' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorSelect('Желтый')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#FFFF00' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorSelect('Зеленый')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#008000' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorSelect('Синий')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#0000FF' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                </View>
                <View style={styles.colorsContainer}>
                    <TouchableOpacity onPress={() => handleColorSelect('Голубой')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#26CFFF' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorSelect('Фиолетовый')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#800080' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorSelect('Черный')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#000' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorSelect('Серый')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#BDBDBD' }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorSelect('Белый')} style={styles.colorContainer}>
                        <View style={[styles.color, { backgroundColor: '#fff', borderWidth: 1 }]} />
                        {isSelectedColor ? (
                            <>
                                <View style={styles.filter}>
                                    <View style={styles.dot} />
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default ChangeColor
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import styles from "../../../../styles/EditCategoryStyle";
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import i18next from "../../../../i18next";

function EditCategory({ onClose, onCategorySelect }) {
    const [categories, setCategories] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [lang, setLang] = useState(i18next.language);

    const handleClose = () => {
        if (onClose) onClose();
    };

    const handleCategorySelect = (selectedCategory, id) => {
        onCategorySelect(selectedCategory, id);
        if (onClose) onClose();
    };

    const fetchCategories = async () => {
        try {
            setIsLoad(true);
            const response = await fetch('https://aqtas.garcom.kz/api/categories');
            const result = await response.json();

            if (result.success) {
                setCategories(result.categories);
            }
        } catch (error) {
            console.log('Fetch Categories Error:', error);
        } finally {
            setIsLoad(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Изменить категорию</Text>
                </View>

                {isLoad ? (
                    <ActivityIndicator style={{ marginVertical: 24 }} size={24} color='#26CFFF' />
                ) : (
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                        {categories.map((category, index) => (
                            <TouchableOpacity 
                                key={index}
                                onPress={() => handleCategorySelect(category.name_ru, category.id)}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                    {lang === 'kz' ? category.name_kz : category.name_ru}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

export default EditCategory;

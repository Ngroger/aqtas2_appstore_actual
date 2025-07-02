import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import styles from "../../../../styles/EditCategoryStyle";
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import i18next from "../../../../i18next";

function EditSubcategory({ id, onClose, onSubcategorySelect }) {
    const [subcategories, setSubcategories] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [lang, setLang] = useState(i18next.language);

    const handleClose = () => {
        if (onClose) onClose();
    };

    const handleSubcategorySelect = (selectedSubcategory) => {
        onSubcategorySelect(selectedSubcategory);
        if (onClose) onClose();
    };

    const fetchSubcategories = async () => {
        try {
            setIsLoad(true);
            const response = await fetch(`https://aqtas.garcom.kz/api/subcategories/${id}`);
            const result = await response.json();

            if (result.success) {
                setSubcategories(result.subcategories);
            }
        } catch (error) {
            console.log('Fetch Subcategories Error:', error);
        } finally {
            setIsLoad(false);
        }
    };

    useEffect(() => {
        fetchSubcategories();
    }, [id]);

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Изменить подкатегорию</Text>
                </View>

                {isLoad ? (
                    <ActivityIndicator style={{ marginVertical: 24 }} size={24} color='#26CFFF' />
                ) : subcategories.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginVertical: 24, color: '#888', fontFamily: 'Cambria', fontSize: 18 }}>Подкатегорий не найдено</Text>
                ) : (
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                        {subcategories.map((sub, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSubcategorySelect(sub.name_ru)}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                    {lang === 'kz' ? sub.name_kz : sub.name_ru}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

export default EditSubcategory;

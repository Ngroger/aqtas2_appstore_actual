import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useCategories } from '../../context/CategoriesProvider';
import styles from '../../styles/CaregoriesScreenStyle';
import { useEffect, useState } from 'react';
import i18next from '../../i18next';
import { MaterialIcons } from '@expo/vector-icons';

const CategoriesScreen = () => {
    const { t } = useTranslation();
    const { selectCategoryContext, selectSubcategoryContext } = useCategories();
    const navigation = useNavigation();
    const [isLoad, setIsLoad] = useState(true);
    const [lang, setLang] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setIsLoad(true);
            const language = i18next.language;
            if (language) {
                setLang(language);
                const response = await fetch('https://aqtas.garcom.kz/api/categories');
                const data = await response.json();
                if (data.success) {
                    setCategories(data.categories);
                }
            }
        } catch (error) {
            console.log('Ошибка загрузки категорий:', error);
        } finally {
            setIsLoad(false);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        try {
            setIsLoad(true);
            const response = await fetch(`https://aqtas.garcom.kz/api/subcategories/${categoryId}`);
            const data = await response.json();
            if (data.success) {
                setSubcategories(data.subcategories);
                setSelectedCategoryId(categoryId);
            }
        } catch (error) {
            console.log('Ошибка загрузки подкатегорий:', error);
        } finally {
            setIsLoad(false);
        }
    };

    
    const selectCategory = (category) => {
        console.log("category: ", category);
        selectCategoryContext(category.name_ru);
        fetchSubcategories(category.id)
    }
    
    const handleSubcategorySelect = (subcategory) => {
        console.log("subcategory: ", subcategory);
        selectSubcategoryContext(subcategory.name_ru);
        navigation.navigate(t('main-name-bottom-tab'));
    };

    const handleGoBack = () => {
        setSelectedCategoryId(null);
        setSubcategories([]);
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoad ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.loadTxt}>Это может занять немного времени</Text>
                </View>
            ) : (
                <ScrollView>
                    {selectedCategoryId !== null && (
                        <TouchableOpacity style={[styles.titleContainer, { marginTop: 38 }]} onPress={handleGoBack}>
                            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                            <Text style={styles.title}>Назад к категориям</Text>
                        </TouchableOpacity>
                    )}
                    {selectedCategoryId === null ? (
                        <View style={styles.containerCategories}>
                            {categories.map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.categoryButton}
                                    onPress={() => selectCategory(category)}
                                >
                                    <View style={styles.category}>
                                        <Image
                                            style={styles.categoryImage}
                                            source={{ uri: `https://aqtas.garcom.kz/api/categories/${category.photo_url}` }}
                                        />
                                        <Text style={styles.categoryText}>
                                            {lang === 'ru' ? category.name_ru : category.name_kz}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.containerSubcategories}>
                            {subcategories.map((subcategory, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleSubcategorySelect(subcategory)}
                                    style={styles.subcategory}
                                >
                                    <Text style={styles.subcategoryTxt}>
                                        {lang === 'ru' ? subcategory.name_ru : subcategory.name_kz}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default CategoriesScreen;

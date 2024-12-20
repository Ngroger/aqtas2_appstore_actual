import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/CaregoriesScreenStyle';
import { useTranslation } from 'react-i18next';
import { useCategories } from '../../context/CategoriesProvider';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../../categories';

const CategoriesScreen = () => {
    const { t } = useTranslation();
    const { selectCategoryContext } = useCategories();
    const navigation = useNavigation();

    const setCategory = (category) => {
        console.log("setCategory: ", category)
        selectCategoryContext(category);
        navigation.navigate(t('main-name-bottom-tab'));
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerCategories}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.categoryButton}
                        onPress={() => setCategory(category.value)}
                    >
                        <View style={styles.category}>
                            <Image style={styles.categoryImage} source={category.image} />
                            <Text style={styles.categoryText}>{t(`${category.label}`)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default CategoriesScreen;

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { categories } from '../../categories';
import { useCategories } from '../../context/CategoriesProvider';
import styles from '../../styles/CaregoriesScreenStyle';

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
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    );
};

export default CategoriesScreen;

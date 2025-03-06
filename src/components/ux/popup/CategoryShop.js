import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import styles from '../../../styles/CategoryShopStyles';

function CategoryShop({ onClose, onCategorySelect }) {
    const { t } = useTranslation();

    const handleCategorySelect = (selectedCategory) => {
        onCategorySelect(selectedCategory);
        onClose();
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('all-categories-of-shops')}</Text>
                </View>
                <TouchableOpacity onPress={() => handleCategorySelect('ТРЦ')} style={styles.button}>
                    <Text style={styles.buttonText}>{t('shopping-center-filter')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Магазины')} style={styles.button}>
                    <Text style={styles.buttonText}>{t('shops-filter')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Базары')} style={styles.button}>
                    <Text style={styles.buttonText}>{t('bazaars-filter')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Барахолка')} style={styles.button}>
                    <Text style={styles.buttonText}>{t('flea-markets-filter')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategorySelect('Рынки')} style={styles.button}>
                    <Text style={styles.buttonText}>{t('markets-filter')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default CategoryShop
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import styles from '../../../styles/CategoryShopStyles';

function CategoryShop({ onClose, onCategorySelect }) {
    const { t } = useTranslation();

    const categories = [
        { id: 1, value: 'Магазины', name: t('shops-filter') },
        { id: 2, value: 'Официальные магазины брендов', name: t('official-brand-shops-filter') },
        { id: 3, value: 'Интернет-магазины', name: t('online-shops-filter') },
        { id: 4, value: 'Магазины производителей', name: t('manufacturer-shops-filter') },
        { id: 5, value: 'Магазины из Китая', name: t('chinese-shops-filter') },
        { id: 6, value: 'Специализированные магазины', name: t('specialized-shops-filter') },
        { id: 7, value: 'Магазины электроники', name: t('electronics-shops-filter') },
        { id: 8, value: 'Магазины одежды и обуви', name: t('clothing-shoes-shops-filter') },
        { id: 9, value: 'Магазины косметики и парфюмерии', name: t('cosmetics-shops-filter') },
        { id: 10, value: 'Магазины товаров для дома', name: t('home-goods-shops-filter') },
        { id: 11, value: 'Магазины спортивных товаров', name: t('sports-shops-filter') },
        { id: 12, value: 'Магазины игрушек', name: t('toy-shops-filter') },
        { id: 13, value: 'Антикварные магазины', name: t('antique-shops-filter') },
        { id: 14, value: 'Секонд-хенды', name: t('secondhand-shops-filter') },
        { id: 15, value: 'Эко-магазины', name: t('eco-shops-filter') },
        { id: 16, value: 'Магазины для животных', name: t('pet-shops-filter') },
        { id: 17, value: 'Книжные магазины', name: t('book-shops-filter') },
        { id: 18, value: 'Магазины подарков и сувениров', name: t('gift-shops-filter') },
        { id: 19, value: 'Оптовые магазины', name: t('wholesale-shops-filter') },
    ];

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
                { categories.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCategorySelect(item.value)} style={styles.button}>
                        <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                )) }
            </View>
        </View>
    )
};

export default CategoryShop
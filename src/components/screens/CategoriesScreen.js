import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/CaregoriesScreenStyle';
import { useTranslation } from 'react-i18next';

import { EvilIcons } from '@expo/vector-icons'
import { useState } from 'react';
import SelectedCategory from '../ux/popup/SelectedCategory';

const CategoriesScreen = ({ handleSelectedCategory }) => {
    const { t } = useTranslation();

    const categories = [
        { name: 'Спорт', label: t('sport-category'), image: require('../../img/categories/sport.png') },
        { name: 'Женское', label: t('woman-category'), image: require('../../img/categories/women.png') },
        { name: 'Мужское', label: t('men-category'), image: require('../../img/categories/men.png') },
        { name: 'Детское', label: t('child-category'), image: require('../../img/categories/children.png') },
        { name: 'Дом', label: t('home-category'), image: require('../../img/categories/home.png') },
        { name: 'Косметика', label: t('make-up-category'), image: require('../../img/categories/makeup.png') },
        { name: 'Акксесуары', label: t('accessories-category'), image: require('../../img/categories/acc.png') },
        { name: 'Техника', label: t('tech-category'), image: require('../../img/categories/tech.png') },
        { name: 'Игрушки', label: t('toys-category'), image: require('../../img/categories/toys.png') }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.containerCategories}>
                {categories.map(category => (
                    <TouchableOpacity
                        key={category.name}
                        style={styles.categoryButton}
                        onPress={() => handleSelectedCategory(category.name, category.label)}
                    >
                        <View style={styles.category}>
                            <Image style={styles.categoryImage} source={category.image} />
                            <Text style={styles.categoryText}>{category.label}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
export default CategoriesScreen;
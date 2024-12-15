import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import styles from "../../styles/RegistrationScreenStyle";
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import i18next from "../../i18next";
import { loadLanguage, saveLanguage } from "../../store/languageStorage";
import { s } from "react-native-size-matters";

function SelectLanguage(props) {
    const [language, setLanguage] = useState('Русский');
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        // Загрузка текущего языка при монтировании компонента
        loadCurrentLanguage();
    }, []);

    const toggleAccordion = () => {
        setIsOpen(prevState => !prevState);
    }

    const changeLanguage = async (value, name) => {
        setLanguage(name);
        setIsOpen(false);
        await i18next.changeLanguage(value);
        await saveLanguage(value);
    }

    const loadCurrentLanguage = async () => {
        // Загрузка текущего языка из AsyncStorage
        const selectedLanguage = await loadLanguage();
        if (selectedLanguage) {
            setLanguage(selectedLanguage === 'ru' ? 'Русский' : 'Қазақ тілі');
            i18next.changeLanguage(selectedLanguage);
        }
    }

    const navigateToNextStep = () => {
        if (props.onNextStep) {
            props.onNextStep();
        }
    }

    const accordionStyle = isOpen
        ? [styles.accordion, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]
        : styles.accordion;

    return (
        <View style={{ width: '100%', alignSelf: 'center' }}>
            <Text style={styles.title}>{t('change-language')}</Text>
            <View style={accordionStyle}>
                <Text style={styles.language}>{language}</Text>
                <TouchableOpacity onPress={toggleAccordion}>
                    <MaterialIcons
                        name={isOpen ? "arrow-drop-up" : "arrow-drop-down"}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            {isOpen && (
                <View style={styles.openAccordion}>
                    <TouchableOpacity onPress={() => changeLanguage('ru', `Русский язык`)}>
                        <Text style={[styles.language, { fontSize: s(20) }]}>{t('russian-language')}</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => changeLanguage('kz', `Қазақ тілі`)}>
                        <Text style={[styles.language, { fontSize: s(20) }]}>{t('kaz-language')}</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={{ justifyContent: 'flex-end', marginTop: 12 }}>
                <TouchableOpacity onPress={navigateToNextStep} style={styles.nextButton}>
                    <Text style={styles.nextText}>{t('button-next')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SelectLanguage;

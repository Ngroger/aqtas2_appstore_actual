import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../../styles/SuccessCreatedShopStyles';

function SuccessCreatedShop({ onClose }) {
    const [showRules, setShowRules] = useState(false);
    const [isCheckBox, setIsCheckbox] = useState(false);
    const navigation = useNavigation();
    const { t } = useTranslation();

    const agree = () => {
        setIsCheckbox(!isCheckBox)
    }

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    return (
        <BlurView intensity={10} tint="default" style={styles.background}>
            <View style={styles.container}>
                {showRules ? (
                    <ScrollView style={{ height: 400 }}>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>1. {t('rule-one')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>2. {t('rule-two')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>3. {t('rule-three')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>4. {t('rule-four')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>5. {t('rule-five')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>6. {t('rule-six')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>7. {t('rule-seven')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>8. {t('rule-eight')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>9. {t('rule-nine')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>10. {t('rule-ten')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>11. {t('rule-eleven')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>12. {t('rule-twelve')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>13. {t('rule-thirteen')}</Text>
                        <Text style={[styles.subtitle, { marginTop: 10, width: 300 }]}>14. {t('rule-fourteen')}</Text>
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity onPress={agree} style={styles.checkbox}>
                                {isCheckBox && <View style={styles.dot} />}
                            </TouchableOpacity>
                            <Text style={styles.checkboxText}>{t('i-agree-with-rules-title')}</Text>
                        </View>
                        <TouchableOpacity disabled={!isCheckBox} onPressIn={handleGoBack} style={isCheckBox ? [styles.nextButton, { marginTop: 10 }] : [styles.nextButton, { marginTop: 10, opacity: 0.65 }]} onPress={() => setShowRules(true)}>
                            <Text style={styles.nextButtonText}>{t('next-button-title')}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                ) : (
                    <React.Fragment>
                        <Text style={styles.title}>{t('success-created-shop-title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('success-created-shop-subtitle-one')}{' '}
                            <Text style={{ fontFamily: 'CambriaBold', color: '#95E5FF' }}>AQTas.</Text>
                            {t('success-created-shop-subtitle-two')}
                        </Text>
                        <TouchableOpacity style={styles.nextButton} onPress={() => setShowRules(true)}>
                            <Text style={styles.nextButtonText}>{t('next-button-title')}</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                )}
            </View>
        </BlurView>
    );
}

export default SuccessCreatedShop;

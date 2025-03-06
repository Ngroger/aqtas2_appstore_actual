import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../../styles/AboutCommisionStyle'
import { Entypo } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

function AboutCommision({ onClose }) {
    const { t } = useTranslation('');
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('what-is-comission-title')}</Text>
                </View>
                <View style={{ paddingVertical: 16 }}>
                    <Text style={styles.description}>{t('about-comission-one')} <Text style={{ fontFamily: 'CambriaBold' }}>Маркетплейс</Text>, {t('about-comission-two')}</Text>
                </View>
            </View>
        </View>
    )
};

export default AboutCommision
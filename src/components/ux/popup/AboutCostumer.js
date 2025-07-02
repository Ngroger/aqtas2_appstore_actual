import { Entypo, Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/AboutCommisionStyle';

function AboutCostumer({ onClose, data }) {
    const { t } = useTranslation();

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
                    <Text style={styles.title}>{data[0]?.shop}</Text>
                    {data[0].verify && (
                        <View style={styles.status}>
                            <Feather name="check" size={18} color="#26CFFF" />
                        </View>
                    )}
                </View>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between', aligndatas: 'center', paddingVertical: 2 }}>
                        <Text style={styles.firstInfo}>{t('name')}</Text>
                        <Text style={styles.secondInfo}>{data[0]?.fullname}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between', aligndatas: 'center', paddingVertical: 2 }}>
                        <Text style={styles.firstInfo}>{t('iin-become-customer-field')}</Text>
                        <Text style={styles.secondInfo}>{data[0]?.iin}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between', aligndatas: 'center', paddingVertical: 2 }}>
                        <Text style={styles.firstInfo}>{t('bin-become-customer-field')}</Text>
                        <Text style={styles.secondInfo}>{data[0]?.bin}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between', aligndatas: 'center', paddingVertical: 2 }}>
                        <Text style={styles.firstInfo}>{t('shop')}</Text>
                        <Text style={styles.secondInfo}>{data[0]?.shop}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default AboutCostumer;

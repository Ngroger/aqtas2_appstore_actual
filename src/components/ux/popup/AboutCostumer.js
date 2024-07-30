import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../../styles/AboutCommisionStyle';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

function AboutCostumer({ onClose, data }) {
    const {t} = useTranslation();
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <View style={styles.background}>
            { data.map((item) => (
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <TouchableOpacity onPress={handleClose}>
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.title}>{item.shop}</Text>
                        { item.isVerify && (
                            <View style={styles.status}>
                                <Feather name="check" size={18} color="#95E5FF" />
                            </View>
                        ) }
                    </View>
                    <View style={{ padding: 10 }}>
                        {/* <View>
                            <Text style={styles.firstInfo}>{t('name')}</Text>
                            <Text style={styles.firstInfo}>{t('iin-become-customer-field')}</Text>
                            <Text style={styles.firstInfo}>{t('bin-become-customer-field')}</Text>
                            <Text style={styles.firstInfo}>{t('shop')}</Text>
                        </View>
                        <View>
                            <Text style={styles.secondInfo}>{item.fullname}</Text>
                            <Text style={styles.secondInfo}>{item.iin}</Text>
                            <Text style={styles.secondInfo}>{item.bin}</Text>
                            <Text style={styles.secondInfo}>{item.shop}</Text>
                        </View> */}
                        <View style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }}>
                            <Text style={styles.firstInfo}>{t('name')}</Text>
                            <Text style={styles.secondInfo}>{item.fullname}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }}>
                            <Text style={styles.firstInfo}>{t('iin-become-customer-field')}</Text>
                            <Text style={styles.secondInfo}>{item.iin}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }}>
                            <Text style={styles.firstInfo}>{t('bin-become-customer-field')}</Text>
                            <Text style={styles.secondInfo}>{item.bin}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }}>
                            <Text style={styles.firstInfo}>{t('shop')}</Text>
                            <Text style={styles.secondInfo}>{item.shop}</Text>
                        </View>
                    </View>
                </View>
            )) }
        </View>
    );
}

export default AboutCostumer;

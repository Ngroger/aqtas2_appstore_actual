import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../../../styles/NoAddressMessageStyles';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';

function NoAddressMessage() {
    const {t} = useTranslation();
    const navigation = useNavigation();

    const goToProfile = () => {
        navigation.navigate('Профиль');
    }
    
    return (
        <BlurView intensity={10} tint="default" style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>{t('title-no-card-message')}</Text>
                <Text style={styles.subtitle}>{t('no-address-message')} 
                    <Text style={{ fontFamily: 'CambriaBold' }}>'{t('profile-name-bottom-tab')}'</Text> - 
                    <Text style={{ fontFamily: 'CambriaBold' }}>'{t('personal-data-profile-button')}'</Text> - 
                    <Text style={{ fontFamily: 'CambriaBold' }}>'{t('address-personal-data')}'</Text>
                </Text>
                <TouchableOpacity onPress={goToProfile} style={styles.button}>
                    <Text style={styles.buttonText}>{t('add-address-button')}</Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    )
};

export default NoAddressMessage;
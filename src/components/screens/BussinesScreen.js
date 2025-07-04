import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import styles from '../../styles/BussinesScreenStyles';

function BussinesScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const buttonsData = [
        { title: t('edit-info-bussines-button'), screen: 'EditBussines' },
        { title: t('my-products-bussines-button'), screen: 'MyGoods' },
        { title: t('sale-bussines-button'), screen: 'Sales' },
        { title: t('my-orders-bussines-button'), screen: 'Orders' },
        { title: t('my-account'), screen: 'MyBankAccount' },
    ];

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const goToScreen = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                <MaterialIcons name="arrow-back-ios" size={scale(24)} color="black" />
                <Text style={styles.title}>{t('bussines-profile-button')}</Text>
            </TouchableOpacity>
            <View>
                {buttonsData.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => goToScreen(button.screen)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{button.title}</Text>
                        <MaterialIcons name="arrow-forward-ios" size={scale(24)} color="#26CFFF" />
                    </TouchableOpacity>
                ))}
            </View>
            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    );
}

export default BussinesScreen;
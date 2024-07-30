import { Text, TouchableOpacity, View, StatusBar, ScrollView } from 'react-native';
import styles from '../../../styles/MyBankAccountStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import MyBankAccountInfo from '../../ux/popup/messages/MyBankAccountInfo';
import { useState, useEffect } from 'react';
import { getUserData } from '../../../store/userDataManager';
import WebView from 'react-native-webview';

function MyBankAccount() {
    const navigation = useNavigation();
    const [isShowBankAccountInfo, setIsShowBankAccountInfo] = useState(false);

    const handleGoBack = () => {
        navigation.goBack(); // Вернуться на предыдущий экран
    };

    const toggleShowBankAccountInfo = () => {
        setIsShowBankAccountInfo(!isShowBankAccountInfo)
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={handleGoBack} style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        <Text style={styles.title}>Мой счёт</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleShowBankAccountInfo} style={styles.infoContainer}>
                        <AntDesign name="question" size={24} color="#95E5FF" />
                    </TouchableOpacity>
                </View>
                <WebView
                    source={{ uri: 'https://www.paypal.com/kz/signin', headers: { 'Accept-Language': 'ru-RU' } }}
                    style={{ marginTop: 10 }}
                />
                <StatusBar backgroundColor="transparent" translucent={true} />
            </View>
            { isShowBankAccountInfo && <MyBankAccountInfo onClose={toggleShowBankAccountInfo}/> }
        </View>
    )
};

export default MyBankAccount;
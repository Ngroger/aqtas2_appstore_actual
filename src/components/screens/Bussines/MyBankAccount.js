import { Text, TouchableOpacity, View, StatusBar, SafeAreaView } from 'react-native';
import styles from '../../../styles/MyBankAccountStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState, useCallback } from 'react';
import { getUserData } from '../../../store/userDataManager';
import Payout from '../../ux/popup/Payout';

function MyBankAccount() {
    const navigation = useNavigation();
    const [balance, setBalance] = useState(0);
    const [isOpenPayout, setIsOpenPayout] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchMyBalance();
        }, [])
    );

    const fetchMyBalance = async () => {
        try {
            const userData = await getUserData();
            if (userData) {
                const response = await fetch(`https://aqtas.garcom.kz/api/my-balance/${userData.userId}`);

                const responseJson = await response.json();

                if (responseJson.success) {
                    setBalance(responseJson.balance);
                }
            }
        } catch (error) {
            console.log("my balance error: ", error);
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={handleGoBack} style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        <Text style={styles.title}>Мой счёт</Text>
                    </TouchableOpacity>
                    <Text style={styles.myBalance}>{balance} тг</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setIsOpenPayout(true)} style={styles.button}>
                    <Text style={styles.buttonText}>Вывести средства</Text>
                </TouchableOpacity>
            </View>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <Payout
                modalVisible={isOpenPayout}
                onClose={() => setIsOpenPayout(false)}
                fetchBalance={() => fetchMyBalance()}
            />
        </SafeAreaView>
    )
};

export default MyBankAccount;
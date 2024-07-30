import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import styles from '../../styles/AddPaymentsMethod';
import { useNavigation } from '@react-navigation/native';

function AddPaypalScreen() {
    const navigation = useNavigation();
    const webviewRef = useRef(null);

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleContainer} onPress={handleGoBack}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                <Text style={styles.title}>Добавить Paypal</Text>
            </TouchableOpacity>

            <StatusBar backgroundColor="transparent" translucent={true} />
        </View>
    );
}

export default AddPaypalScreen;

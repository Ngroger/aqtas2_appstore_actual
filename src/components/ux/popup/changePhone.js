import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from '../../../styles/ChangePhoneStyles';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

const CELL_COUNT = 6;

function ChangePhone({ onClose, phone, userId }) {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleConfirm = () => {
        if (value.length === CELL_COUNT) {
            // Send a request to verify the SMS code.
            fetch('https://aqtas.garcom.kz/api/validateSMS', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: phone, code: value }), // Send userId and the entered code
            })
                .then((response) => response.json())
                .then((data) => {
                    const newPhone = phone;
                    fetch('https://aqtas.garcom.kz/api/updatePhoneNumber', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, newPhone }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success) {

                            } else {

                            }
                        })
                        .catch((error) => {

                        });
                })
                .catch((error) => {

                });
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>На этот номер <Text style={{ fontFamily: 'CambriaBold' }}>{phone}</Text> придёт SMS код. Введите его снизу для подтверждения личности</Text>
                </View>
                <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <Text style={styles.time}>Повторная отправка через... <Text>2:00</Text></Text>
                <TouchableOpacity onPress={handleConfirm} style={styles.buttonConfrim}>
                    <Text style={styles.buttonText}>Подтвердить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default ChangePhone;
